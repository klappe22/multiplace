const fs = require('fs');
const WhaleFish = require('../../out/WhaleFish.sol/WhaleFish.json');
const { whalefish } = require('../addresses');
const { getNileConnection, getMainnetConnection } = require('../helper');
require('dotenv').config();

const main = async () => {
  let tronWeb = getMainnetConnection('pk');
  let contract = await tronWeb.contract().at(whalefish.mainnet);

  const types = ['fish', 'whale'];
  const colors = ['blue', 'red', 'green', 'purple', 'orange', 'pink'];

  let path = `./whalefish/fish/metadataURIs.json`;
  let content = fs.readFileSync(path, 'utf8');
  let metadataURIsFish = JSON.parse(content);

  path = `./whalefish/whale/metadataURIs.json`;
  content = fs.readFileSync(path, 'utf8');
  let metadataURIsWhale = JSON.parse(content);

  let metadataURIs = [metadataURIsFish['blue'], metadataURIsWhale['blue']];
  let result = await contract.mint(Object.values(metadataURIs)).send({
    feeLimit: 200_000_000,
    callValue: 0,
    shouldPollResponse: false,
  });
  console.log(result);
  return;

  for (const color of colors) {
    // mint 2 of every type-color combo
    let metadataURIs = [metadataURIsFish[color], metadataURIsWhale[color]];
    for (let i = 0; i < 2; i++) {
      let result = await contract.mint(Object.values(metadataURIs)).send({
        feeLimit: 200_000_000,
        callValue: 0,
        shouldPollResponse: false,
      });
      console.log(result);
    }
  }
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
