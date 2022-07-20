const WojakByPrice = require('../../out/WojakByPrice.sol/WojakByPrice.json');
const { assetToPriceFeed } = require('../addresses');
const { getNileConnection, getMainnetConnection } = require('../helper');
require('dotenv').config();

const main = async () => {
  let tronWeb = getMainnetConnection('pk');
  const URIsPerToken = 5;
  const tronUsdNile = assetToPriceFeed.mainnet['trx'];

  const options = {
    abi: WojakByPrice.abi,
    bytecode: WojakByPrice.bytecode.object.slice(2),
    feeLimit: 1000000000,
    callValue: 0,
    userFeePercentage: 1,
    originEnergyLimit: 10000000,
    parameters: [tronUsdNile, URIsPerToken],
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
