import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo, useContext } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { FaBars, FaInfoCircle, FaInfo, FaRegHandPaper } from 'react-icons/fa';
import { BsCollection, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { TbArrowBigRight } from 'react-icons/tb';
import { IoMdRefresh } from 'react-icons/io';
import { FiActivity, FiExternalLink } from 'react-icons/fi';
import { BiAlignLeft } from 'react-icons/bi';
import {
  TronWebContext,
  TronWebFallbackContext,
  ChainContext,
} from '../../_app';
import LoadingBar from '../../../components/LoadingBar';
import ErrorPage from '../../../components/ErrorPage';
import {
  collectionNameToAddress,
  assetToPriceFeed,
  collectionNameToNameAndDescription,
} from '../../../utils/misc';
import OrderStatus from '../../../components/OrderStatus';
import { nile, mainnet } from '../../../utils/addresses';
import Exchange from '../../../../contracts/out/Exchange.sol/Exchange.json';
import Rules from '../../../components/Rules';

const ZERO_ADDRESS = '410000000000000000000000000000000000000000';

const OuterContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 480px minmax(480px, 600px);
  gap: 2.5rem;
  @media (max-width: 1200px) {
    grid-template-columns: 350px minmax(350px, 600px);
  }
`;

const knownCollectionsName = ['whalefish', 'wojaksbyprice'];

const nftFetcherClient = async (tronWeb: any, collection: any, id: any) => {
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

  let uri = await contract.tokenURI(id).call();

  const url = `https://multiplace.infura-ipfs.io/ipfs/${uri.slice(7)}`;
  let response = await fetch(url);

  return response.json();
};

const fetchMetadataURIs = async (tronWeb: any, collection: any, id: any) => {
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
  // get all uris for the current contract
  let contract = await tronWeb
    .contract()
    .at(collectionNameToAddress.mainnet[collection.toLowerCase()]);

  let uris = await contract.getTokenURIs(id).call();

  return uris;
};

const priceFetcher = async (tronWeb: any, collection: any, id: any) => {
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
    .at(collectionNameToAddress.mainnet[collection]);

  let priceInformation = await contract.getPriceInfo(id).call();
  let change;
  let color = 'white';
  if (priceInformation[2].lt(1000)) {
    const changeUnprocessed = parseInt(priceInformation[2].sub(1000));
    change = changeUnprocessed / 10;
    color = 'red';
  } else if (priceInformation[2].gt(1000)) {
    const changeUnprocessed = parseInt(priceInformation[2].sub(1000));
    change = changeUnprocessed / 10;
    color = 'green';
  } else {
    change = 0;
  }
  const priceInfo: { [key: string]: string } = {
    yesterday: tronWeb.fromSun(priceInformation[0].toString()),
    today: tronWeb.fromSun(priceInformation[1].toString()),
    change: change.toString() + '%',
    color,
  };

  return priceInfo;
};

const balanceFetcher = async (tronWeb: any, collection: any, id: any) => {
  let contract = await tronWeb
    .contract()
    .at(collectionNameToAddress.mainnet['whalefish']);

  let owner = await contract.ownerOf(id).call();
  const balance = await tronWeb.trx.getBalance(owner);
  return tronWeb.fromSun(balance);
};

const ownerFetcher = async (tronWeb: any, collection: any, id: any) => {
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
    .at(collectionNameToAddress.mainnet[collection]);

  let owner = await contract.ownerOf(id).call();
  return tronWeb.address.fromHex(owner);
};

const listingFetcher = async (tronWeb: any, collection: any, id: any) => {
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

  let contract = await tronWeb.contract(Exchange.abi, mainnet.exchange);

  let makerAsk = await contract
    .getMakerAsk(collectionNameToAddress.mainnet[collection], id)
    .call();

  const listingInfo = {
    listed: makerAsk.collection !== ZERO_ADDRESS,
    price: tronWeb.fromSun(makerAsk.price.toString()),
  };

  return listingInfo;
};

const isApprovedFetcher = async (tronWeb: any, collection: any) => {
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

  const contract = await tronWeb
    .contract()
    .at(collectionNameToAddress.mainnet[collection]);

  const isApproved = await contract
    .isApprovedForAll(tronWeb.defaultAddress.base58, mainnet.exchange)
    .call();

  return isApproved;
};

