// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "openzeppelin-contracts/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./CheatCodes.sol";
import "../WhaleFish.sol";
import "../WojakByPrice.sol";
import "../Exchange.sol";
import {OrderTypes} from "../libraries/OrderTypes.sol";
import "./mocks/MockWinkLinkAggregator.sol";

contract ExchangeTest is Test, ERC721Holder {
    CheatCodes internal cheats;
    WhaleFish internal whaleFish;
    WojakByPrice internal wojakByPrice;
    Exchange internal exchange;
    string[] public whalefishURIs;
    string[] public wojakbypriceURIs;
    uint256 internal whalefishFirstId;
    uint256 internal whalefishSecondId;
    uint256 internal whalefishThirdId;
    uint256 internal wojakbypriceFirstId;
    uint256 internal wojakbypriceSecondId;
    MockWinkLinkAggregator internal trxUsdPriceFeed;

    address internal bob;
    address internal alice;

    OrderTypes.MakerOrder internal firstMakerAsk;
    OrderTypes.MakerOrder internal secondMakerAsk;

    function setUp() public {
        cheats = CheatCodes(HEVM_ADDRESS);
        trxUsdPriceFeed = new MockWinkLinkAggregator(6, 0.06 * 10**6);
        whaleFish = new WhaleFish(2);
        wojakByPrice = new WojakByPrice(address(trxUsdPriceFeed), 5);
        exchange = new Exchange();
        whalefishURIs = ["fish", "whale"];
        wojakbypriceURIs = [
            "mad soyjak",
            "crying soyjak",
            "neutral soyjak",
            "happy soyjak",
            "enthusiastic soyjak"
        ];
        bob = address(new Receiver());
        cheats.startPrank(bob);
        whalefishFirstId = whaleFish.mint(whalefishURIs);
        whalefishSecondId = whaleFish.mint(whalefishURIs);
        whalefishThirdId = whaleFish.mint(whalefishURIs);
        wojakbypriceFirstId = wojakByPrice.mint(wojakbypriceURIs);
        wojakbypriceSecondId = wojakByPrice.mint(wojakbypriceURIs);
        cheats.stopPrank();
        alice = address(new Receiver());

        firstMakerAsk = OrderTypes.MakerOrder(
            bob,
            address(whaleFish),
            0 ether,
            whalefishFirstId,
            0,
            1000
        );
        secondMakerAsk = OrderTypes.MakerOrder(
            bob,
            address(wojakByPrice),
            0 ether,
            wojakbypriceFirstId,
            0,
            1000
        );

        cheats.prank(bob);
        whaleFish.setApprovalForAll(address(exchange), true);
        cheats.prank(alice);
        whaleFish.setApprovalForAll(address(exchange), true);

        cheats.prank(bob);
        wojakByPrice.setApprovalForAll(address(exchange), true);
        cheats.prank(alice);
        wojakByPrice.setApprovalForAll(address(exchange), true);
    }

    function testCanCreateMakerAsk() public {
        cheats.prank(bob);
        exchange.createMakerAsk(firstMakerAsk);
        OrderTypes.MakerOrder memory makerAsk = exchange.getMakerAsk(
            address(whaleFish),
            whalefishFirstId
        );
        assertEq(makerAsk.tokenId, whalefishFirstId);
        assertEq(makerAsk.collection, address(whaleFish));

        cheats.prank(bob);
        exchange.createMakerAsk(secondMakerAsk);
        OrderTypes.MakerOrder memory makerAsk2 = exchange.getMakerAsk(
            address(wojakByPrice),
            wojakbypriceFirstId
        );
        assertEq(makerAsk2.tokenId, wojakbypriceFirstId);
        assertEq(makerAsk2.collection, address(wojakByPrice));
    }

    function testCanMatchAskWithBid() public {
        cheats.prank(bob);
        exchange.createMakerAsk(firstMakerAsk);

        OrderTypes.TakerOrder memory takerBid = OrderTypes.TakerOrder(
            alice,
            0 ether,
            address(whaleFish),
            whalefishFirstId
        );

        assertEq(whaleFish.ownerOf(whalefishFirstId), bob);

        (address signer, , , , , ) = exchange.makerAskByCollectionAndId(
            address(whaleFish),
            whalefishFirstId
        );
        emit log_address(signer);

        uint256 bobBefore = bob.balance;
        cheats.prank(alice);
        exchange.matchAskWithTakerBid{value: 0}(takerBid);

        assertEq(whaleFish.ownerOf(whalefishFirstId), alice);
        assertEq(bob.balance, bobBefore);
        assertEq(
            exchange
                .getMakerAsk(address(whaleFish), whalefishFirstId)
                .collection,
            address(0)
        );

        (address signerAfter, , , , , ) = exchange.makerAskByCollectionAndId(
            address(whaleFish),
            whalefishFirstId
        );
        emit log_address(signerAfter);
        assertEq(signerAfter, address(0));
    }

    function testCannotBuyTwice() public {
        cheats.prank(bob);
        exchange.createMakerAsk(firstMakerAsk);

        assertEq(whaleFish.ownerOf(whalefishFirstId), bob);
        OrderTypes.TakerOrder memory takerBid = OrderTypes.TakerOrder(
            alice,
            0 ether,
            address(whaleFish),
            whalefishFirstId
        );
        cheats.prank(alice);
        exchange.matchAskWithTakerBid{value: 0}(takerBid);
        assertEq(whaleFish.ownerOf(whalefishFirstId), alice);
        // alice now owns it
        // but makes the same takerBid again
        cheats.expectRevert("Order: Token is not listed");
        cheats.prank(alice);
        exchange.matchAskWithTakerBid{value: 0}(takerBid);
    }

    function testCannotCreateMakerAskOnSomeoneElsesToken() public {
        cheats.prank(alice);
        firstMakerAsk.signer = alice;
        cheats.expectRevert("maker must be the owner");
        exchange.createMakerAsk(firstMakerAsk);
    }

    function testCanGetMakerAsks() public {
        cheats.prank(bob);
        exchange.createMakerAsk(firstMakerAsk);
        cheats.prank(bob);
        exchange.createMakerAsk(
            OrderTypes.MakerOrder(
                bob,
                address(whaleFish),
                0 ether,
                whalefishThirdId,
                0,
                1000
            )
        );

        cheats.prank(bob);
        exchange.createMakerAsk(secondMakerAsk);

        cheats.prank(bob);
        exchange.createMakerAsk(
            OrderTypes.MakerOrder(
                bob,
                address(wojakByPrice),
                0 ether,
                wojakbypriceSecondId,
                0,
                1000
            )
        );

        uint256[2][] memory whaleFishAsks = exchange.getMakerAsksByCollection(
            address(whaleFish)
        );
        assertEq(whaleFishAsks[0][0], whalefishFirstId);
        assertEq(whaleFishAsks[1][0], whalefishThirdId);

        uint256[2][] memory wojakByPriceAsks = exchange
            .getMakerAsksByCollection(address(wojakByPrice));
        assertEq(wojakByPriceAsks[0][0], wojakbypriceFirstId);
        assertEq(wojakByPriceAsks[1][0], wojakbypriceSecondId);
    }

    function testCanGetMakerAskCount() public {
        assertEq(exchange.makerAskCountByCollection(address(whaleFish)), 0);
        assertEq(exchange.makerAskCountByCollection(address(wojakByPrice)), 0);

        cheats.prank(bob);
        exchange.createMakerAsk(
            OrderTypes.MakerOrder(
                bob,
                address(wojakByPrice),
                0 ether,
                wojakbypriceSecondId,
                0,
                1000
            )
        );
        assertEq(exchange.makerAskCountByCollection(address(whaleFish)), 0);
        assertEq(exchange.makerAskCountByCollection(address(wojakByPrice)), 1);
        cheats.prank(bob);
        exchange.createMakerAsk(
            OrderTypes.MakerOrder(
                bob,
                address(whaleFish),
                0 ether,
                whalefishThirdId,
                0,
                1000
            )
        );
        assertEq(exchange.makerAskCountByCollection(address(whaleFish)), 1);
        assertEq(exchange.makerAskCountByCollection(address(wojakByPrice)), 1);

        OrderTypes.TakerOrder memory takerBid = OrderTypes.TakerOrder(
            alice,
            0 ether,
            address(whaleFish),
            whalefishThirdId
        );

        cheats.prank(alice);
        exchange.matchAskWithTakerBid{value: 0}(takerBid);
        assertEq(exchange.makerAskCountByCollection(address(whaleFish)), 0);
    }

    function testCanGetUpperLimit() public {
        assertEq(
            exchange.makerAskUpperLimitByCollection(address(whaleFish)),
            0
        );
        assertEq(
            exchange.makerAskUpperLimitByCollection(address(wojakByPrice)),
            0
        );

        cheats.prank(bob);
        exchange.createMakerAsk(
            OrderTypes.MakerOrder(
                bob,
                address(wojakByPrice),
                0 ether,
                wojakbypriceSecondId,
                0,
                1000
            )
        );
        assertEq(
            exchange.makerAskUpperLimitByCollection(address(whaleFish)),
            0
        );
        assertEq(
            exchange.makerAskUpperLimitByCollection(address(wojakByPrice)),
            1
        );
        cheats.prank(bob);
        exchange.createMakerAsk(
            OrderTypes.MakerOrder(
                bob,
                address(whaleFish),
                0 ether,
                whalefishThirdId,
                0,
                1000
            )
        );
        assertEq(
            exchange.makerAskUpperLimitByCollection(address(whaleFish)),
            2
        );
        assertEq(
            exchange.makerAskUpperLimitByCollection(address(wojakByPrice)),
            1
        );
    }
}

contract Receiver is ERC721Holder {
    receive() external payable {}
}
