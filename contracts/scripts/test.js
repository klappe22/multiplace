const { getNileConnection, getMainnetConnection } = require('./helper');
const { whalefish } = require('./addresses');

const main = async () => {
  let tronWeb = getNileConnection('pk');
  // let tronWeb = getMainnetConnection('pk');

  let contract = await tronWeb
    .contract()
    .at('TWaKkEYYfgNWYCxyMFQf3gC555eemdR425');
  // console.log(contract);
  let uri = await contract.getTokenURIs(1).call();
  console.log(uri);
  // console.log(tronWeb.fromSun('841742040'));
  // // 841742040
  // // 1000000000
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
