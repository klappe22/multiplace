pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";

contract TrxPrice is ERC721URIStorage {
    uint256 public currentId;
    mapping(uint256 => mapping(uint256 => string)) public currentURI;

    constructor() ERC721("trxp", "TRX PRICE") {}

    function mint(string[] memory tokenURIs) public returns (uint256) {
        _mint(msg.sender, currentId);
        setTokenURIs(currentId, tokenURIs);
        return currentId++;
    }

    function setTokenURIs(uint256 tokenId, string[] memory _tokenURIs)
        internal
    {
        for (uint256 i = 0; i < 24; i++) {
            currentURI[tokenId][i] = _tokenURIs[i];
        }
    }
}
