import Link from 'next/link';
import React from 'react';

const FaqComponent: React.FC = () => {
  return (
    <div>
      <h1 className="font-grotesk mb-[30px] text-[25px]">FAQ</h1>
      <h2 className="font-interBold mb-[30px] text-[20px] ">
        vSelf is a web3 identity wallet with personal provenance and rewards for data sharing.
      </h2>
      <p className="font-interBold mb-[20px]">Onboarding</p>

      <p className="mb-[20px]">
        At this stage, we’re subsidizing onboarding to the NEAR ecosystem. If you want to create a new NEAR account, go
        to the{' '}
        <Link href="/onboard" className="underline hover:no-underline">
          Onboard page
        </Link>
        , choose a human-readable name like “myname.near” and we’ll help to register a new account.{' '}
      </p>

      <p className="font-interBold mb-[20px]">Authorization / Wallets</p>

      <p className="mb-[20px]">
        vSelf supports authorization through several NEAR wallets. To get more details, take a look{' '}
        <Link href="/faq/setup" className="underline hover:no-underline">
          at our guide
        </Link>
        .{' '}
      </p>

      <p className="font-interBold mb-[20px]">Shareable profiles</p>

      <p className="mb-[20px]">
        To show your contacts a Linktree-like page with your NEAR NFTS, fill in{' '}
        <Link href="/vranda" className="underline hover:no-underline">
          the form
        </Link>{' '}
        and upload pieces of your collection that tell your unique story.{' '}
      </p>

      <p className="font-interBold mb-[20px]">Events</p>

      <p className="mb-[20px]">
        In vSelf platform, we propose{' '}
        <Link href="/add" className="underline hover:no-underline">
          to set up your web3 events
        </Link>{' '}
        - a shareable collection of non-transferable NFTs that you can issue as poaps, kudos, or other rewards to your
        audience. Your community can collect NFTs using our application (if your event is whitelisted) or directly
        through claim links.
      </p>

      <p className="font-interBold mb-[20px]">Mobile App</p>

      <p>
        <Link href="/faq/mobile" className="underline hover:no-underline">
          The app
        </Link>{' '}
        is used for verified partners and helps to gamify online and offline events.
      </p>
    </div>
  );
};

export default FaqComponent;