const NFTPage = () => {
  const [clickedMetadata, setClickedMetadata] = useState(null);
  const tronWeb = useContext(TronWebContext);
  const tronWebFallback = useContext(TronWebFallbackContext);
  const [showProperties, setShowProperties] = useState(true);
  const [showOffers, setShowOffers] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [listingPrice, setListingPrice] = useState('0');
  const [txHash, setTxHash] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [approvalButtonLoading, setApprovalButtonLoading] = useState(false);
  const router = useRouter();
  let { collection, id } = router.query;
  collection = collection as string; // I promise it's a fcking string

  const { data: uris } = useQuery(
    ['metadataURIs', collection, id],
    () => fetchMetadataURIs(tronWebFallback, collection, id),
    {
      enabled: !!id && !!collection && !!tronWebFallback,
      staleTime: Infinity,
    }
  );

  const {
    isLoading,
    isError,
    data: currentURI,
  } = useQuery(
    ['currentURI', collection, id],
    () => nftFetcherClient(tronWebFallback, collection, id),
    {
      enabled: !!collection && !!id && !!tronWebFallback,
      staleTime: Infinity,
    }
  );

  const { data: owner } = useQuery(
    ['owner', collection, id],
    () => ownerFetcher(tronWebFallback, collection, id),
    {
      enabled: !!collection && !!id && !!tronWebFallback,
    }
  );

  const { data: priceInfo } = useQuery(
    ['prices', collection, id],
    () => priceFetcher(tronWebFallback, collection, id),
    {
      enabled:
        !!collection &&
        !!id &&
        !!tronWebFallback &&
        collection === 'wojaksbyprice',
    }
  );

  const { data: balance } = useQuery(
    ['balance', collection, id],
    () => balanceFetcher(tronWebFallback, collection, id),
    {
      enabled:
        !!collection && !!id && !!tronWebFallback && collection === 'whalefish',
    }
  );

  const { data: listingInfo } = useQuery(
    ['listing', collection, id],
    () => listingFetcher(tronWebFallback, collection, id),
    {
      enabled: !!collection && !!id && !!tronWebFallback,
    }
  );

  const { data: isApproved } = useQuery(
    ['isApproved', collection],
    () => isApprovedFetcher(tronWeb, collection),
    {
      enabled: !!collection && !!tronWeb,
    }
  );

  const handleImageClick = async (imageURI: string, i: number) => {
    let uri = uris[i];
    const url = `https://multiplace.infura-ipfs.io/ipfs/${uri.slice(7)}`;
    let metadata = await (await fetch(url)).json();
    setClickedMetadata(metadata);
  };

  const handleBuyNow = async () => {
    if (!tronWeb || !id || !collection || !listingInfo || !listingInfo.price) {
      return;
    }

    let contract = await tronWeb.contract(Exchange.abi, mainnet.exchange);
    collection = collection as string; // I promise bro

    const takerBid = {
      taker: tronWeb.defaultAddress.base58,
      price: tronWeb.toSun(listingInfo.price),
      collection: collectionNameToAddress.mainnet[collection],
      tokenId: id,
    };

    setLoadingButton(true);
    let result;
    try {
      result = await contract
        .matchAskWithTakerBid(Object.values(takerBid))
        .send({
          feeLimit: 200_000_000,
          callValue: takerBid.price,
          shouldPollResponse: false,
        });
    } catch (e) {
      console.log(e);
      setLoadingButton(false);
      return;
    }
    setLoadingButton(false);

    setTxHash(result);

    setTimeout(() => {
      setTxHash('');
    }, 20000);
  };

  const handleApprove = async () => {
    if (!tronWeb || !collection) {
      return;
    }

    collection = collection as string;

    const contract = await tronWeb
      .contract()
      .at(collectionNameToAddress.mainnet[collection]);

    setApprovalButtonLoading(true);
    let result = await contract.setApprovalForAll(mainnet.exchange, true).send({
      callValue: 0,
      shouldPollResponse: false,
    });
    setApprovalButtonLoading(false);

    console.log(result);
    setTxHash(result);

    setTimeout(() => {
      setTxHash('');
    }, 7500);
  };

  const handleListing = async () => {
    if (!tronWeb || !id || !collection) {
      return;
    }

    let contract = await tronWeb.contract(Exchange.abi, mainnet.exchange);
    collection = collection as string; // I promise bro

    const makerAsk = {
      signer: tronWeb.defaultAddress.base58,
      collection: collectionNameToAddress.mainnet[collection],
      price: tronWeb.toSun(listingPrice),
      tokenId: id,
      startTime: Math.floor(new Date().getTime() / 1000),
      endTime: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 * 7,
    };

    setLoadingButton(true);
    let result = await contract.createMakerAsk(Object.values(makerAsk)).send({
      feeLimit: 200_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
    setLoadingButton(false);

    setTxHash(result);

    setTimeout(() => {
      setTxHash('');
    }, 20000);
  };

  const handleCancelListing = async () => {
    console.log('hey');
  };

  const currentMetadata = !clickedMetadata ? currentURI : clickedMetadata;

  const isOwner = tronWeb && owner === tronWeb.defaultAddress.base58;

  // determine if user has approved collection

  if (isError) {
    return (
      <ErrorPage
        collection={collection ? collection : ''}
        tokenId={id ? id : ''}
      ></ErrorPage>
    );
  }

  return (
    <>
      {isLoading && (
        <LoadingBar
          collection={collection ? collection : ''}
          tokenId={id ? id : ''}
        ></LoadingBar>
      )}
      {txHash !== '' && (
        <NewTx>
          <a
            href={`https://tronscan.org/#/transaction/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            Tx Hash: {txHash} <FiExternalLink />
          </a>
        </NewTx>
      )}
      <OuterContainer>
        <Container>
          <Left>
            <ImgContainer>
              {currentMetadata && currentMetadata.image && (
                <img
                  src={`https://multiplace.infura-ipfs.io/ipfs/${currentMetadata.image.slice(
                    7
                  )}`}
                  alt="logo"
                />
              )}
            </ImgContainer>
            <DropdownChoice>
              <div
                className="outer"
                onClick={() => setShowProperties(!showProperties)}
              >
                <div>
                  <FaBars />
                  <p>Properties</p>
                </div>
                <div>
                  {showProperties ? <BsChevronUp /> : <BsChevronDown />}
                </div>
              </div>
              {showProperties &&
                currentURI &&
                currentMetadata &&
                currentMetadata.attributes && (
                  <div className="properties">
                    {currentMetadata.attributes.map((attribute: any) => {
                      return (
                        <Property key={Math.random()}>
                          <p className="attribute">{attribute['trait_type']}</p>
                          <p className="value">{attribute['value']}</p>
                          <p className="rarity">10 (1.51%)</p>
                        </Property>
                      );
                    })}
                  </div>
                )}
            </DropdownChoice>
          </Left>
          <Right>
            <SmallHeader>
              <p>
                {collection &&
                  collectionNameToNameAndDescription[collection].name}
              </p>
              <div>
                <StyledIoMdRefresh />
              </div>
            </SmallHeader>
            <MultiDiv>
              {currentMetadata &&
                currentMetadata.images &&
                currentMetadata.images.map((uri: string, i: number) => (
                  <MultiImg
                    src={`https://multiplace.infura-ipfs.io/ipfs/${uri.slice(
                      7
                    )}`}
                    key={i}
                    alt={i.toString()}
                    onClick={() => handleImageClick(uri, i)}
                    active={currentMetadata.image === uri}
                  />
                ))}
            </MultiDiv>
            <Header>
              <p>
                {collection &&
                  collectionNameToNameAndDescription[collection].name}{' '}
                #{id && id}
              </p>
            </Header>
            <Description>
              <p>
                {collection &&
                  collectionNameToNameAndDescription[collection].description}
              </p>
            </Description>

            <DropdownChoice>
              <div className="outer" onClick={() => setShowRules(!showRules)}>
                <div>
                  <BiAlignLeft />
                  <p>Rules</p>
                </div>
                <div>{showRules ? <BsChevronUp /> : <BsChevronDown />}</div>
              </div>
              {showRules &&
                currentMetadata &&
                currentMetadata.attributes &&
                collection && (
                  <Rules
                    asset={currentMetadata.attributes[1].value}
                    collection={collection}
                  />
                )}
            </DropdownChoice>

            {collection === 'wojaksbyprice' &&
              priceInfo &&
              currentURI &&
              currentURI.attributes && (
                <PriceDiv color={priceInfo.color}>
                  <div className="box">
                    <p>TRX 24H AGO:</p>
                    <p>${priceInfo.yesterday}</p>
                  </div>
                  <div className="box">
                    <p>TRX NOW:</p>
                    <p>${priceInfo.today}</p>
                  </div>
                  <div className="box change">
                    <p>CHANGE:</p>
                    <p className="actual-change">{priceInfo.change}</p>
                  </div>
                  <div className="arrow">
                    <TbArrowBigRight />
                  </div>
                  <div className="result">
                    <p>{`${currentURI.attributes[3].value} ${currentURI.attributes[0].value}`}</p>
                  </div>
                </PriceDiv>
              )}
            {currentMetadata &&
              currentMetadata.attributes &&
              collection === 'whalefish' && (
                <PriceDiv>
                  <div className="box">
                    <p>OWNER BALANCE:</p>
                    <p>{balance} TRX</p>
                  </div>
                  <div className="arrow">
                    <TbArrowBigRight />
                  </div>
                  <div className="result">
                    <p>{`${currentMetadata.attributes[1].value} ${currentMetadata.attributes[0].value}`}</p>
                  </div>
                </PriceDiv>
              )}

            <OwnerDiv>
              <p>Owner</p>
              <p className="address">{owner}</p>
            </OwnerDiv>
            <OrderStatus
              isApproved={isApproved ? isApproved : false}
              isOwner={isOwner}
              listed={listingInfo ? listingInfo.listed : false}
              price={listingInfo ? listingInfo.price : '0'}
              listingPrice={listingPrice}
              setListingPrice={setListingPrice}
              handleBuyNow={handleBuyNow}
              handleCancelListing={handleCancelListing}
              handleListing={handleListing}
              handleApprove={handleApprove}
              loadingButton={loadingButton}
              approvalButtonLoading={approvalButtonLoading}
            />
            <DropdownChoice>
              <div className="outer" onClick={() => setShowOffers(!showOffers)}>
                <div>
                  <FaRegHandPaper />
                  <p>Offers</p>
                </div>
                <div>{showOffers ? <BsChevronUp /> : <BsChevronDown />}</div>
              </div>
              {showOffers && (
                <div className="offers">
                  <p>Offer functionality coming soon!</p>
                </div>
              )}
            </DropdownChoice>
            <InfoDiv>
              <p className="header">Learn more about mNFTs</p>
              <p>
                Multiplace is a platform for multi NFTs. Click to learn more.
              </p>
            </InfoDiv>
          </Right>
        </Container>
      </OuterContainer>
    </>
  );
};

const NewTx = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  width: 100vw;
  padding-top: 0.6rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    font-weight: 500;
    padding-bottom: 0.1rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  svg {
    width: 22px;
  }
`;

const PriceDiv = styled.div<{ color?: string }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;

  .box {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.25rem;
  }

  .change {
    .actual-change {
      color: ${({ color }) => (color ? color : '')};
    }
  }

  .arrow {
    padding: 1rem;
    display: flex;
    align-items: center;
    svg {
      height: 30px;
      width: 30px;
    }
  }

  .result {
    font-weight: 500;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    p {
      font-size: ${({ theme }) => theme.typeScale.header4};
      padding-bottom: 0.2rem;
    }
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const ImgContainer = styled.div`
  border-radius: 10px;
  width: 480px;
  height: 480px;
  img {
    width: 480px;
    height: 480px;
    border-radius: 10px;
    @media (max-width: 1200px) {
      width: 350px;
      height: 350px;
    }
  }
  @media (max-width: 1200px) {
    width: 350px;
    height: 350px;
  }
`;

const Property = styled.div`
  height: 5rem;
  background: ${({ theme }) => theme.background.secondary};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: ${({ theme }) => theme.typeScale.helperText};
  font-weight: 700;

  padding: 0.5rem;

  border-radius: 0.35rem;

  .attribute {
    color: ${({ theme }) => theme.colors.primary};
  }

  .rarity {
    font-size: ${({ theme }) => theme.typeScale.copyrightText};
    padding-top: 0.75rem;
    font-weight: 400;
    color: ${({ theme }) => theme.text.tertiary};
  }
`;

const DropdownChoice = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.secondary};
  border-radius: 0.5rem;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  .offers {
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.background.primary};
    border: 1px solid ${({ theme }) => theme.background.secondary};
  }
  .properties {
    padding: 0.75rem;
    background-color: ${({ theme }) => theme.background.primary};
    border: 1px solid ${({ theme }) => theme.background.secondary};
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

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

const SmallHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.border.primary};
    padding: 0.2rem;
  }
`;

const StyledIoMdRefresh = styled(IoMdRefresh)`
  height: 27px;
  width: 27px;
`;

const Header = styled.div`
  p {
    font-size: 2.75rem;
  }
`;

const Description = styled.div`
  p {
    color: ${({ theme }) => theme.text.tertiary};
    font-size: ${({ theme }) => theme.typeScale.smallParagraph};
  }
`;

const OwnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  p {
    color: ${({ theme }) => theme.text.tertiary};
  }

  .address {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const OfferDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background.secondary};
  padding: 1rem;
  border-radius: 0.5rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
`;

const OfferButton = styled.div`
  cursor: pointer;
  padding: 1rem 6rem;
  border: 1px solid green;
  border-radius: 0.5rem;

  :hover {
    background-color: ${({ theme }) => theme.hover.secondary};
    color: black;
  }

  font-weight: 600;
`;

const InfoDiv = styled.div`
  color: ${({ theme }) => theme.text.secondary};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border.primary};
  font-size: ${({ theme }) => theme.typeScale.smallParagraph};

  padding: 1rem;
  border-radius: 0.5rem;

  .header {
    font-weight: 700;
  }

  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.hover.primary};
  }
`;

const MultiDiv = styled.div`
  display: flex;
  gap: 0.15rem;
`;

const MultiImg = styled.img<{ active: boolean }>`
  cursor: pointer;
  border-radius: 0.25rem;
  height: 45px;
  width: 45px;
  border: 2px solid
    ${({ theme, active }) =>
      active ? theme.colors.primary : theme.background.primary};

  :hover {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export default NFTPage;
