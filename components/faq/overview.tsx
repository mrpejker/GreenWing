/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Accordion from '../accordion';

const HowItWorks: React.FC = () => (
  <div>
    <p>To set up a custom collection of NFT rewards in the vSelf web application:</p>

    <p className="my-[10px]">
      1. Sign in to the NEAR wallet using your NEAR account. If you don’t have one, we have an automated{' '}
      <Link href="/onboard" className="underline hover:no-underline">
        onboarding process
      </Link>{' '}
      on our website.
    </p>
    <p className="my-[10px]">2. Open “Add event page” and provide the following information:</p>
    <ul className="my-[10px] pl-[40px] list-disc">
      <li>Name and description of the collection</li>
      <li>Start and end date of the reward campaign</li>
    </ul>

    <p className="my-[10px]">Also, for each NFT reward in your collection:</p>
    <ul className="my-[10px] pl-[40px] list-disc">
      <li>Choose the name and description of the reward</li>
      <li>Upload source image in jpg or png format</li>
      <li>Set up any special string code to use for the QR scanner</li>
    </ul>

    <p className="my-[10px]">
      After you provide all the information, you can submit your campaign and save QR codes and links to share the
      rewards in your collection.
    </p>

    <p className="my-[10px]">
      In vSelf web application, you can track your client’s activity in these reward campaign:
    </p>
    <ul className="my-[10px] pl-[40px] list-disc">
      <li>Total number of participants and their names</li>
      <li>Date, time and reward type for each claim action</li>
    </ul>
    <img src="/sch.png" alt="" />
  </div>
);

const HowItForAudience: React.FC = () => (
  <div>
    <p className="my-[10px]">
      {' '}
      <b>Mobile app.</b> If your user a verified partnership mode, your audience can receive NFT rewards from your
      collection through vSelf mobile application by scanning a QR code.
    </p>

    <p className="my-[10px]">vSelf mobile application is available in App Store and Google Play.</p>

    <p className="my-[10px]">In our application, you users can:</p>
    <ul className="my-[10px] pl-[40px] list-disc">
      <li>Claim NFT rewards for their NEAR wallet by scanning QR codes</li>
      <li>Track their progress in your challenge campaign</li>
      <li>View their participation history</li>
      <li>Receive achievements for activities</li>
    </ul>

    <p className="my-[10px]">
      <b>Web app.</b> If you chose a verified or free-to-join mode, your audience can use vSelf web services. User can
      claim NFTs through shareble claim link. In this case, a reward gets directly to the NEAR wallet.
    </p>
  </div>
);

const WhatElse: React.FC = () => (
  <div>
    <p className="my-[10px]">
      You or your audience can also use vSelf NFT wallet to create a unique public profile and share it with their
      contacts.
    </p>

    <p className="my-[10px]">In VSELF web application profile page, you can add the following information:</p>

    <ul className="my-[10px] pl-[40px] list-disc">
      <li>Your name and biography</li>
      <li>Any external links associated with you</li>
      <li>Your NFT collection</li>
    </ul>

    <p className="my-[10px]">
      After you provide all information you want, just copy the link to your public page and share it with other people.
    </p>
  </div>
);

const faqs = [
  {
    title: 'What is vSelf?',
    description: 'Easy and user-friendly identity wallet and NFT-reward system. Visit vself.app to know more. ',
  },
  {
    title: 'How much does this service cost?',
    description:
      'As an early adopter, you can use our service for free. This means that vSelf takes care of all onboarding and minting expenses until the end of October 22. After that, we will introduce the freemium subscription method. Only one operation will charge you a tiny sum (0.00075 NEAR, which is less than 0.003USD) is creating a new event.',
  },
  {
    title: 'What are the benefits of vSelf whitelist for partners?',
    description:
      'We provide mobile app functionality only to verified partners. In this case, the partners’ audience can use a mobile wallet to collect and store NFT rewards. All other partners are invited to use web version of the application.',
  },
  {
    title: 'How does it work for you?',
    description: <HowItWorks />,
  },
  {
    title: 'How does it work for your audience?',
    description: <HowItForAudience />,
  },
  {
    title: 'What else we can do?',
    description: <WhatElse />,
  },
];

const OverviewTopic: React.FC = () => {
  return (
    <div className="w-full accordion">
      <h1 className="font-grotesk text-[25px]">Overview</h1>
      {faqs.map(({ title, description }, index) => (
        <Accordion key={index} accordionTitle={title} currentIndex={index}>
          {description}
        </Accordion>
      ))}
    </div>
  );
};

export default OverviewTopic;
