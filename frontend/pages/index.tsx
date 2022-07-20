import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo, useContext } from 'react';
import styled from 'styled-components';
import { TronWebContext, ChainContext } from './_app';
import { FiActivity, FiExternalLink } from 'react-icons/fi';
import { mainnet, nile } from '../utils/addresses';

const OuterContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  gap: 1.5rem;
`;

const wojakCarousel = [
  '/wojak_tron_enjoying.jpg',
  '/wojak_btc_happy.jpg',
  '/wojak_btc_enjoying.jpg',
  '/wojak_btc_withered.jpg',
  '/wojak_eth_deranged.jpg',
  '/wojak_trx_neutral.jpg',
  '/doomer_trx_finished.jpg',
];

const whalefishCarousel = [
  '/bluefish.jpg',
  '/bluewhale.jpg',
  '/greenfish.jpg',
  '/greenwhale.jpg',
  '/orangefish.jpg',
  '/orangewhale.jpg',
  '/pinkfish.jpg',
  '/pinkwhale.jpg',
  '/purplefish.jpg',
  '/purplewhale.jpg',
  '/redfish.jpg',
  '/redwhale.jpg',
];

const timestampCarousel = [
  '/darkblue.jpg',
  '/pink.jpg',
  '/blue.jpg',
  '/orange.jpg',
  '/purple.jpg',
  '/green.jpg',
];

const darkmodePFPCarousel = [
  '/qmarkdarkblue.jpg',
  '/qmarkpink.jpg',
  '/qmarkorange.jpg',
  '/qmarkpurple.jpg',
  '/qmarkgreen.jpg',
];

const plantCarousel = [
  '/plant0.jpg',
  '/plant1.jpg',
  '/plant2.jpg',
  '/plant3.jpg',
  '/plant4.jpg',
];

const formatAddress = (address: string) => {
  return (
    address.slice(0, 4) +
    '...' +
    address.slice(address.length - 4, address.length)
  );
};

const Home: NextPage = () => {
  const router = useRouter();

  const [wojakImage, setWojakImage] = useState('/wojak_tron_enjoying.jpg');
  const [whaleFishImage, setWhaleFishImage] = useState('/bluewhale.jpg');
  const [plantImage, setPlantImage] = useState('/plant2.jpg');
  const [timestampImage, setTimestampImage] = useState('/darkblue.jpg');
  const [darkmodePFPImage, setDarkmodePFPImage] = useState('/qmarkpurple.jpg');

  useEffect(() => {
    const wojakInterval = setInterval(() => {
      setWojakImage(
        wojakCarousel[Math.floor(Math.random() * wojakCarousel.length)]
      );
    }, 2000);
    const whalefishInterval = setInterval(() => {
      setWhaleFishImage(
        whalefishCarousel[Math.floor(Math.random() * whalefishCarousel.length)]
      );
    }, 3000);
    const plantInterval = setInterval(() => {
      setPlantImage(
        plantCarousel[Math.floor(Math.random() * plantCarousel.length)]
      );
    }, 2500);
    const timestampInterval = setInterval(() => {
      setTimestampImage(
        timestampCarousel[Math.floor(Math.random() * timestampCarousel.length)]
      );
    }, 3500);
    const darkmodePFPInterval = setInterval(() => {
      setDarkmodePFPImage(
        darkmodePFPCarousel[
          Math.floor(Math.random() * darkmodePFPCarousel.length)
        ]
      );
    }, 1500);
    return () => {
      clearInterval(wojakInterval);
      clearInterval(whalefishInterval);
      clearInterval(plantInterval);
      clearInterval(timestampInterval);
      clearInterval(darkmodePFPInterval);
    };
  }, []);

  const handleAddressClick = (e: any, address: string) => {
    e.stopPropagation();
    window.open(`https://tronscan.org/#/address/${address}`);
  };

  return (
    <OuterContainer>
      <Header>
        <p>
          The Next-Gen Marketplace for <span>Multi-NFTs</span>
        </p>
      </Header>
      <Main>
        <Menu>
          <Choice active={true}>Test Collections</Choice>
          <Choice active={false}>Future Collections</Choice>
        </Menu>
        <Collections>
          <div className="header">
            <div>Collections</div>
            <div>Items</div>
            <div>Multiness</div>
            <div>Address</div>
            <div>More Images</div>
          </div>
          <Collection
            hover={true}
            onClick={() => router.push('/collections/wojaksbyprice')}
          >
            <div className="collection">
              <img src={wojakImage} alt="wojak"></img>
              <p>Wojaks By Price</p>
            </div>
            <div>100</div>
            <div>5</div>
            <div
              className="address"
              onClick={(e) => handleAddressClick(e, mainnet.wojaksByPrice)}
            >
              {formatAddress(mainnet.wojaksByPrice)}
              <FiExternalLink />
            </div>
            <div className="more">
              <img src="/wojak_btc_enjoying.jpg" alt="wojak"></img>
              <img src="/wojak_trx_neutral.jpg" alt="wojak"></img>
              <img src="/wojak_btc_neutral.jpg" alt="wojak"></img>
              <img src="/doomer_trx_finished.jpg" alt="doomer"></img>
              <img src="/wojak_eth_deranged.jpg" alt="wojak"></img>
            </div>
          </Collection>
          <Collection
            hover={true}
            onClick={() => router.push('/collections/whalefish')}
          >
            <div className="collection">
              <img src={whaleFishImage} alt="whale"></img>
              <p>WhaleFish</p>
            </div>
            <div>50</div>
            <div>2</div>
            <div
              className="address"
              onClick={(e) => handleAddressClick(e, mainnet.whaleFish)}
            >
              {formatAddress(mainnet.whaleFish)}
              <FiExternalLink />
            </div>
            <div className="more">
              <img src="/bluewhale.jpg" alt="whale"></img>
              <img src="/greenwhale.jpg" alt="whale"></img>
              <img src="/purplefish.jpg" alt="fish"></img>
              <img src="/redwhale.jpg" alt="whale"></img>
              <img src="/bluefish.jpg" alt="fish"></img>
            </div>
          </Collection>
          <Collection hover={false}>
            <div className="collection">
              <img src={plantImage} alt="whale"></img>
              <div className="coming-soon-p">
                <p>Plants</p>
                <span>coming soon</span>
              </div>
            </div>
            <div>500</div>
            <div>5</div>
            <div>TBD</div>
            <div className="more">
              <img src="/plant0.jpg" alt="plant"></img>
              <img src="/plant1.jpg" alt="plant"></img>
              <img src="/plant2.jpg" alt="plant"></img>
              <img src="/plant3.jpg" alt="plant"></img>
              <img src="/plant4.jpg" alt="plant"></img>
            </div>
          </Collection>
          <Collection hover={false}>
            <div className="collection">
              <img src={timestampImage} alt="whale"></img>
              <div className="coming-soon-ts">
                <p>Timestamp</p>
                <span>coming soon</span>
              </div>
            </div>
            <div>10000</div>
            <div>24</div>
            <div>TBD</div>
            <div className="more">
              <img src="/green.jpg" alt="green"></img>
              <img src="/purple.jpg" alt="purple"></img>
              <img src="/orange.jpg" alt="orange"></img>
              <img src="/darkblue.jpg" alt="darkblue"></img>
              <img src="/pink.jpg" alt="pink"></img>
            </div>
          </Collection>
          <Collection hover={false}>
            <div className="collection">
              <img src={darkmodePFPImage} alt="question mark"></img>
              <div className="coming-soon-dm">
                <p>Darkmode PFPs</p>
                <span>coming soon</span>
              </div>
            </div>
            <div>1000</div>
            <div>5</div>
            <div>TBD</div>
            <div className="more">
              <img src="/qmarkpink.jpg" alt="pink question mark"></img>
              <img src="/qmarkdarkblue.jpg" alt="darkblue question mark"></img>
              <img src="/qmarkgreen.jpg" alt="green question mark"></img>
              <img src="/qmarkpurple.jpg" alt="purple question mark"></img>
              <img src="/qmarkorange.jpg" alt="orange question mark"></img>
            </div>
          </Collection>
        </Collections>
      </Main>
      <Bottom>
        <div className="header">
          <p>The Marketplace for Next-Gen NFTs</p>
        </div>
        <div className="largebox">
          <div className="box">
            <p className="header">Support for TRC721m</p>
            <p>
              Multiplace has full support for the newly developed standard for
              mNFTs, TRC721m (which is an extension of TRC721). Read more at{' '}
              <a
                href="https://github.com/klappe22/multiplace"
                target="_blank"
                rel="noreferrer"
              >
                github.com/klappe22/multiplace
              </a>
            </p>
          </div>
          <div className="box">
            <p className="header">Participant in Tron Hackathon</p>
            <p>
              Multiplace is currently participating in the Tron Hackathon. A
              link to our devpost submission can be found at{' '}
              <a href="https://devpost.com" target="_blank" rel="noreferrer">
                devpost.com
              </a>
              . Our TronDAO forum post can be found at{' '}
              <a
                href="https://forum.trondao.org"
                target="_blank"
                rel="noreferrer"
              >
                forum.trondao.org
              </a>
            </p>
          </div>
          <div className="box">
            <p className="header">Hackathon Test Collections</p>
            <p>
              All collections provided are for test purposes. Do not expect them
              to have any value at all, since they are only here to show you
              examples of what can be done with Multi-NFTs.
            </p>
          </div>
          {/* <div className="box">
            <p className="header">Support for TRC721m</p>
            <p>
              Genie shows listings from all major marketplaces so you can
              discover more in fewer tabs.
            </p>
          </div> */}
        </div>
      </Bottom>
    </OuterContainer>
  );
};

