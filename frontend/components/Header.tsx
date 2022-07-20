import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from './Buttons';
import { ConnectedContext } from '../pages/_app';

interface ActorProps {
  isActive: boolean;
}

const Header = () => {
  const { connected, setConnected } = useContext(ConnectedContext);
  const handleConnect = async () => {
    try {
      let response = await window.tronLink.request({
        method: 'tron_requestAccounts',
      });
      console.log(response);
      if (response.code === 200) {
        setConnected(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeaderContainer>
      <Title>
        <Link href="/">
          <a>multiplace</a>
        </Link>
      </Title>
      <ButtonContainer>
        <Link href="/">
          <a className="signUp">collections</a>
        </Link>
        <PrimaryButton
          onClick={
            connected ? () => console.log('already connected') : handleConnect
          }
        >
          <p className="logIn">{connected ? 'connected' : 'connect'}</p>
        </PrimaryButton>
      </ButtonContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const Title = styled.div`
  padding: 0.9rem 1.3rem;

  a {
    color: white;
    font-weight: 800;
    font-size: ${({ theme }) => theme.typeScale.header2};
    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ButtonContainer = styled.div`
  padding: 0.9rem 1.3rem;

  display: flex;
  gap: 0.9rem;
  justify-content: space-between;
  align-items: center;

  .signUp {
    font-weight: 700;
    font-size: ${({ theme }) => theme.typeScale.smallParagraph};
    color: white;
    :hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.tertiary};
    }
  }

  .logIn {
    font-weight: 700;
    font-size: ${({ theme }) => theme.typeScale.smallParagraph};
    color: black;
  }
`;

export default Header;
