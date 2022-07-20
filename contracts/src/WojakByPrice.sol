// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/utils/Strings.sol";

import "./TRC721m.sol";
import "./interfaces/WinkLinkAggregator.sol";

contract WojakByPrice is TRC721m {
    using Strings for uint256;
    mapping(uint256 => address) public priceFeedById;
    address public defaultPriceFeed;

    constructor(address _defaultPriceFeed, uint256 _URIsPerToken)
        TRC721m(_URIsPerToken)
        ERC721("wjbp", "WojakByPrice")
    {
        defaultPriceFeed = _defaultPriceFeed;
    }

    function mint(string[] memory tokenURIs, address priceFeed)
        public
        returns (uint256)
    {
        require(tokenURIs.length == URIsPerToken, "too many or too few URIs");
        _mint(msg.sender, currentId);
        setTokenURIs(currentId, tokenURIs);
        priceFeedById[currentId] = priceFeed;
        return currentId++;
    }

    function mint(string[] memory tokenURIs) public override returns (uint256) {
        return mint(tokenURIs, defaultPriceFeed);
    }

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
        uint256 yesterday = block.timestamp - 86400;

        int256 currentPrice = WinkLinkAggregator(priceFeedById[tokenId])
            .latestAnswer();

        uint256 latestRound = WinkLinkAggregator(priceFeedById[tokenId])
            .latestRound();

        uint256 timestamp = type(uint256).max;
        while (timestamp > yesterday) {
            latestRound--;
            timestamp = WinkLinkAggregator(priceFeedById[tokenId]).getTimestamp(
                    latestRound
                );
        }

        int256 yesterdaysPrice = WinkLinkAggregator(priceFeedById[tokenId])
            .getAnswer(latestRound);

        int256 change = (currentPrice * 1_000) / yesterdaysPrice;

        uint256 uriId;
        if (change > 1025) {
            uriId = 4;
        } else if (change > 1010) {
            uriId = 3;
        } else if (change > 990) {
            uriId = 2;
        } else if (change > 975) {
            uriId = 1;
        } else {
            uriId = 0;
        }

        return currentURI[tokenId][uriId];
    }

    function getPriceInfo(uint256 tokenId)
        public
        view
        returns (
            int256,
            int256,
            int256
        )
    {
        uint256 yesterday = block.timestamp - 86400;

        int256 currentPrice = WinkLinkAggregator(priceFeedById[tokenId])
            .latestAnswer();

        uint256 latestRound = WinkLinkAggregator(priceFeedById[tokenId])
            .latestRound();

        uint256 timestamp = type(uint256).max;
        while (timestamp > yesterday) {
            latestRound--;
            timestamp = WinkLinkAggregator(priceFeedById[tokenId]).getTimestamp(
                    latestRound
                );
        }

        int256 yesterdaysPrice = WinkLinkAggregator(priceFeedById[tokenId])
            .getAnswer(latestRound);

        int256 change = (currentPrice * 1_000) / yesterdaysPrice;

        return (yesterdaysPrice, currentPrice, change);
    }

    function getCurrentURIs() public view returns (string[] memory) {
        string[] memory allURIs = new string[](currentId);
        for (uint256 i = 0; i < currentId; i++) {
            allURIs[i] = getTokenURI(i);
        }
        return allURIs;
    }
}
