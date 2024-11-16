/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { useState, useEffect } from 'react';
import { Client, ContractCallQuery, ContractFunctionParameters, PrivateKey, AccountId } from "@hashgraph/sdk";
import { useEffect, useState } from "react";
import { Interface } from "ethers"; // Direct import in v6
import BucketAbi from "../contracts/BucketAbi.json";
import { MagicCard } from '@/components/ui/magic-card';

// const parseUint256 = (value) => {
//   return toBigInt(value);
// };


const contractId = "0.0.5138175"
//@ts-ignore
function transformToCountryGroupedArray(data) {
    const countryMap = {};

    // Loop over each NFT entry
    //@ts-ignore
    data.forEach(nftArray => { //@ts-ignore
        nftArray.forEach(([nftId, locations]) => {
            // Loop over each location for the current NFT ID
            //@ts-ignore
            locations.forEach(([type, name, address]) => {
                // Get the last part of the address as the country name
                const country = address.split(", ").pop();
//@ts-ignore
                // Initialize the country array if it doesn't exist in the map
                if (!countryMap[country]) {//@ts-ignore
                    countryMap[country] = [];
                }
//@ts-ignore
                // Add the location to the country's array
                countryMap[country].push({
                    type,
                    name,
                    nftId,
                    address
                });
            });
        });
    });

    // Convert the countryMap to an array format
    const countryArray = Object.keys(countryMap).map(country => ({
        country, //@ts-ignore
        locations: countryMap[country]
    }));

    return countryArray;
}

//@ts-ignore
export const Bucket = () => {
  const [countries, setCountries] = useState([]);
const client = Client.forTestnet(); //@ts-ignore
const userAccount = JSON.parse(localStorage.getItem('hederaAccountData'));
async function getBucketList() {
    const accountId = AccountId.fromString(userAccount.accountId);
    client.setOperator(userAccount?.accountId, PrivateKey.fromStringDer(userAccount?.accountPvtKey));
    const params = new ContractFunctionParameters().addString(accountId?.toString())

    const query = new ContractCallQuery()
        .setContractId(contractId)
        .setGas(400000) 
        .setFunction(
            "getLinkedNFTsAndBuckets",
            params
          );
        const result = await query.execute(client);
        console.log(result)
        const contractInterface = new Interface(BucketAbi);
        const decodedResult = contractInterface.decodeFunctionResult(
            "getLinkedNFTsAndBuckets", // Function name
            result.bytes // Byte array result from Hedera contract call
          );

        const finalResult = transformToCountryGroupedArray(decodedResult);
        console.log(finalResult) //@ts-ignore
        setCountries(finalResult);

}

useEffect(() => {
    getBucketList();
},[])

    return (
    <div className="w-full h-full flex flex-col text-left p-4">
        <div className="text-xl font-bold">Buckets</div>
        {countries?.map(item => <div className="flex flex-col">
            {/* @ts-ignore */}
            <MagicCard
        className="cursor-pointer flex-col shadow-2xl  p-2 m-2"
        gradientColor={"#D9D9D955"}
      >
        {/* @ts-ignore */}
            <div className="text-lg font-bold">{item?.country}</div> 
            {/* @ts-ignore */}
            {item?.locations?.map((subItem, index) => <div className="flex flex-col p-2">
                <div>{index + 1}. {subItem?.name} ({subItem?.type})</div>
                <div>{subItem?.address}</div>
            </div>)}
            {/* @ts-ignore */}
            <div>{parseInt(Math.random()*1000)} USD</div>
            <div className="w-full text-right cursor-pointer">Book Now</div>
            </MagicCard>
        </div>)}
    </div>
    );
};