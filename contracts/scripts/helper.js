const TronWeb = require('tronweb');
require('dotenv').config({ path: '../.env' });

const mainnet = 'https://api.trongrid.io';
const nile = 'https://api.nileex.io/';
const nileAlt = 'https://nile.trongrid.io/';

const getNileConnection = (pk) => {
  const tronWeb = new TronWeb({
    fullHost: nile,
    privateKey: process.env[pk],
  });
  return tronWeb;
};

const getMainnetConnection = () => {
  const tronWeb = new TronWeb({
    fullHost: mainnet,
    headers: { 'TRON-PRO-API-KEY': process.env.api },
    privateKey: process.env.pk,
  });
  return tronWeb;
};

module.exports = { getNileConnection, getMainnetConnection };
