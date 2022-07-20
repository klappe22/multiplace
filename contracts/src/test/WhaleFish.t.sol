// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "openzeppelin-contracts/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./CheatCodes.sol";
import "../WhaleFish.sol";

contract WhaleFishTest is Test, ERC721Holder {
    CheatCodes internal cheats;
    WhaleFish internal whaleFish;
    string[] public URIs;

    Receiver internal receiver;

    function setUp() public {
        cheats = CheatCodes(HEVM_ADDRESS);
        whaleFish = new WhaleFish(2);
        URIs = ["fish", "whale"];
        receiver = new Receiver();
    }

    function testCanMint() public {
        whaleFish.mint(URIs);
    }

    function testCannotMintWithTooManyURIs() public {
        cheats.expectRevert("too many URIs");
        URIs.push("hey");
        whaleFish.mint(URIs);
    }

    function testCanGetURI() public {
        uint256 tokenId = whaleFish.mint(URIs);
        string memory uri = whaleFish.getTokenURI(tokenId);
        assertEq(uri, "whale");

        cheats.prank(address(receiver));
        uint256 tokenId2 = whaleFish.mint(URIs);
        string memory uri2 = whaleFish.getTokenURI(tokenId2);
        assertEq(uri2, "fish");
    }

    function testCanGetURIs() public {
        uint256 tokenId = whaleFish.mint(URIs);
        string[] memory uri = whaleFish.getTokenURIs(tokenId);
        assertEq(uri[0], "fish");
        assertEq(uri[1], "whale");
    }
}

contract Receiver is ERC721Holder {}
