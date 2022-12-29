import Link from 'next/link';
import React from 'react';

const SetupTopic: React.FC = () => {
  return (
    <div>
      <h1 className="font-grotesk text-[25px]">Setting Up</h1>
      <p className="my-[10px]">
        vSelf provides you with the ability to authenticate using a community-curated list of wallets native to the NEAR
        ecosystem. To sign in, we will redirect you to the wallet selector modal where you choose a wallet that you
        trust to manage your account. It’s also possible to sign out once you logged in (do this by pressing the
        sign-out button). In case you don’t have any NEAR-compatible wallet yet you can go through our free onboarding
        process and claim your account.
      </p>

      <p className="my-[10px]">
        Currently, we support four different wallets (which you will be redirected to for sign-in flow)
      </p>

      <p className="my-[10px]">
        1.{' '}
        <Link href="https://wallet.near.org/" className="underline hover:no-underline">
          NearWallet
        </Link>{' '}
        is a legacy solution by a NEAR foundation which is kept until the transition to MyNearWallet is adopted. (most
        existing NEAR users would have at least one account managed there)
      </p>
      <p className="my-[10px]">
        2.{' '}
        <Link href="https://mynearwallet.com/" className="underline hover:no-underline">
          MyNearWallet
        </Link>{' '}
        is a newer and fancier version of NearWallet, i.e. developed by the same team. This is the recommended way as
        it’s well-tested and user-friendly.
      </p>
      <p className="my-[10px]">
        3.{' '}
        <Link href="https://www.ledger.com/" className="underline hover:no-underline">
          Ledger
        </Link>{' '}
        is a well-known battle-tested hardware wallet for more experienced users.
      </p>
      <p className="my-[10px]">
        4. The{' '}
        <Link href="https://senderwallet.io/" className="underline hover:no-underline">
          sender
        </Link>{' '}
        is a new wallet in the NEAR ecosystem implemented as a Chrome browser extension (Metamask-like experience)
      </p>

      <p className="font-interBold my-[10px]">Onboarding</p>

      <p className="my-[10px]">
        Before you register your first account, it’s important to understand some basic concepts. In web2, users got
        used to relying on the combination of login and password to protect their identity. In web3, we use a bit
        different approach, instead as a credential, one uses her “seed phrase”, a mere set of 12 or 24 plain English
        words.
      </p>

      <p className="my-[10px]">
        To get your seed phrase and claim your new NEAR account, you can use vSelf Onboarding page. On that page, you
        can claim a NEAR account of your choice (if it’s not occupied yet), and on success, we display your unique seed
        phrase. Before you close the page, make sure you store your phrase as it cannot be recovered ever (that’s the
        level of security we want, actually).
      </p>

      <p className="mt-[10px]">
        Once you store your seed phrase securely, you can use it to log in to the NEAR wallet application. Our
        recommendation is to use the MyNearWallet web wallet, as it has, in our opinion, so far the easiest user
        experience.
      </p>
    </div>
  );
};

export default SetupTopic;
