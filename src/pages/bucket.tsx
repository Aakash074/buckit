/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { useState, useEffect } from 'react';
import { Client, ContractCallQuery, ContractFunctionParameters, PrivateKey, AccountId } from "@hashgraph/sdk";
import { useEffect, useState } from "react";
import { Interface } from "ethers"; // Direct import in v6
import BucketAbi from "../contracts/BucketAbi.json";
// const parseUint256 = (value) => {
//   return toBigInt(value);
// };


const contractId = "0.0.5089373"
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
      
    //       console.log("Decoded Result:", decodedResult);

        //   const decodedResult = [
        //     [
        //         [
        //             "0.0.5077557",
        //             [
        //                 [
        //                     "visit",
        //                     "Pan Pacific Orchard Hotel",
        //                     "Claymore Road, Pan Pacific Orchard, Singapore, Singapore"
        //                 ],
        //                 [
        //                     "visit",
        //                     "ION Orchard",
        //                     "Orchard Road, Ion Orchard Link, Singapore"
        //                 ]
        //             ]
        //         ],
        //         [
        //             "0.0.5077563",
        //             [
        //                 [
        //                     "activity",
        //                     "Karaoke Booth",
        //                     "Yule Baby Infant Water World, Yongtai Road, Pudong, Shanghai, China"
        //                 ]
        //             ]
        //         ],
        //         [
        //             "0.0.5077563",
        //             [
        //                 [
        //                     "activity",
        //                     "Billiard Room",
        //                     "Yule Baby Infant Water World, Yongtai Road, Pudong, Shanghai, China"
        //                 ]
        //             ]
        //         ]
        //     ]
        // ]

        const finalResult = transformToCountryGroupedArray(decodedResult);
        console.log(finalResult) //@ts-ignore
        setCountries(finalResult);

}

useEffect(() => {
    getBucketList();
},[])

    return (
    <div className="w-full h-full flex flex-col text-left">
        {countries?.map(item => <div className="flex flex-col">
            {/* @ts-ignore */}
            <div>{item?.country}</div> 
            {/* @ts-ignore */}
            {item?.locations?.map((subItem, index) => <div className="flex flex-col p-2">
                <div>{index + 1}. {subItem?.name} ({subItem?.type})</div>
                <div>{subItem?.address}</div>
            </div>)}
        </div>)}
    </div>
    );
};