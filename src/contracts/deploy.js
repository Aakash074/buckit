import {
    Client,
    PrivateKey,
    ContractCreateTransaction,
    FileCreateTransaction,
    FileAppendTransaction,
} from "@hashgraph/sdk";

const HEDERA_ACCOUNT_ID = "0.0.4866116";
const HEDERA_PRIVATE_KEY = PrivateKey.fromString("302e020100300506032b657004220420600c8fc074e720e52495c2ab0ac77d38129850d9889e86d2d220d75d59e56a74");

// Full bytecode of your contract
const contractBytecode = "6080604052348015600e575f80fd5b506113fe8061001c5f395ff3fe608060405234801561000f575f80fd5b506004361061003f575f3560e01c8063247f1270146100435780632bd0e27a14610073578063aa0c14831461008f575b5f80fd5b61005d60048036038101906100589190610882565b6100bf565b60405161006a919061093c565b60405180910390f35b61008d60048036038101906100889190610a3e565b610190565b005b6100a960048036038101906100a49190610b41565b6103ef565b6040516100b69190610de2565b60405180910390f35b5f8280516020810182018051848252602083016020850120818352809550505050505081815481106100ef575f80fd5b905f5260205f2090600202015f9150915050805f01805461010f90610e2f565b80601f016020809104026020016040519081016040528092919081815260200182805461013b90610e2f565b80156101865780601f1061015d57610100808354040283529160200191610186565b820191905f5260205f20905b81548152906001019060200180831161016957829003601f168201915b5050505050905081565b815183511480156101a2575080518251145b6101e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101d890610ea9565b60405180910390fd5b5f856040516101f09190610f01565b908152602001604051809103902060018160018154018082558091505003905f5260205f209050505f80866040516102289190610f01565b908152602001604051809103902060015f886040516102479190610f01565b9081526020016040518091039020805490506102639190610f44565b8154811061027457610273610f77565b5b905f5260205f209060020201905084815f0190816102929190611141565b505f5b8451811015610380578160010160405180606001604052808784815181106102c0576102bf610f77565b5b602002602001015181526020018684815181106102e0576102df610f77565b5b60200260200101518152602001858481518110610300576102ff610f77565b5b6020026020010151815250908060018154018082558091505060019003905f5260205f2090600302015f909190919091505f820151815f0190816103449190611141565b50602082015181600101908161035a9190611141565b5060408201518160020190816103709190611141565b5050508080600101915050610295565b508460405161038f9190610f01565b6040518091039020866040516103a59190610f01565b60405180910390207f3c3fa9644f8dd85036bbe69e092008a8e613d9d0b5e806e8b5372d5570f25ec9836001016040516103df91906113a8565b60405180910390a3505050505050565b60605f826040516104009190610f01565b9081526020016040518091039020805480602002602001604051908101604052809291908181526020015f905b828210156106f7578382905f5260205f2090600202016040518060400160405290815f8201805461045d90610e2f565b80601f016020809104026020016040519081016040528092919081815260200182805461048990610e2f565b80156104d45780601f106104ab576101008083540402835291602001916104d4565b820191905f5260205f20905b8154815290600101906020018083116104b757829003601f168201915b5050505050815260200160018201805480602002602001604051908101604052809291908181526020015f905b828210156106e0578382905f5260205f2090600302016040518060600160405290815f8201805461053190610e2f565b80601f016020809104026020016040519081016040528092919081815260200182805461055d90610e2f565b80156105a85780601f1061057f576101008083540402835291602001916105a8565b820191905f5260205f20905b81548152906001019060200180831161058b57829003601f168201915b505050505081526020016001820180546105c190610e2f565b80601f01602080910402602001604051908101604052809291908181526020018280546105ed90610e2f565b80156106385780601f1061060f57610100808354040283529160200191610638565b820191905f5260205f20905b81548152906001019060200180831161061b57829003601f168201915b5050505050815260200160028201805461065190610e2f565b80601f016020809104026020016040519081016040528092919081815260200182805461067d90610e2f565b80156106c85780601f1061069f576101008083540402835291602001916106c8565b820191905f5260205f20905b8154815290600101906020018083116106ab57829003601f168201915b50505050508152505081526020019060010190610501565b50505050815250508152602001906001019061042d565b505050509050919050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6107618261071b565b810181811067ffffffffffffffff821117156107805761077f61072b565b5b80604052505050565b5f610792610702565b905061079e8282610758565b919050565b5f67ffffffffffffffff8211156107bd576107bc61072b565b5b6107c68261071b565b9050602081019050919050565b828183375f83830152505050565b5f6107f36107ee846107a3565b610789565b90508281526020810184848401111561080f5761080e610717565b5b61081a8482856107d3565b509392505050565b5f82601f83011261083657610835610713565b5b81356108468482602086016107e1565b91505092915050565b5f819050919050565b6108618161084f565b811461086b575f80fd5b50565b5f8135905061087c81610858565b92915050565b5f80604083850312156108985761089761070b565b5b5f83013567ffffffffffffffff8111156108b5576108b461070f565b5b6108c185828601610822565b92505060206108d28582860161086e565b9150509250929050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f61090e826108dc565b61091881856108e6565b93506109288185602086016108f6565b6109318161071b565b840191505092915050565b5f6020820190508181035f8301526109548184610904565b905092915050565b5f67ffffffffffffffff8211156109765761097561072b565b5b602082029050602081019050919050565b5f80fd5b5f61099d6109988461095c565b610789565b905080838252602082019050602084028301858111156109c0576109bf610987565b5b835b81811015610a0757803567ffffffffffffffff8111156109e5576109e4610713565b5b8086016109f28982610822565b855260208501945050506020810190506109c2565b5050509392505050565b5f82601f830112610a2557610a24610713565b5b8135610a3584826020860161098b565b91505092915050565b5f805f805f60a08688031215610a5757610a5661070b565b5b5f86013567ffffffffffffffff811115610a7457610a7361070f565b5b610a8088828901610822565b955050602086013567ffffffffffffffff811115610aa157610aa061070f565b5b610aad88828901610822565b945050604086013567ffffffffffffffff811115610ace57610acd61070f565b5b610ada88828901610a11565b935050606086013567ffffffffffffffff811115610afb57610afa61070f565b5b610b0788828901610a11565b925050608086013567ffffffffffffffff811115610b2857610b2761070f565b5b610b3488828901610a11565b9150509295509295909350565b5f60208284031215610b5657610b5561070b565b5b5f82013567ffffffffffffffff811115610b7357610b7261070f565b5b610b7f84828501610822565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f82825260208201905092915050565b5f610bcb826108dc565b610bd58185610bb1565b9350610be58185602086016108f6565b610bee8161071b565b840191505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f606083015f8301518482035f860152610c3c8282610bc1565b91505060208301518482036020860152610c568282610bc1565b91505060408301518482036040860152610c708282610bc1565b9150508091505092915050565b5f610c888383610c22565b905092915050565b5f602082019050919050565b5f610ca682610bf9565b610cb08185610c03565b935083602082028501610cc285610c13565b805f5b85811015610cfd5784840389528151610cde8582610c7d565b9450610ce983610c90565b925060208a01995050600181019050610cc5565b50829750879550505050505092915050565b5f604083015f8301518482035f860152610d298282610bc1565b91505060208301518482036020860152610d438282610c9c565b9150508091505092915050565b5f610d5b8383610d0f565b905092915050565b5f602082019050919050565b5f610d7982610b88565b610d838185610b92565b935083602082028501610d9585610ba2565b805f5b85811015610dd05784840389528151610db18582610d50565b9450610dbc83610d63565b925060208a01995050600181019050610d98565b50829750879550505050505092915050565b5f6020820190508181035f830152610dfa8184610d6f565b905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680610e4657607f821691505b602082108103610e5957610e58610e02565b5b50919050565b7f4d69736d61746368656420696e707574206c656e6774687300000000000000005f82015250565b5f610e936018836108e6565b9150610e9e82610e5f565b602082019050919050565b5f6020820190508181035f830152610ec081610e87565b9050919050565b5f81905092915050565b5f610edb826108dc565b610ee58185610ec7565b9350610ef58185602086016108f6565b80840191505092915050565b5f610f0c8284610ed1565b915081905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610f4e8261084f565b9150610f598361084f565b9250828203905081811115610f7157610f70610f17565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026110007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610fc5565b61100a8683610fc5565b95508019841693508086168417925050509392505050565b5f819050919050565b5f61104561104061103b8461084f565b611022565b61084f565b9050919050565b5f819050919050565b61105e8361102b565b61107261106a8261104c565b848454610fd1565b825550505050565b5f90565b61108661107a565b611091818484611055565b505050565b5b818110156110b4576110a95f8261107e565b600181019050611097565b5050565b601f8211156110f9576110ca81610fa4565b6110d384610fb6565b810160208510156110e2578190505b6110f66110ee85610fb6565b830182611096565b50505b505050565b5f82821c905092915050565b5f6111195f19846008026110fe565b1980831691505092915050565b5f611131838361110a565b9150826002028217905092915050565b61114a826108dc565b67ffffffffffffffff8111156111635761116261072b565b5b61116d8254610e2f565b6111788282856110b8565b5f60209050601f8311600181146111a9575f8415611197578287015190505b6111a18582611126565b865550611208565b601f1984166111b786610fa4565b5f5b828110156111de578489015182556001820191506020850194506020810190506111b9565b868310156111fb57848901516111f7601f89168261110a565b8355505b6001600288020188555050505b505050505050565b5f81549050919050565b5f82825260208201905092915050565b5f819050815f5260205f209050919050565b5f815461124881610e2f565b6112528186610bb1565b9450600182165f811461126c5760018114611282576112b4565b60ff1983168652811515602002860193506112b4565b61128b85610fa4565b5f5b838110156112ac5781548189015260018201915060208101905061128d565b808801955050505b50505092915050565b5f606083015f8084018583035f8701526112d7838261123c565b9250506001840185830360208701526112f0838261123c565b925050600284018583036040870152611309838261123c565b925050819250505092915050565b5f61132283836112bd565b905092915050565b5f600382019050919050565b5f61134082611210565b61134a818561121a565b93508360208202850161135c8561122a565b805f5b85811015611396578484038952816113778582611317565b94506113828361132a565b925060208a0199505060018101905061135f565b50829750879550505050505092915050565b5f6020820190508181035f8301526113c08184611336565b90509291505056fea26469706673582212206c662a683cfbd6dfc597e0fbc2c0ee642a278b55ac44669ccb459e572f8b3d2064736f6c634300081a0033"; 

