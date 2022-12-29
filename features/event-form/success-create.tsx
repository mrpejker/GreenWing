import React from 'react';

interface SuccessCreateMessageProps {
  eventId: number | null;
  claimStrings: any;
}

const SuccessCreateMessage: React.FC<SuccessCreateMessageProps> = ({ eventId, claimStrings }) => {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const claimLink = `${origin}/claim/${eventId}?strings=${claimStrings}`;

  const copyToClipBoard = async () => {
    navigator.clipboard.writeText(claimLink);
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-drukMedium text-black mb-2">Your Event Was Created</h2>
      <p className="text-[#3D3D3D] mb-2">
        You can see it&apos;s stats on the{' '}
        <a className="underline" href={`/event/${eventId}`}>
          event&apos;s page
        </a>
      </p>
      <p className="text-[#3D3D3D] mb-2">Your Claim Link for Reward:</p>
      <input type="text" className="w-full mb-4 text-black" value={claimLink} disabled />
      <button
        type="button"
        onClick={copyToClipBoard}
        className="flex self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        Copy
      </button>
    </div>
  );
};

export default SuccessCreateMessage;
