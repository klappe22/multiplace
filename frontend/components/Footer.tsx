import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <p>NFT Marketplace created for the TRON Season 2 Hackathon 2022</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.background.secondary};
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  padding: 1rem;
`;

const Title = styled.div`
  padding: 0.9rem 1.3rem;

  a {
    color: white;
    font-weight: 800;
    font-size: ${({ theme }) => theme.typeScale.header2};
    span {
      color: ${({ theme }) => theme.colors.secondary};
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

export default Footer;
