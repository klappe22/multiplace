const fs = require('fs');
const { uploadImageToIpfs } = require('../ifpsHelper');

const main = async () => {
  const types = ['soyjak', 'wojak', 'doomer'];
  const assets = ['trx', 'btc', 'eth'];

  for (const type of types) {
    for (const asset of assets) {
      let uris = {};
      for (let i = 0; i < 5; i++) {
        let path = `./wojak/${type}/${asset}/${i}.jpg`;
        uris[i] = await uploadImageToIpfs(path);
        console.log(uris[i]);
      }
      console.log(JSON.stringify(uris));
      fs.writeFileSync(
        `./wojak/${type}/${asset}/imageURIs.json`,
        JSON.stringify(uris)
      );
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
