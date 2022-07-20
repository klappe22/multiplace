const fs = require('fs');
const { uploadMetadataToIpfs } = require('../ifpsHelper');

const description =
  "A collection of Whales and Fishes, where the active image for a NFT changes depending on the balance of it's owner. If the owner have more than 1000TRX, then it's a whale, otherwise it's a fish";

const name = 'WhaleFish';

const main = async () => {
  const types = ['fish', 'whale'];
  const colors = ['blue', 'red', 'green', 'purple', 'orange', 'pink'];

  let content = fs.readFileSync(`./whalefish/fish/imageURIs.json`, 'utf8');
  let imageURIsFish = JSON.parse(content);

  content = fs.readFileSync(`./whalefish/whale/imageURIs.json`, 'utf8');
  let imageURIsWhale = JSON.parse(content);

  for (const type of types) {
    metadataURIs = {};
    metadataURIToImageURI = {};
    for (const color of colors) {
      let path = `./whalefish/${type}/imageURIs.json`;
      let content = fs.readFileSync(path, 'utf8');
      let imageURIs = JSON.parse(content);
      const metadata = {
        description,
        name,
        attributes: [
          {
            trait_type: 'Type',
            value: type.slice(0, 1).toUpperCase() + type.slice(1),
          },
          {
            trait_type: 'Color',
            value: color.slice(0, 1).toUpperCase() + color.slice(1),
          },
        ],
        image: imageURIs[color],
        images: [imageURIsFish[color], imageURIsWhale[color]],
      };
      metadataURIs[color] = await uploadMetadataToIpfs(metadata);
      metadataURIToImageURI[metadataURIs[color]] = imageURIs[color];
      console.log(metadataURIs[color]);
    }
    console.log(JSON.stringify(metadataURIs));
    fs.writeFileSync(
      `./whalefish/${type}/metadataURIs.json`,
      JSON.stringify(metadataURIs)
    );
    fs.writeFileSync(
      `./whalefish/${type}/metadataURIToImageURI.json`,
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
