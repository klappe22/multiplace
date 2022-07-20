const Exchange = require('../../out/Exchange.sol/Exchange.json');
const { getNileConnection, getMainnetConnection } = require('../helper');
require('dotenv').config();

const main = async () => {
  let tronWeb = getMainnetConnection('pk');

  const options = {
    abi: Exchange.abi,
    bytecode: Exchange.bytecode.object.slice(2),
    feeLimit: 5000000000,
    callValue: 0,
    userFeePercentage: 1,
    originEnergyLimit: 10000000,
    parameters: [],
  };

  let instance = await tronWeb.contract().new(options);

  console.log(instance);
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
