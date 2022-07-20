const { create } = require('ipfs-http-client');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

const ipfsAddOptions = {
  cidVersion: 1,
  hashAlg: 'sha2-256',
};

const auth =
  'Basic ' +
  Buffer.from(
    process.env.ipfsProjectId + ':' + process.env.ipfsProjectSecret
  ).toString('base64');

function ensureIpfsUriPrefix(cidOrURI) {
  let uri = cidOrURI.toString();
  if (!uri.startsWith('ipfs://')) {
    uri = 'ipfs://' + cidOrURI;
  }
  // Avoid the Nyan Cat bug (https://github.com/ipfs/go-ipfs/pull/7930)
  if (uri.startsWith('ipfs://ipfs/')) {
    uri = uri.replace('ipfs://ipfs/', 'ipfs://');
  }
  return uri;
}

const uploadImageToIpfs = async (path) => {
  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const imageBuffer = fs.readFileSync(path);
  const { cid } = await ipfs.add(Buffer.from(imageBuffer));
  const imageURI = ensureIpfsUriPrefix(cid);
  return imageURI;
};

const uploadMetadataToIpfs = async (metadata) => {
  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const { cid } = await ipfs.add(
    { path: '/nft/metadata.json', content: JSON.stringify(metadata) },
    ipfsAddOptions
  );

  const metadataURI = ensureIpfsUriPrefix(cid) + '/metadata.json';

  return metadataURI;
};

const generateMetadata = () => {
  return {
    description: 'a description for the whalefish collection',
    name: `whalefish`,
    attributes: [
      {
        trait_type: 'Level',
        value: '1',
      },
      {
        trait_type: 'Age',
        value: '12',
      },
      {
        trait_type: 'Color',
        value: 'Blue',
      },
      {
        trait_type: 'Size',
        value: '2',
      },
    ],
  };
};

module.exports = { generateMetadata, uploadImageToIpfs, uploadMetadataToIpfs };
