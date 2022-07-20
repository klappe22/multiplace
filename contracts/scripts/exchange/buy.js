const fs = require('fs');
const Exchange = require('../../out/Exchange.sol/Exchange.json');
const { exchange, wojakByPrice, whalefish } = require('../addresses');
const { getNileConnection } = require('../helper');
require('dotenv').config();

const main = async () => {
  let tronWeb = getNileConnection('pk18');

  let contract = await tronWeb.contract(Exchange.abi, exchange.nile);

  let takerBid = {
    taker: tronWeb.defaultAddress.base58,
    price: 0,
    collection: whalefish.nile,
    tokenId: 5,
  };

  console.log(takerBid);

  let result = await contract
    .matchAskWithTakerBid(Object.values(takerBid))
    .send({
      feeLimit: 200_000_000,
      callValue: takerBid.price,
      shouldPollResponse: false,
    });
  console.log(result);

  // mint NFT
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
