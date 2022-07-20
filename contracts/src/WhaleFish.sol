// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./TRC721m.sol";

contract WhaleFish is TRC721m {
    constructor(uint256 _URIsPerToken)
        TRC721m(_URIsPerToken)
        ERC721("wf", "whalefish")
    {}

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        _requireMinted(tokenId);
        return getTokenURI(tokenId);
    }

    function mint(string[] memory tokenURIs) public override returns (uint256) {
        require(tokenURIs.length == URIsPerToken, "too many URIs");
        _mint(msg.sender, currentId);
        setTokenURIs(currentId, tokenURIs);
        return currentId++;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        address owner = ownerOf(tokenId);
        // 1000TRX
        if (owner.balance > 1_000_000_000) {
            // whale
            return currentURI[tokenId][1];
        } else {
            // fish
            return currentURI[tokenId][0];
        }
    }

    function getCurrentURIs() public view returns (string[] memory) {
        string[] memory allURIs = new string[](currentId);
        for (uint256 i = 0; i < currentId; i++) {
            allURIs[i] = getTokenURI(i);
        }
        return allURIs;
    }
}
