const whalefish = {
  nile: 'TD12FaaSn8zYTe6m7oQuAJCimvbUqYrZ3J',
  mainnet: 'TW9EMzCBb2rtEtSNnMottgpB35hxcVBipB',
};

const wojakByPrice = {
  nile: 'TFoCtaR8rf6ywTj9PR7hY44wug6xWh8amH',
  mainnet: 'TQ4F6a5ZFCL8pEVXJpckkE3MMNKgxXFWvE',
};

const exchange = {
  nile: 'TGGTjNDjFwdVBQVBKJDxDS73QzqZdLggJn',
  mainnet: 'TSJiW4LwawHRs5Tqjntn2p7BvqZpHAjPmC',
};

const assetToPriceFeed = {
  mainnet: {
    trx: 'TXwZqjjw4HtphG4tAm5i1j1fGHuXmYKeeP',
    btc: 'TTzPaLxJMy8nwXe9NRfHopHW4KyUeavLdF',
    usd: 'TZCPyp7fWW3xnQ6gv5LG9v7S7VYbr4h2H1',
  },
  nile: {
    trx: 'TAL6RWymPLepKsLGCzWPUTKQQcWFsuHfNE',
    btc: 'TYY5GdNvHN8NVY6MYtgEPwx15pyUmLEw5J',
  },
};

module.exports = { whalefish, wojakByPrice, exchange, assetToPriceFeed };
