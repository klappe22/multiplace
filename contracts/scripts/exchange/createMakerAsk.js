const fs = require('fs');
const Exchange = require('../../out/Exchange.sol/Exchange.json');
const { exchange, wojakByPrice, whalefish } = require('../addresses');
const { getNileConnection } = require('../helper');
require('dotenv').config();

const main = async () => {
  let tronWeb = getNileConnection('pk');

  let contract = await tronWeb.contract(Exchange.abi, exchange.nile);
  let whaleFishContract = await tronWeb.contract().at(whalefish.nile);
  let wojakContract = await tronWeb.contract().at(wojakByPrice.nile);

  let res = await whaleFishContract
    .setApprovalForAll(exchange.nile, true)
    .send();
  console.log(res);
  res = await wojakContract.setApprovalForAll(exchange.nile, true).send();
  console.log(res);

  let deployer = await contract.deployer().call();

  let makerAsk = {
    signer: tronWeb.address.fromHex(deployer),
    collection: whalefish.nile,
    price: 0,
    tokenId: 5,
    startTime: 0,
    endTime: new Date().getTime() + 100000000,
  };

  let result = await contract.createMakerAsk(Object.values(makerAsk)).send({
    feeLimit: 200_000_000,
    callValue: 0,
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
