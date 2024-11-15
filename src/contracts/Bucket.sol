// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

contract NFTBucketLinker {
    struct Bucket {
        string bucketType;
        string name;
        string place;
    }

    struct UserNFTLink {
        string nftAddress; // The NFT identifier
        Bucket[] selectedBuckets;
    }

    // Mapping to store multiple NFT links per user
    mapping(string => UserNFTLink[]) public userLinks; // Key is the Hedera account ID as a string

    /// @dev Event to track when a user links an NFT to specific buckets
    event NFTLinked(string indexed user, string indexed nftAddress, Bucket[] selectedBuckets);

    /// @notice Link user's account to an NFT with selected buckets
    /// @param user The user's Hedera account ID
    /// @param nftAddress The address or ID of the NFT
    /// @param bucketTypes Array of bucket types (e.g., "visit", "activity")
    /// @param names Array of names corresponding to each bucket type
    /// @param places Array of place names for each bucket
    function linkNFTToBuckets(
        string memory user,
        string memory nftAddress,
        string[] memory bucketTypes,
        string[] memory names,
        string[] memory places
    ) public {
        require(
            bucketTypes.length == names.length && names.length == places.length,
            "Mismatched input lengths"
        );

        // Add a new UserNFTLink to the user's list
        userLinks[user].push();
        UserNFTLink storage newLink = userLinks[user][userLinks[user].length - 1];
        newLink.nftAddress = nftAddress;

        // Populate selectedBuckets with provided data
        for (uint i = 0; i < bucketTypes.length; i++) {
            newLink.selectedBuckets.push(Bucket({
                bucketType: bucketTypes[i],
                name: names[i],
                place: places[i]
            }));
        }

        emit NFTLinked(user, nftAddress, newLink.selectedBuckets);
    }

    /// @notice Get the linked NFTs and buckets for a user
    /// @param user The user's Hedera account ID
    /// @return Array of UserNFTLink with all linked NFTs and their buckets
    function getLinkedNFTsAndBuckets(string memory user) public view returns (UserNFTLink[] memory) {
        return userLinks[user];
    }
}