const Bottom = styled.div`
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.background.secondary};
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .header {
    width: 100%;
    max-width: 1200px;
    p {
      color: ${({ theme }) => theme.colors.primary};
      padding-top: 2rem;
      font-size: ${({ theme }) => theme.typeScale.header1};
      font-weight: 500;
    }
  }

  .largebox {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;

    width: 100%;
    max-width: 1200px;
    overflow-y: scroll;
    .box {
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      line-height: 1.5rem;

      .header {
        font-size: ${({ theme }) => theme.typeScale.header4};
        font-weight: 500;
      }
      a {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const Main = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 1rem;
`;

const Collection = styled.div<{ hover: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 15rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.background.tertiary};

  :hover {
    cursor: ${({ hover }) => (hover ? 'pointer' : 'default')};
    background-color: ${({ theme }) => theme.background.secondary};
  }

  .address {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .collection {
    padding-left: 0.75rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    img {
      border-radius: 0.5rem;
      height: 42px;
      width: 42px;
    }
    p {
      font-weight: 600;
    }
  }

  .more {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    img {
      border-radius: 0.5rem;
      height: 42px;
      width: 42px;
    }
  }

  .coming-soon-ts {
    position: relative;
    width: 9.5rem;
    height: 42px;
    display: flex;
    align-items: center;
    span {
      font-size: 10px;
      position: absolute;
      top: 9px;
      right: 0;
    }
  }

  .coming-soon-dm {
    position: relative;
    width: 11.75rem;
    height: 42px;
    display: flex;
    align-items: center;
    span {
      font-size: 10px;
      position: absolute;
      top: 9px;
      right: 0;
    }
  }

  .coming-soon-p {
    position: relative;
    width: 7.15rem;
    height: 42px;
    display: flex;
    align-items: center;
    span {
      font-size: 10px;
      position: absolute;
      top: 9px;
      right: 0;
    }
  }
`;

const Collections = styled.div`
  padding: 0 2rem;

  display: flex;
  flex-direction: column;
  /* gap: 0.75rem; */

  /* padding: 1rem; */
  .header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 15rem;
    color: ${({ theme }) => theme.text.primary};
    font-size: ${({ theme }) => theme.typeScale.smallParagraph};
    padding: 1rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.background.tertiary};
  }
`;

const Choice = styled.div<{ active: boolean }>`
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  border: 2px solid
    ${({ theme, active }) =>
      active ? theme.colors.primary : theme.background.senary};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.text.secondary};

  :hover {
    cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
    /* border: 2px solid ${({ theme }) => theme.colors.primary}; */
    /* color: ${({ theme }) => theme.colors.primary}; */
  }
`;
const Menu = styled.div`
  padding: 0 2rem;
  padding-top: 3.5rem;
  padding-bottom: 1rem;
  display: flex;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-size: 3.25rem;
  font-weight: 700;
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Home;
