import { useQuery } from 'react-query';

const knownCollections = ['TNzDXCg9CWQnPuD9tJ9W7oGHw31afR3FEp'];

const nftFetcherClient = async (tronWeb: any, collection: any, id: any) => {
  let knownCollection = false;
  for (const cl of knownCollections) {
    if (cl.toLowerCase() === collection.toLowerCase()) {
      knownCollection = true;
      break;
    }
  }
  if (!knownCollection) {
    console.log('yo');

    throw new Error('unknown collection!');
  }

  // let contract = await tronWeb.contract().at(collection);

  // let uri = await contract.tokenURI(id).call();

  // const url = `https://multiplace.infura-ipfs.io/ipfs/${uri.slice(7)}`;
  // let response = await fetch(url);

  // return response.json();
};

export default function Test() {
  const { isLoading, isError, error, data } = useQuery(
    'whatever',
    () => nftFetcherClient('', '', ''),
    { staleTime: Infinity }
  );

  if (isError) {
    return 'error!';
  }

  if (isLoading) {
    return 'loading!';
  }

  return (
    <div>
      <p>whats up?</p>
    </div>
  );
}
