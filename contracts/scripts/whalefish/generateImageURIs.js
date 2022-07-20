const fs = require('fs');
const { uploadImageToIpfs } = require('../ifpsHelper');

const main = async () => {
  // let res = await uploadImageToIpfs('./whalefish/whale/whale.jpg');
  const colors = ['blue', 'red', 'green', 'purple', 'orange', 'pink'];
  const types = ['fish', 'whale'];

  for (const type of types) {
    let uris = {};
    for (const color of colors) {
      let path = `./whalefish/${type}/${color}.jpg`;
      uris[color] = await uploadImageToIpfs(path);
    }

    console.log(JSON.stringify(uris));
    fs.writeFileSync(
      `./whalefish/${type}/imageURIs.json`,
      JSON.stringify(uris)
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
