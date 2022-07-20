const fs = require('fs');
const WojakByPrice = require('../../out/WojakByPrice.sol/WojakByPrice.json');
const { getNileConnection } = require('../helper');
const { uploadMetadataToIpfs } = require('../ifpsHelper');
require('dotenv').config();

const description =
  "A collection of Wojaks and Wojak derivatives representing the mood after a price change. If the price hasn't changed much, Wojak is neutral. If it's down much, Wojak is mad. If it's up then Wojak is happy. Every NFT represent a different asset, which is shown in the images and metadata";

const name = 'Wojaks By Price';

const mood = {
  soyjak: ['Mad', 'Crying', 'Neutral', 'Happy', 'Enthusiastic'],
  wojak: ['Deranged', 'Withered', 'Neutral', 'Happy', 'Enjoying'],
  doomer: ['Finished', 'Helpless', 'Neutral', 'Happy', 'Enjoying'],
};

const main = async () => {
  // get all image uris
  const types = ['soyjak', 'wojak', 'doomer'];
  const assets = ['trx', 'btc', 'eth'];
  let path;
  for (const type of types) {
    const metadataURIToImageURI = {};
    for (const asset of assets) {
      metadataURIs = {};
      path = `./wojak/${type}/${asset}/imageURIs.json`;
      let content = fs.readFileSync(path, 'utf8');
      let imageURIs = JSON.parse(content);
      for (let i = 0; i < 5; i++) {
        const metadata = {
          description,
          name,
          attributes: [
            {
              trait_type: 'Type',
              value: type.slice(0, 1).toUpperCase() + type.slice(1),
            },
            {
              trait_type: 'Asset',
              value: '$' + asset.toUpperCase(),
            },
            {
              trait_type: 'Level',
              value: (i + 1).toString(),
            },
            {
              trait_type: 'Mood',
              value: mood[type][i],
            },
          ],
          image: imageURIs[i],
          images: Object.values(imageURIs),
        };
        metadataURIs[i] = await uploadMetadataToIpfs(metadata);
        console.log(metadataURIs[i]);
        metadataURIToImageURI[metadataURIs[i]] = imageURIs[i];
      }
      // console.log(JSON.stringify(metadataURIs));
      fs.writeFileSync(
        `./wojak/${type}/${asset}/metadataURIs.json`,
        JSON.stringify(metadataURIs)
      );
    }
    fs.writeFileSync(
      `./wojak/${type}/metadataURIToImageURI.json`,
      JSON.stringify(metadataURIToImageURI)
    );
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
