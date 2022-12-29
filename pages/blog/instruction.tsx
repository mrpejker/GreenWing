/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Link from 'next/link';
import LinkBlock from '../../components/link-block';

const InstructionPage: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center px-[20px]">
      <div className="w-full h-[300px] bg-[url(/instrcover.png)] bg-no-repeat bg-center bg-cover rounded-[20px] max-w-[1240px] px-[20px] mt-[120px]" />
      <div className="flex flex-col md:flex-row-reverse w-full max-w-[1240px] px-[20px] py-[40px] text-[#3D3D3D] items-start justify-between">
        <NavSideBar />
        <div className="flex flex-col md:basis-2/3">
          <h1 className="font-drukMedium text-[32px] text-black mb-[40px]">vSelf Instructions</h1>
          <div className="flex flex-col" id="new_account">
            <h2 className="font-interBold text-[25px] text-black mb-[20px]">
              1. Create a new NEAR account using “vSelf onboarding”
            </h2>
            <p className=" mb-[20px]">
              vSelf is built on the NEAR protocol and uses its system of authentication. In NEAR, users have
              human-readable names as addresses, similar to handlers on social networks. To know more about the NEAR
              account system, check out the{' '}
              <Link
                href="https://medium.com/nearprotocol/an-introduction-to-near-accounts-f96cb84ef091"
                className="underline hover:no-underline"
              >
                article.
              </Link>{' '}
            </p>
            <p className=" mb-[20px]">
              If you don&apos;t have an account on NEAR or have only an implicit one (e.g.
              98793cd91a3f870fb126f662858[...]), you can easily create it with our onboarding system.{' '}
            </p>

            <p className=" mb-[20px]">Follow the steps:</p>
            <p className=" mb-[20px]">
              1. Go to vSelf{' '}
              <Link href="/onboard" className="underline hover:no-underline">
                Onboard page
              </Link>{' '}
              directly or choose Products/Onboarding to NEAR from our main page.{' '}
            </p>
            <img src="/instr1.png" alt="" className="self-center max-w-[700px] mb-[20px]" />
            <p className=" mb-[20px]">
              2. In the onboarding form, you will see detailed instructions on the account name format. Type in the name
              that you want to create (e.g., <b>bestnearuser.near</b>). Note that any account name should end with .near
              and be between 3 and 64 characters. It can&apos;t contain characters &quot;@&quot; or &quot;.&quot;
            </p>
            <img src="/instr2.png" alt="" className=" self-center max-w-[700px] mb-[20px]" />
            <p className=" mb-[20px]">
              3. Once you&apos;ve chosen the preferred name, press “Claim NEAR account”. If the name is already taken,
              you will see an error message. In this case, return to Step 2 and try a different one.{' '}
            </p>

            <p className=" mb-[20px]">Once your account is created, you get a confirmation message.</p>
            <img src="/instr3.png" alt="" className=" self-center max-w-[700px] mb-[20px]" />
            <p className=" mb-[20px]">
              4. Now comes the most important step: <span className="">save your seed phrase</span>. This phrase is your
              password to the NEAR account. In NEAR, no one is keeping a copy of your seed phrase. If it is lost, you
              won&apos;t be able to recover it. Write it down on paper and store it in a safe place, or choose your own
              way to keep it.{' '}
            </p>
            <img src="/instr4.png" alt="" className=" self-center max-w-[400px] mb-[20px]" />
            <p className=" mb-[20px]">
              Now you&apos;re all set! This pair - NEAR account and seed phrase - will allow you to access your NEAR
              account from any applications and wallets that use it. To sign in to vSelf and use its products, click the
              “Sign In” button and follow the instructions from the next section.{' '}
            </p>
          </div>
          <div className="flex flex-col" id="sign_in">
            <h2 className="font-interBold text-[25px] text-black mb-[20px]">2. Sign in with NEAR</h2>
            <p className=" mb-[20px]">
              vSelf allows authenticating with a community-curated list of wallets native to the NEAR ecosystem. You can
              use the “Sign In” button on the onboarding page or at the upper right corner of any vSelf screen.
            </p>

            <p className=" mb-[20px]">
              1. To sign in, we will redirect you to the wallet selector modal, where you choose a wallet that you trust
              to manage your account (more information on these wallets can be found below in this section). By default,
              it suggests signing in with MyNearWallet.
            </p>
            <img src="/instr5.png" alt="" className=" self-center max-w-[700px] mb-[20px]" />
            <p className=" mb-[20px]">
              Note that it&apos;s also possible to sign out once you have logged in. In case you don&apos;t have a NEAR
              account, follow our free onboarding process from Section 1 and claim your account.
            </p>
            <p className=" mb-[20px]">
              2. In the wallet, choose the “Import Account” option and go to “Passphrase” method of authorization.{' '}
            </p>
            <img src="/instr6.png" alt="" className=" self-center max-w-[700px] mb-[20px]" />
            <p className=" mb-[20px]">
              3. Type your sees phrase consisting of 12 words with spaces between them. You will see your NEAR account
              name.
            </p>
            <p className=" mb-[20px]">4. Press “Next” and “Connect” to return to the vSelf page.</p>
            <img src="/instr7.png" alt="" className=" self-center max-w-[400px] mb-[20px]" />
            <img src="/instr8.png" alt="" className=" self-center max-w-[400px] mb-[20px]" />
            <p className=" mb-[20px]">
              5. Once authorization is successful, you will see your NEAR account name in the upper right corner of the
              vSelf pages.{' '}
            </p>
            <h3 className="text-[20px] font-interBold mb-[20px]">NEAR Wallets</h3>
            <p className=" mb-[20px]">
              Currently, we support four different wallets (which you will be redirected to for sign-in flow)
            </p>
            <p className=" mb-[20px]">
              1.{' '}
              <Link href="https://wallet.near.org/" className="underline hover:no-underline">
                NearWallet
              </Link>{' '}
              is a legacy solution by a NEAR foundation which is kept until the transition to MyNearWallet is adopted.
              (most existing NEAR users would have at least one account managed there)
            </p>
            <p className=" mb-[20px]">
              2.{' '}
              <Link href="https://mynearwallet.com/" className="underline hover:no-underline">
                MyNearWallet
              </Link>{' '}
              is a newer and fancier version of NearWallet, i.e. developed by the same team. This is the recommended way
              as it’s well-tested and user-friendly.
            </p>
            <p className=" mb-[20px]">
              3.{' '}
              <Link href="https://www.ledger.com/" className="underline hover:no-underline">
                Ledger
              </Link>{' '}
              is a well-known battle-tested hardware wallet for more experienced users.
            </p>
            <p className=" mb-[20px]">
              4.{' '}
              <Link href="https://senderwallet.io/" className="underline hover:no-underline">
                The sender
              </Link>{' '}
              is a new wallet in the NEAR ecosystem implemented as a Chrome browser extension (Metamask-like experience)
            </p>
          </div>
          <div className="flex flex-col" id="claim">
            <h2 className="font-interBold text-[25px] text-black mb-[20px]">3. Claim NFT badge</h2>
            <p className=" mb-[20px]">
              To claim the NFT reward, follow the referral link you have been provided. Make sure you have authorisation
              with the NEAR account that you want to claim NFT for. Note that these NFTs are non-transferable and will
              stay with the account.
            </p>
            <p className=" mb-[20px]">
              1. The claim link will take you to the confirmation page. Press “Claim” to proceed.{' '}
            </p>
            <img src="/instr9.png" alt="" className=" self-center max-w-[400px] mb-[20px]" />
            <p className=" mb-[20px]">
              2. If you don’t have access to the address provided, you will get an error message. To sign in with your
              NEAR account, follow the instructions from Section 2.{' '}
            </p>
            <p className=" mb-[20px]">3. If your claim is successful, you get a confirmation message</p>
            <img src="/instr10.png" alt="" className=" self-center max-w-[400px] mb-[20px]" />
            <p className=" mb-[20px]">
              4. To see your reward, you should open the NEAR wallet of your choice (e.g., MyNearWallet) using the same
              NEAR account. Go to the Collectibles section to make sure your NFT successfully landed. Welcome to the
              community!
            </p>
            <img src="instr11.png" alt="" className="self-center max-w-[700px] " />
          </div>
        </div>
      </div>
      <LinkBlock />
    </div>
  );
};

const NavSideBar: React.FC = () => (
  <div className="flex w-full mb-[40px] flex-col md:basis-1/4 p-[40px] bg-[#ecebeb] rounded-[20px] md:sticky top-[100px]">
    <h2 className="font-interBold mb-[40px]">Table of Contents</h2>
    <Link href="#new_account" className="underline hover:no-underline mb-[10px]">
      1. Create a new NEAR account
    </Link>
    <Link href="#sign_in" className="underline hover:no-underline mb-[10px]">
      2. Sign in with NEAR
    </Link>
    <Link href="#claim" className="underline hover:no-underline mb-[10px]">
      3. Claim NFT badge
    </Link>
  </div>
);

export default InstructionPage;
