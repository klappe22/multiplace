import { useRouter } from 'next/router';
import { useState, useEffect, useMemo, useContext } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import {
  TronWebContext,
  TronWebFallbackContext,
  ChainContext,
} from '../../_app';
import {
  collectionNameToAddress,
  metadataURIToImageURI,
} from '../../../utils/misc';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { collectionNameToNameAndDescription } from '../../../utils/misc';
import { mainnet, nile } from '../../../utils/addresses';
import Exchange from '../../../../contracts/out/Exchange.sol/Exchange.json';
import Rules from '../../../components/Rules';
import { BsCollection, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { BiAlignLeft } from 'react-icons/bi';

const OuterContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 100vh;
`;

const knownCollectionsName = ['whalefish', 'wojaksbyprice'];

const currentURIsFetcher = async (tronWeb: any, collection: any) => {
  let knownCollection = false;
  for (const cl of knownCollectionsName) {
    if (cl.toLowerCase() === collection.toLowerCase()) {
      knownCollection = true;
      break;
    }
  }

  if (!knownCollection) {
    throw new Error('unknown collection!');
  }

  let contract = await tronWeb
    .contract()
    .at(collectionNameToAddress.mainnet[collection.toLowerCase()]);

  let uris = await contract.getCurrentURIs().call();

  uris = uris.map((uri: string) => {
    return {
      uri: `https://multiplace.infura-ipfs.io/ipfs/${metadataURIToImageURI[
        uri
      ].slice(7)}`,
      id: Math.random(),
    };
  });

  return uris;
};

const imageURIsFetcher = async (tronWeb: any, collection: any) => {
  let knownCollection = false;
  for (const cl of knownCollectionsName) {
    if (cl.toLowerCase() === collection.toLowerCase()) {
      knownCollection = true;
      break;
    }
  }

  if (!knownCollection) {
    throw new Error('unknown collection!');
  }

  let contract = await tronWeb
    .contract()
    .at(collectionNameToAddress.mainnet[collection.toLowerCase()]);

  let uris = await contract.getAllTokenURIs().call();
  let urisPerToken = (await contract.URIsPerToken().call()).toNumber();
  let currentId = (await contract.currentId().call()).toNumber();

  const imageURIsById = [];
  for (let i = 0; i < currentId; i++) {
    const urisForTokenId = [];
    for (let j = 0; j < urisPerToken; j++) {
      const imageURI = {
        uri: `https://multiplace.infura-ipfs.io/ipfs/${metadataURIToImageURI[
          uris[i * urisPerToken + j]
        ].slice(7)}`,
        id: Math.random(),
      };

      urisForTokenId.push(imageURI);
    }

    imageURIsById.push(urisForTokenId);
  }
  return imageURIsById;
};

const listingFetcher = async (tronWeb: any, collection: any) => {
  let knownCollection = false;
  for (const cl of knownCollectionsName) {
    if (cl.toLowerCase() === collection.toLowerCase()) {
      knownCollection = true;
      break;
    }
  }

  if (!knownCollection) {
    throw new Error('unknown collection!');
  }

  let contract = await tronWeb.contract(Exchange.abi, nile.exchange);

  let makerAsks = await contract
    .getMakerAsksByCollection(collectionNameToAddress.mainnet[collection])
    .call();

  const makerAsksObj: { [key: string]: string } = {};

  for (const makerAsk of makerAsks) {
    makerAsksObj[makerAsk[0].toString()] = tronWeb.fromSun(
      makerAsk[1].toString()
    );
  }

  return makerAsksObj;
};

export default function Collection() {
  const [showRules, setShowRules] = useState(false);
  const tronWeb = useContext(TronWebContext);
  const tronWebFallback = useContext(TronWebFallbackContext);
  const router = useRouter();

  let { collection } = router.query;
  collection = collection as string; // I promise it's a fcking string

  const { asPath } = router;

  // fetch all nfts in this collection
  const {
    isLoading,
    isError,
    data: imageURIsPerId,
  } = useQuery(
    ['allImageURIs', collection],
    () => imageURIsFetcher(tronWebFallback, collection),
    {
      enabled: !!collection && !!tronWebFallback,
      // staleTime: Infinity,
    }
  );

  const {
    isLoading: isl,
    isError: ise,
    data: currentURIs,
  } = useQuery(
    ['allCurrentURIs', collection],
    () => currentURIsFetcher(tronWebFallback, collection),
    {
      enabled: !!collection && !!tronWebFallback,
      // staleTime: Infinity,
    }
  );

  const { data: makerAsks } = useQuery(
    ['listing', collection],
    () => listingFetcher(tronWebFallback, collection),
    {
      enabled: !!collection && !!tronWebFallback,
    }
  );

  let collectionName = '';
  if (collection) {
    collectionName = collectionNameToNameAndDescription[collection].name;
  }

  return (
    <>
      <Top>
        <p className="header">
          {collection && collectionNameToNameAndDescription[collection].name}{' '}
          <GoVerified />
        </p>
        <p>
          {collection &&
            collectionNameToNameAndDescription[collection].description}
        </p>
        <DropdownChoice>
          <div className="outer" onClick={() => setShowRules(!showRules)}>
            <div>
              <BiAlignLeft />
              <p>Rules</p>
            </div>
            <div>{showRules ? <BsChevronUp /> : <BsChevronDown />}</div>
          </div>
          {showRules && collection && (
            <Rules asset="asset" collection={collection} />
          )}
        </DropdownChoice>
      </Top>
      <OuterContainer>
        <Main>
          {currentURIs &&
            imageURIsPerId &&
            imageURIsPerId.map &&
            imageURIsPerId?.map((imageURIs, i) => {
              return (
                <Link href={`${asPath}/${i}`} key={currentURIs[i].id}>
                  <NFT>
                    <img src={currentURIs[i].uri} alt="a" />
                    <div className="description">
                      <p>
                        {collectionName} #{i}
                      </p>
                      <div className="bottom">
                        <p>
                          {makerAsks && i in makerAsks
                            ? `${makerAsks[i.toString()]} TRX`
                            : 'Unlisted'}
                        </p>
                        <div className="details">
                          <p>Details</p>
                        </div>
                      </div>
                    </div>
                    <Carousel>
                      {imageURIs.map((imageURI) => {
                        return (
                          <img
                            className="carousel-img"
                            src={imageURI.uri}
                            alt="a"
                            key={imageURI.id}
                          />
                        );
                      })}
                    </Carousel>
                  </NFT>
                </Link>
              );
            })}
        </Main>
      </OuterContainer>
    </>
  );
}

const Carousel = styled.div`
  color: red;
  position: absolute;
  left: 0.75rem;
  bottom: 5.5rem;

  display: flex;
  gap: 0.3rem;

  .carousel-img {
    border-radius: 0.25rem;
    height: 35px;
    width: 35px;
    box-shadow: 0px 0px 0px 1px black;
  }
