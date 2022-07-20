import styled from 'styled-components';

type LoadingProps = {
  collection: string | string[];
  tokenId: string | string[];
};

export default function LoadingBar({ collection, tokenId }: LoadingProps) {
  return (
    <Container>
      <p>
        Loading {collection} with tokenId {tokenId}
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

  p {
    color: ${({ theme }) => theme.text.primary};
    font-size: ${({ theme }) => theme.typeScale.header4};
    padding-bottom: 0.25rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
