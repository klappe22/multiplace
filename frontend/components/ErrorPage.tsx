import styled from 'styled-components';

type ErrorProps = {
  collection: string | string[];
  tokenId: string | string[];
};

export default function ErrorPage({ collection, tokenId }: ErrorProps) {
  return (
    <Container>
      <p>Error!</p>
      <p>
        collection {collection} with tokenId {tokenId} does not exist.
      </p>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;

  p {
    color: ${({ theme }) => theme.text.primary};
    font-size: ${({ theme }) => theme.typeScale.header1};
  }
`;
