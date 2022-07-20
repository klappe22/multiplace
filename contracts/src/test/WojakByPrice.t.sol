// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "openzeppelin-contracts/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./mocks/MockWinkLinkAggregator.sol";
import "./CheatCodes.sol";
import "../WojakByPrice.sol";

uint256 constant DAY = 86400;
uint256 constant HOUR = 3600;

contract WojakByPriceTest is Test, ERC721Holder {
    CheatCodes internal cheats;
    WojakByPrice internal wojakByPrice;
    string[] public URIs;
    string[] public URIs2;

    Receiver internal receiver;
    MockWinkLinkAggregator internal trxUsdPriceFeed;
    MockWinkLinkAggregator internal ethUsdPriceFeed;

    function setUp() public {
        cheats = CheatCodes(HEVM_ADDRESS);
        trxUsdPriceFeed = new MockWinkLinkAggregator(6, 0.06 * 10**6);
        ethUsdPriceFeed = new MockWinkLinkAggregator(6, 1200 * 10**6);
        wojakByPrice = new WojakByPrice(address(trxUsdPriceFeed), 5);
        URIs = [
            "deranged wojak",
            "withered wojak",
            "neutral wojak",
            "happy wojak",
            "enjoying wojak"
        ];
        URIs2 = [
            "mad soyjak",
            "crying soyjak",
            "neutral soyjak",
            "happy soyjak",
            "enthusiastic soyjak"
        ];
        receiver = new Receiver();

        // set round 0
        cheats.warp(DAY);
        trxUsdPriceFeed.updateAnswer(0.07 * 10**6);
        ethUsdPriceFeed.updateAnswer(1250 * 10**6);

        cheats.warp(DAY * 2);
        trxUsdPriceFeed.updateAnswer(0.08 * 10**6);

        cheats.warp(DAY * 3);
        trxUsdPriceFeed.updateAnswer(0.09 * 10**6);

        cheats.warp(DAY * 4);
        trxUsdPriceFeed.updateAnswer(0.08 * 10**6);
    }

    function testMockAggregator() public {
        (uint80 roundId, int256 answer, , uint256 startedAt, ) = trxUsdPriceFeed
            .getRoundData(2);
        assertEq(roundId, 2);
        assertEq(answer, 0.07 * 10**6);
        assertEq(startedAt, 86400);

        (
            uint80 roundId2,
            int256 answer2,
            ,
            uint256 startedAt2,

        ) = trxUsdPriceFeed.getRoundData(3);
        assertEq(roundId2, 3);
        assertEq(answer2, 0.08 * 10**6);
        assertEq(startedAt2, 172800);
    }

    function testCanGetURIWithWholeDays() public {
        uint256 id = wojakByPrice.mint(URIs, address(trxUsdPriceFeed));

        assertEq(wojakByPrice.getTokenURI(id), URIs[0]);
        cheats.warp(DAY * 5);
        trxUsdPriceFeed.updateAnswer(0.081 * 10**6); // +1.25%
        assertEq(wojakByPrice.getTokenURI(id), URIs[3]);

        cheats.warp(DAY * 6);
        trxUsdPriceFeed.updateAnswer(0.081 * 10**6); // +0
        assertEq(wojakByPrice.getTokenURI(id), URIs[2]);

        cheats.warp(DAY * 7);
        trxUsdPriceFeed.updateAnswer(0.085 * 10**6); // +4.9%
        assertEq(wojakByPrice.getTokenURI(id), URIs[4]);

        cheats.warp(DAY * 8);
        trxUsdPriceFeed.updateAnswer(0.084 * 10**6); // -1.2%
        assertEq(wojakByPrice.getTokenURI(id), URIs[1]);
    }

    function testCanGetURIWithFractionalDays() public {
        uint256 id = wojakByPrice.mint(URIs, address(trxUsdPriceFeed));

        assertEq(wojakByPrice.getTokenURI(id), URIs[0]);
        cheats.warp(DAY * 4 + HOUR * 12);

        trxUsdPriceFeed.updateAnswer(0.081 * 10**6); // +1.25%
        assertEq(wojakByPrice.getTokenURI(id), URIs[0]);
    }

    function testCanGetCurrentURIs() public {
        uint256 id = wojakByPrice.mint(URIs, address(trxUsdPriceFeed));
        uint256 id2 = wojakByPrice.mint(URIs2, address(trxUsdPriceFeed));
        uint256 id3 = wojakByPrice.mint(URIs2, address(ethUsdPriceFeed));
        uint256 id4 = wojakByPrice.mint(URIs, address(ethUsdPriceFeed));

        string[] memory currentURIs = wojakByPrice.getCurrentURIs();
        for (uint256 i = 0; i < currentURIs.length; i++) {
            emit log_string(currentURIs[i]);
        }
    }

    function testCanGetPriceInfo() public {
        uint256 id = wojakByPrice.mint(URIs, address(trxUsdPriceFeed));
        (int256 yesterday, int256 today, int256 change) = wojakByPrice
            .getPriceInfo(id);
        emit log_int(yesterday);
        emit log_int(today);
        emit log_int(change);
    }
}

contract Receiver is ERC721Holder {}
