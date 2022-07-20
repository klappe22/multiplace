import { useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Spinner } from './Spinner';

type OrderStatusProps = {
  isApproved: boolean;
  isOwner: boolean;
  listed: boolean;
  price?: string;
  listingPrice: string;
  loadingButton: boolean;
  approvalButtonLoading: boolean;
  handleBuyNow: () => {};
  handleListing: () => {};
  handleApprove: () => {};
  handleCancelListing: () => {};
  setListingPrice: Dispatch<SetStateAction<string>>;
};

export default function OrderStatus({
  isApproved,
  isOwner,
  listed,
  loadingButton,
  approvalButtonLoading,
  listingPrice,
  setListingPrice,
  handleBuyNow,
  handleListing,
  handleApprove,
  handleCancelListing,
  price,
}: OrderStatusProps) {
  return (
    <>
      {isOwner && listed && (
        <OfferDiv approved={isApproved}>
          <div>
            <p>Listed</p>
            <p>Price: {price} TRX</p>
          </div>
          {loadingButton ? (
            <OfferButton approved={isApproved}>
              <Spinner />
            </OfferButton>
          ) : (
            <OfferButton onClick={handleCancelListing} approved={isApproved}>
              Cancel Listing
            </OfferButton>
          )}
        </OfferDiv>
      )}
      {isOwner && !listed && (
        <>
          {!isApproved && (
            <>
              {approvalButtonLoading ? (
                <ApproveButton>
                  <Spinner />
                </ApproveButton>
              ) : (
                <ApproveButton onClick={handleApprove}>
                  Approve Collection
                </ApproveButton>
              )}
            </>
          )}
          <OfferDiv approved={isApproved}>
            <div>
              <p>Unlisted</p>
              <div className="input-div">
                <label>Price (TRX):</label>
                <input
                  type="number"
                  value={listingPrice}
                  onChange={(e) => setListingPrice(e.target.value)}
                />
              </div>
            </div>
            <Buttons>
              {loadingButton ? (
                <OfferButton approved={isApproved}>
                  <Spinner />
                </OfferButton>
              ) : (
                <OfferButton onClick={handleListing} approved={isApproved}>
                  List
                </OfferButton>
              )}
            </Buttons>
          </OfferDiv>
        </>
      )}
      {!isOwner && listed && (
        <OfferDiv approved={!isApproved}>
          <div>
            <p>Listed</p>
            <p>Price: {price} TRX</p>
          </div>

          {loadingButton ? (
            <OfferButton approved={!isApproved}>
              <Spinner />
            </OfferButton>
          ) : (
            <OfferButton onClick={handleBuyNow} approved={!isApproved}>
              Buy now
            </OfferButton>
          )}
        </OfferDiv>
      )}
      {!isOwner && !listed && (
        <OfferDiv approved={isApproved}>
          <div>
            <p>Unlisted</p>
            <p>Price: N/A</p>
          </div>
          <OfferButton onClick={handleBuyNow} disabled={true}>
            Buy now
          </OfferButton>
        </OfferDiv>
      )}
    </>
  );
}

const OfferDiv = styled.div<{ approved?: boolean }>`
  opacity: ${({ approved }) => (!approved ? '0.25' : '1')};
  cursor: ${({ approved }) => (!approved ? 'not-allowed' : '')};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.background.secondary};
  padding: 1rem;
  border-radius: 0.5rem;

  div {
    display: flex;
    flex-direction: column; //
    gap: 0.6rem;
  }

  .input-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    input {
      margin-top: 0.1rem;
      outline: none;
      border: none;
      padding: 0.35rem 0.5rem;
      background-color: ${({ theme }) => theme.background.primary};
      border-radius: 0.25rem;
      color: ${({ theme }) => theme.text.primary};
      cursor: ${({ approved }) => (!approved ? 'not-allowed' : '')};
    }
  }
`;

const OfferButton = styled.button<{ approved?: boolean }>`
  padding: 1rem 6rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 0.5rem;
  font-size: ${({ theme }) => theme.typeScale.paragraph};
  background-color: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.primary};
  outline: none;

  :hover {
    cursor: ${({ disabled, approved }) =>
      disabled || !approved ? 'not-allowed' : 'pointer'};
    background-color: ${({ theme, disabled, approved }) =>
      disabled || !approved ? '' : theme.colors.primary};
    color: ${({ theme, disabled, approved }) =>
      disabled || !approved ? '' : theme.background.primary};
  }

  font-weight: 600;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;

const ApproveButton = styled.button`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 0.5rem;
  font-size: ${({ theme }) => theme.typeScale.paragraph};
  background-color: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.primary};
  outline: none;

  :hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    background-color: ${({ theme, disabled }) =>
      disabled ? '' : theme.colors.primary};
    color: ${({ theme, disabled }) =>
      disabled ? '' : theme.background.primary};
  }

  font-weight: 600;
`;
