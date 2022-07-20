// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";

abstract contract TRC721m is ERC721URIStorage {
    uint256 public currentId;
    uint256 public URIsPerToken;

    // tokenId => current img => URI
    mapping(uint256 => mapping(uint256 => string)) public currentURI;

    constructor(uint256 _URIsPerToken) {
        URIsPerToken = _URIsPerToken;
    }

    function mint(string[] memory tokenURIs) public virtual returns (uint256) {
        require(tokenURIs.length == URIsPerToken, "wrong amount of tokenURIs!");
        _mint(msg.sender, currentId);
        setTokenURIs(currentId, tokenURIs);
        return currentId++;
    }

    function setTokenURIs(uint256 tokenId, string[] memory _tokenURIs)
        internal
    {
        for (uint256 i = 0; i < _tokenURIs.length; i++) {
            currentURI[tokenId][i] = _tokenURIs[i];
        }
    }

    function getTokenURIs(uint256 tokenId)
        public
        view
        returns (string[] memory)
    {
        string[] memory URIs = new string[](URIsPerToken);
        for (uint256 i = 0; i < URIsPerToken; i++) {
            URIs[i] = currentURI[tokenId][i];
        }

        return URIs;
    }

    function getAllTokenURIs() public view returns (string[] memory) {
        string[] memory allURIs = new string[](currentId * URIsPerToken);
        for (uint256 i = 0; i < currentId; i++) {
            string[] memory uris = getTokenURIs(i);
            for (uint256 j = 0; j < URIsPerToken; j++) {
                allURIs[i * URIsPerToken + j] = uris[j];
            }
        }

        return allURIs;
    }

    function size() public view returns (string[] memory) {
        string[] memory allURIs = new string[](currentId * URIsPerToken);
        return allURIs;
    }
}
