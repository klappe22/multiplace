// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "openzeppelin-contracts/contracts/token/ERC721/utils/ERC721Holder.sol";
import "../Timestamp.sol";

interface CheatCodes {
    function prank(address) external;

    function expectRevert(bytes memory) external;

    function assume(bool) external;

    function warp(uint256) external;

    function startPrank(address) external;

    function stopPrank() external;

    function expectEmit(
        bool,
        bool,
        bool,
        bool
    ) external;
}

uint256 constant DAY = 86400;
uint256 constant HOUR = 3600;

contract TimestampTest is Test, ERC721Holder {
    Timestamp internal timestamp;
    CheatCodes internal cheats;
    uint256 internal startTimestamp;

    string[] public URIs;

    function setUp() public {
        timestamp = new Timestamp();
        cheats = CheatCodes(HEVM_ADDRESS);
        startTimestamp = 1657238400;
        URIs = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23"
        ];
        timestamp.mint(URIs);
    }

    function testCanMint() public {
        timestamp.mint(URIs);
        timestamp.mint(URIs);
        timestamp.mint(URIs);
    }

    function testCanGetURI() public {
        cheats.warp(startTimestamp);
        assertEq(timestamp.tokenURI(0), "0");
        cheats.warp(startTimestamp + HOUR);
        assertEq(timestamp.tokenURI(0), "1");
        cheats.warp(startTimestamp + HOUR * 2);
        assertEq(timestamp.tokenURI(0), "2");
        cheats.warp(startTimestamp + HOUR * 10);
        assertEq(timestamp.tokenURI(0), "10");
        cheats.warp(startTimestamp + HOUR * 23);
        assertEq(timestamp.tokenURI(0), "23");
        cheats.warp(startTimestamp + HOUR * 24);
        assertEq(timestamp.tokenURI(0), "0");
        cheats.warp(startTimestamp + HOUR * 48);
        assertEq(timestamp.tokenURI(0), "0");
        cheats.warp(startTimestamp + HOUR * 49);
        assertEq(timestamp.tokenURI(0), "1");
    }
}
