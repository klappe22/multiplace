// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";
import "./TRC721m.sol";

contract Timestamp is TRC721m {
    constructor() TRC721m(24) ERC721("tNFT", "TIMESTAMP") {}

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        _requireMinted(tokenId);
        return getTokenURI(tokenId);
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        uint256 hour = (block.timestamp / 3600) % 24;
        return currentURI[tokenId][hour];
    }
}
