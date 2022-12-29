import React, { useState } from 'react';
import Loader from '../../components/loader';
import { AnalyticsEvents } from '../../constants/analytics-events';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import { logFirebaseEvent } from '../../utils/firebase';

interface ClaimFormProps {
  event_id: number;
  account_id?: string | null;
  claimString?: string;
  isPrivate?: boolean;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ event_id, claimString, account_id, isPrivate }) => {
  const { modal, accountId } = useWalletSelector();
  const [nearId, setNearId] = useState<string>(account_id || '');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const claimLink = `/api/checkin?eventid='${event_id}'&nearid='${nearId}'&qr='${claimString}'`;

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setIsAuthError(false);
    setIsSuccess(false);
    setIsError(false);
    setNearId(value);
  };

  const handleAuth = async () => {
    modal.show();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (!claimString) {
      setIsLoading(false);
      return;
    }
    if (isPrivate && !accountId) {
      setIsLoading(false);
      setIsAuthError(true);
      return;
    }
    try {
      const response = await fetch(claimLink);
      const result = await response.json();
      if (result.index > -1) {
        setIsSuccess(true);
        logFirebaseEvent(AnalyticsEvents.CLAIM_REWARD_SUCCESS, {});
      } else {
        logFirebaseEvent(AnalyticsEvents.CLAIM_REWARD_FAILED, {});
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  return (
    <Loader is_load={isLoading}>
      <>
        <div className="text-left">
          <h2 className="font-drukMedium uppercase text-black text-xl mb-2">Claim Reward</h2>
          <p className="text-[#3D3D3D]">Provide an Near ID to get reward</p>
          {/* <p className="text-black">{claimString}</p> */}
        </div>
        {isSuccess && (
          <p className="text-center font-drukMedium uppercase text-black text-xl my-2">Successfuly Claimed!</p>
        )}
        {isError && (
          <>
            <p className="font-drukMedium uppercase text-[#f24242] text-xl my-2 text-center">Error!</p>
            <p className="font-inter uppercase text-[#f24242] text-[14px] text-center">ID is invalid</p>
          </>
        )}
        {isAuthError && (
          <>
            <p className="font-drukMedium uppercase text-[#f24242] text-xl my-2 text-center">Error!</p>
            <p className="font-inter uppercase text-[#f24242] text-[14px] text-center">
              You&apos;re not authorized! Please{' '}
              <button onClick={handleAuth} className="underline hover:no-underline cursor-pointer">
                sign in
              </button>
            </p>
          </>
        )}
        <div className="mt-2 p-2 rounded-lg">
          <form className="flex flex-row items-center" onSubmit={handleSubmit}>
            <input
              disabled={isPrivate}
              value={nearId}
              onChange={handleInputChange}
              className="px-[10px] py-[5px] mr-2 w-full text-black bg-transparent border border-solid border-gray-300 rounded-full transition ease-in-out focus:border-black focus:outline-none"
              placeholder="Near ID"
              type="text"
            />
            <button
              type="submit"
              className="flex self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Claim
            </button>
          </form>
        </div>
      </>
    </Loader>
  );
};

export default ClaimForm;
