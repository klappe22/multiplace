const fs = require('fs');
const Exchange = require('../../out/Exchange.sol/Exchange.json');
const { exchange, wojakByPrice, whalefish } = require('../addresses');
const { getNileConnection } = require('../helper');
require('dotenv').config();

const main = async () => {
  let tronWeb = getNileConnection('pk');
  let contract = await tronWeb.contract(Exchange.abi, exchange.nile);

  // let upperLimit = await contract
  // .makerAskUpperLimitByCollection(whalefish.nile)
  // .call();
  // console.log(upperLimit.toString());

  let makerAsks = await contract
    .getMakerAsksByCollection(whalefish.nile)
    .call();

  let makerAsks2 = await contract
    .getMakerAsksByCollection(wojakByPrice.nile)
    .call();

  console.log(makerAsks);
  console.log(makerAsks2);

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
