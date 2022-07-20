const WhaleFish = require('../out/WhaleFish.sol/WhaleFish.json');
const { getNileConnection } = require('./helper');
require('dotenv').config();

const main = async () => {
  let tronWeb = getNileConnection();

  const options = {
    abi: WhaleFish.abi,
    bytecode: WhaleFish.bytecode.object.slice(2),
    feeLimit: 1000000000,
    callValue: 0,
    userFeePercentage: 1,
    originEnergyLimit: 10000000,
    parameters: [],
  };

  let instance = await tronWeb.contract().new(options);
  // let instance = await tronWeb.transactionBuilder.createSmartContract(
  //   options,
  //   'TEgQdkw3j9U1nNTnJVoy5acxV4uX1tT3Ku'
  // );

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
