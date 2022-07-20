const fs = require('fs');
const Exchange = require('../../out/Exchange.sol/Exchange.json');
const { exchange, wojakByPrice, whalefish } = require('../addresses');
const { getNileConnection } = require('../helper');
require('dotenv').config();

const main = async () => {
  let tronWeb = getNileConnection('pk');

  let contract = await tronWeb.contract(Exchange.abi, exchange.nile);

  let deployer = await contract.deployer().call();

  // list 5 of whalefish
  for (let i = 0; i < 5; i++) {
    let makerAsk = {
      signer: tronWeb.address.fromHex(deployer),
      collection: whalefish.nile,
      price: 0,
      tokenId: i,
      startTime: 0,
      endTime: new Date().getTime() + 100000000,
    };

    let result = await contract.createMakerAsk(Object.values(makerAsk)).send({
      feeLimit: 200_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
    console.log(result);
  }

  // list 5 of wojaks
  for (let i = 0; i < 5; i++) {
    let makerAsk = {
      signer: tronWeb.address.fromHex(deployer),
      collection: wojakByPrice.nile,
      price: 0,
      tokenId: i,
      startTime: 0,
      endTime: new Date().getTime() + 100000000,
    };

    let result = await contract.createMakerAsk(Object.values(makerAsk)).send({
      feeLimit: 200_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
    console.log(result);
  }

  let makerAsk = {
    signer: tronWeb.address.fromHex(deployer),
    collection: wojakByPrice.nile,
    price: 1000,
    tokenId: 9,
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
