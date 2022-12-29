/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';

const carouselData = [
  {
    title: 'Talent Hubs',
    bullets: [
      {
        title: 'Title',
        description: 'Venture studios, accelerators, grant holders, talent marketplaces',
        img: '/guides1.png',
        color: '#3AC471',
      },
      {
        title: 'Title',
        description: 'Certificates for achievements, qualifications, and projects completion',
        img: '/webinars.png',
        color: '#157FDF',
      },
      {
        title: 'Title',
        description: 'Web3 CV to collect all achievements in one place',
        img: '/account.png',
        color: '#3D50F9',
      },
      {
        title: 'Title',
        description: 'Easy KYC, quality verification, project-based assessment',
        img: '/billing.png',
        color: '#FB40FF',
      },
    ],
  },
  {
    // title: 'DAOs and Guilds',
    title: 'Solutions',
    bullets: [
      {
        title: 'Title',
        description: 'Community and membership governance',
        img: '/guides1.png',
        color: '#3AC471',
      },
      {
        title: 'Title',
        description: 'Membership badges, reputational tiers, activity rewards',
        img: '/webinars.png',
        color: '#157FDF',
      },
      {
        title: 'Title',
        description: 'Multidimensional portable profile for many DAOs',
        img: '/account.png',
        color: '#3D50F9',
      },
      {
        title: 'Title',
        description: 'Governance rating, access management, gating',
        img: '/billing.png',
        color: '#FB40FF',
      },
    ],
  },
  {
    title: 'Novelties',
    // title: 'Loyalty Programs',
    bullets: [
      {
        title: 'Title',
        description: 'Gamification of interaction with customers',
        img: '/guides1.png',
        color: '#3AC471',
      },
      {
        title: 'Title',
        description: 'New generation of promo codes',
        img: '/webinars.png',
        color: '#157FDF',
      },
      {
        title: 'Title',
        description: 'One point of entry for all SMM channels',
        img: '/account.png',
        color: '#3D50F9',
      },
      {
        title: 'Title',
        description: 'Access to perks and limited content',
        img: '/billing.png',
        color: '#FB40FF',
      },
    ],
  },
];

const CarouselComponent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        setActiveIndex(0);
        return;
      }
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
    }, 6000);
    return () => {
      clearInterval(carouselInterval);
    };
  }, [activeIndex]);
  return (
    <div className="carousel slide carousel-fade relative max-w-[1240px] my-[40px] py-[40px]">
      <div className="flex justify-center mb-[40px]">
        {carouselData.map(({ title }, index) => (
          <button
            key={index}
            type="button"
            className={
              (activeIndex === index ? 'bg-[#41F092] text-[#343434] ' : ' bg-[#232323] text-[#B1B1B1] ') +
              'rounded-[20px]  p-[10px] mx-[10px] w-[167px]'
            }
          >
            {title}
          </button>
        ))}
      </div>
      <div className="carousel-inner relative w-full overflow-hidden">
        {carouselData.map(({ bullets }, index) => (
          <div key={index} className={(activeIndex === index ? 'active' : ' ') + 'carousel-item float-left w-full'}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-[20px]">
              {bullets.map(({ color, description, title }, i) => (
                <div
                  key={i}
                  className="flex flex-col px-[20px] pt-[20px] pb-[90px] rounded-[20px]"
                  style={{ backgroundColor: color }}
                >
                  <h2 className="font-interBold mb-[20px]">{title}</h2>
                  <p className="text-white">{description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
