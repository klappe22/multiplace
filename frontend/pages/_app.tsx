import type { AppProps } from 'next/app';
import { createContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import * as TronWeb from 'tronweb';
const TronWeb = require('tronweb');
import { blackTheme, looksrareTheme, GlobalStyle } from '../design/themes';
import Layout from '../components/Layout';

type ctx = {
  contract: any;
  defaultAddress: {
    base58: string;
  };
  toSun: (value: string | number) => void;
  address: {
    fromHex: (value: any) => string;
  };
};
export const ChainContext = createContext('');
export const TronWebContext = createContext<ctx>({
  defaultAddress: { base58: '' },
  contract: {},
  toSun: (value) => {},
  address: {
    fromHex: (value) => '',
  },
});
export const TronWebFallbackContext = createContext('');

export const rpcToChain: { [key: string]: string } = {
  'https://api.trongrid.io': 'mainnet',
  'https://api.tronstack.io': 'mainnet',
  'https://api.shasta.trongrid.io': 'shasta',
  'https://testhttpapi.tronex.io': 'dappchain-test',
  'https://api.nileex.io': 'nile',
  'https://nile.trongrid.io': 'nile',
};

const queryClient = new QueryClient();

declare global {
  interface Window {
    tronWeb: any;
    tronLink: any;
  }
}

export type ConnectedType = {
  connected: boolean;
  setConnected: (c: boolean) => void;
};

export const ConnectedContext = createContext<ConnectedType>({
  connected: false,
  setConnected: () => {},
});

const mainnet = 'https://api.trongrid.io';
const mainnet2 = 'https://api.tronstack.io';
const nile = 'https://api.nileex.io/';

function MyApp({ Component, pageProps }: AppProps) {
  const [chain, setChain] = useState('');
  const [tronWeb, setTronWeb] = useState({
    defaultAddress: { base58: '' },
    contract: {},
    toSun: (value: any) => {},
    address: {
      fromHex: (value: any) => '',
    },
  });
  const [tronWebFallback, setTronWebFallback] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const tronWeb2 = new TronWeb({
      fullHost: mainnet2,
      privateKey: process.env.fallbackPK,
    });
    setTronWebFallback(tronWeb2);
    if (window && window.tronWeb) {
      const chain = 'mainnet';
      setChain(chain);
      setTronWeb(window.tronWeb);
      if (window.tronLink.ready) {
        setConnected(true);
      }
      // window.tronLink.request({ method: 'tron_requestAccounts' });
    } else {
      console.log('download tronlink');
    }
  }, []);

  return (
    <ThemeProvider theme={looksrareTheme}>
      <GlobalStyle />
      <ChainContext.Provider value={chain}>
        <TronWebContext.Provider value={tronWeb}>
          <TronWebFallbackContext.Provider value={tronWebFallback}>
            <ConnectedContext.Provider value={{ connected, setConnected }}>
              <QueryClientProvider client={queryClient}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              </QueryClientProvider>
            </ConnectedContext.Provider>
          </TronWebFallbackContext.Provider>
        </TronWebContext.Provider>
      </ChainContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
