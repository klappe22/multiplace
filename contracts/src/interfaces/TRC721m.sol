// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

interface TRC721m is IERC721 {
    function mint(string[] memory tokenURIs) external returns (uint256);

    function setTokenURIs(uint256 tokenId, string[] memory _tokenURIs) external;

    function getTokenURIs(uint256 tokenId)
        external
        view
        returns (string[] memory);
}