`;

const Main = styled.div`
  /* padding-top: 0.5rem; */
  /* display: flex; */
  gap: 1.75rem;
  /* flex-wrap: wrap; */
  /* overflow-y: scroll; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  @media (max-width: 2000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media (max-width: 1550px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 950px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const NFT = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 1rem 1rem 0 0;
  cursor: pointer;
  width: 300px;

  @media (max-width: 1700px) {
    width: 275px;
  }

  @media (max-width: 1550px) {
    width: 300px;
  }
  @media (max-width: 1400px) {
    width: 275px;
  }
  @media (max-width: 1250px) {
    width: 250px;
  }
  @media (max-width: 1150px) {
    width: 225px;
  }
  @media (max-width: 1050px) {
    width: 200px;
  }
  @media (max-width: 950px) {
    width: 225px;
  }

  img {
    border-radius: 0.5rem 0.5rem 0 0;
    height: 300px;
    width: 300px;
    @media (max-width: 1700px) {
      height: 275px;
      width: 275px;
    }
    @media (max-width: 1550px) {
      height: 300px;
      width: 300px;
    }
    @media (max-width: 1400px) {
      height: 275px;
      width: 275px;
    }
    @media (max-width: 1250px) {
      height: 250px;
      width: 250px;
    }
    @media (max-width: 1150px) {
      height: 225px;
      width: 225px;
    }
    @media (max-width: 1050px) {
      height: 200px;
      width: 200px;
    }
    @media (max-width: 950px) {
      height: 225px;
      width: 225px;
    }
  }

  .description {
    border-radius: 0 0 0.5rem 0.5rem;
    border-bottom: 2px solid ${({ theme }) => theme.background.senary};
    border-right: 2px solid ${({ theme }) => theme.background.senary};
    border-left: 2px solid ${({ theme }) => theme.background.senary};
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.65rem;

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .details {
        border-radius: 0.25rem;
        padding: 0.35rem;
        border: 1px solid ${({ theme }) => theme.background.quinary};
        p {
          color: ${({ theme }) => theme.colors.primary};
          font-size: ${({ theme }) => theme.typeScale.smallParagraph};
          font-weight: 600;
        }

        :hover {
          cursor: pointer;
          p {
            color: ${({ theme }) => theme.background.primary};
          }
          background-color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }

  :hover {
    .description {
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
      border-right: 2px solid ${({ theme }) => theme.colors.primary};
      border-left: 2px solid ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: sticky;
  top: 60px;
  padding: 1.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.background.quinary};
  z-index: 1000;
  background-color: ${({ theme }) => theme.background.primary};
  .header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: ${({ theme }) => theme.typeScale.header1};
    color: ${({ theme }) => theme.text.primary};
    font-weight: 600;
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  p {
    width: 60%;
    color: ${({ theme }) => theme.text.secondary};
  }
`;

const DropdownChoice = styled.div`
  margin-top: 1rem;
  width: 60%;

  background: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.secondary};
  border-radius: 0.5rem;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  .outer {
    padding: 1rem 1.25rem;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;
