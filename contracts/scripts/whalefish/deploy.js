const WhaleFish = require('../../out/WhaleFish.sol/WhaleFish.json');
const { getNileConnection, getMainnetConnection } = require('../helper');
require('dotenv').config();

const main = async () => {
  let tronWeb = getMainnetConnection('pk');
  const URIsPerToken = 2;

  const options = {
    abi: WhaleFish.abi,
    bytecode: WhaleFish.bytecode.object.slice(2),
    feeLimit: 1000000000,
    callValue: 0,
    userFeePercentage: 1,
    originEnergyLimit: 10000000,
    parameters: [URIsPerToken],
  };

  let instance = await tronWeb.contract().new(options);
  console.log(instance.address);
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