async function main() {
    const client = Client.forTestnet();
    client.setOperator(HEDERA_ACCOUNT_ID, HEDERA_PRIVATE_KEY);

    // Create a file on Hedera and store the first chunk of bytecode
    const initialChunk = contractBytecode.slice(0, 4096); // first 4 KB
    const fileCreateTx = new FileCreateTransaction()
        .setContents(initialChunk)
        .setKeys([HEDERA_PRIVATE_KEY.publicKey]);
    const fileCreateSubmit = await fileCreateTx.execute(client);
    const fileCreateRx = await fileCreateSubmit.getReceipt(client);
    const bytecodeFileId = fileCreateRx.fileId;
    console.log(`- The bytecode file ID is: ${bytecodeFileId} \n`);

    // Append remaining chunks if the bytecode exceeds 4 KB
    for (let i = 4096; i < contractBytecode.length; i += 4096) {
        const chunk = contractBytecode.slice(i, i + 4096);
        const fileAppendTx = new FileAppendTransaction()
            .setFileId(bytecodeFileId)
            .setContents(chunk)
            .setMaxChunks(10); // Allows the append to handle multiple chunks
        await fileAppendTx.execute(client);
    }

    // Instantiate the contract
    const contractInstantiateTx = new ContractCreateTransaction()
        .setBytecodeFileId(bytecodeFileId)
        .setGas(300000);
    const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
    const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(client);
    const contractId = contractInstantiateRx.contractId;
    const contractAddress = contractId.toSolidityAddress();
    console.log(`- The contract ID is: ${contractId} \n`);
    console.log(`- The contract address (for use in Solidity) is: ${contractAddress} \n`);

    client.close();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
