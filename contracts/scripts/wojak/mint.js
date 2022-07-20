const fs = require('fs');
const { wojakByPrice, assetToPriceFeed } = require('../addresses');
const { getNileConnection, getMainnetConnection } = require('../helper');
const { uploadMetadataToIpfs } = require('../ifpsHelper');
const metadataSoyjak0 = require('./uris/soyjak0.json');
const metadataSoyjak1 = require('./uris/soyjak1.json');
const metadataSoyjak2 = require('./uris/soyjak2.json');
const metadataSoyjak3 = require('./uris/soyjak3.json');
const metadataSoyjak4 = require('./uris/soyjak4.json');
require('dotenv').config();

const metadatas = [
  metadataSoyjak0,
  metadataSoyjak1,
  metadataSoyjak2,
  metadataSoyjak3,
  metadataSoyjak4,
];

const main = async () => {
  let tronWeb = getMainnetConnection('pk');
  let contract = await tronWeb.contract().at(wojakByPrice.mainnet);

  let path = `./wojak/wojak/trx/metadataURIs.json`;
  let content = fs.readFileSync(path, 'utf8');

  let metadataURIs = JSON.parse(content);
  let result = await contract['mint(string[],address)'](
    Object.values(metadataURIs),
    assetToPriceFeed.mainnet['trx']
  ).send({
    feeLimit: 200_000_000,
    callValue: 0,
    shouldPollResponse: false,
  });

  console.log(result);

  return;

  const types = ['soyjak', 'wojak', 'doomer'];
  const assets = ['trx', 'btc', 'eth'];
  for (const type of types) {
    for (const asset of assets) {
      // mint 2 of every type-assset combo
      let path = `./wojak/${type}/${asset}/metadataURIs.json`;
      let content = fs.readFileSync(path, 'utf8');

      let metadataURIs = JSON.parse(content);
      for (let i = 0; i < 2; i++) {
        let result = await contract['mint(string[],address)'](
          Object.values(metadataURIs),
          assetToPriceFeed.nile[asset].base58
        ).send({
          feeLimit: 200_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });

        console.log(result);
      }
    }
  }

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
