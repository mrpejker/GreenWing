import React from 'react';

const FaqSidebar: React.FC = () => {
  return (
    <div className="flex w-full mb-[40px] flex-col md:basis-1/4 p-[40px] bg-[#ecebeb] rounded-[20px] md:sticky top-[100px]">
      <h2 className="font-interBold mb-[10px]">
        <b>Find us here:</b>
      </h2>

      <p>
        -{' '}
        <a className="underline hover:no-underline" href="https://twitter.com/vself_meta">
          Twitter
        </a>
      </p>
      <p>
        -{' '}
        <a className="underline hover:no-underline" href="https://t.me/vselfbeta">
          TG channel
        </a>
      </p>

      <p className="my-[10px]">
        For NEARCON, we prepare a beta release and invite partners and community members to try it. This version of the
        vSelf platform helps users to join the NEAR ecosystem and start growing their web3 CVs. Below, you will find a
        quick guide on vSelf functionality and onboarding education materials that will help you to receive your first
        rewards.
      </p>
    </div>
  );
};

export default FaqSidebar;
