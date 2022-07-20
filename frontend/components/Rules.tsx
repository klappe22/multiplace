import styled from 'styled-components';
import { TbArrowBigRight } from 'react-icons/tb';

type RulesProps = {
  asset: string;
  collection: string;
};

export default function Rules({ asset, collection }: RulesProps) {
  return (
    <>
      {collection === 'wojaksbyprice' ? (
        <Container>
          <div>
            {asset} change is +2.5% or more <TbArrowBigRight />
            <Mood color={'green'}>Enthusiastic</Mood>
          </div>
          <div>
            {asset} change is between 1% and 2.5% <TbArrowBigRight />{' '}
            <Mood color={'primary'}>Happy</Mood>
          </div>
          <div>
            {asset} change is between -1% and 1% <TbArrowBigRight /> Neutral
          </div>
          <div>
            {asset} change is between -1% and -2.5% <TbArrowBigRight />{' '}
            <Mood color={'yellow'}>Unhappy</Mood>
          </div>
          <div>
            {asset} change is -2.5% or more <TbArrowBigRight />{' '}
            <Mood color={'pink'}>Mad</Mood>
          </div>
        </Container>
      ) : collection === 'whalefish' ? (
        <Container>
          <div>
            TRX balance is above 1000TRX <TbArrowBigRight /> Whale
          </div>
          <div>
            TRX balance is below 1000TRX <TbArrowBigRight /> Fish
          </div>
        </Container>
      ) : null}
    </>
  );
}

const Mood = styled.span<{ color: string }>`
  color: ${({ theme, color }) => theme.colors[color]};
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.background.secondary};
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
