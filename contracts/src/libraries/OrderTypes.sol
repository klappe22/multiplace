// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

/**
 * @title OrderTypes
 * @notice This library contains order types for the LooksRare exchange.
 */
library OrderTypes {
    struct MakerOrder {
        address signer; // signer of the maker order
        address collection; // collection address
        uint256 price; // price (used as )
        uint256 tokenId; // id of the token
        uint256 startTime; // startTime in timestamp
        uint256 endTime; // endTime in timestamp
    }

    struct TakerOrder {
        address taker; // msg.sender
        uint256 price; // final price for the purchase
        address collection;
        uint256 tokenId;
    }
}
