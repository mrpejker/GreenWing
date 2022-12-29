/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

const LinkBlock: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[80px] border-b-[1px] border-[#D9D9D9] pb-[40px]">
      <div className="flex flex-col sm:max-w-[300px] border-[#D9D9D9] border-[1px] rounded-lg p-[20px]">
        <img src="/guides1.png" alt="" className="sm:max-w-[300px] rounded-lg mb-[4px]" />

        <a href="#" className="text-[#FB40FF] hover:underline font-inter">
          Setting Up
        </a>
        <p className="text-[#343434] mb-[26px]">Browse our in-depth guides to help you get started</p>
        <Link
          href="/faq/setup"
          className="bg-[#41F092] text-[#3D3D3D] py-[8px] text-[16px] rounded-[20px] font-inter border-[1px] hover:border-[#41F092] hover:bg-transparent transition-colors ease-in-out text-center"
        >
          More
        </Link>
      </div>
      <div className="flex flex-col sm:max-w-[300px] border-[#D9D9D9] border-[1px] rounded-lg p-[20px]">
        <img src="/webinars.png" alt="" className="sm:max-w-[300px] rounded-lg mb-[4px]" />

        <a href="#" className="text-[#FB40FF] hover:underline font-inter">
          FAQ & Platform Overview
        </a>
        <p className="text-[#343434] mb-[26px]">
          Common questions and
          <br /> solutions
        </p>
        <Link
          href="/faq/overview"
          className="bg-[#41F092] text-[#3D3D3D] py-[8px] text-[16px] rounded-[20px] font-inter border-[1px] hover:border-[#41F092] hover:bg-transparent transition-colors ease-in-out text-center"
        >
          More
        </Link>
      </div>
      <div className="flex flex-col sm:max-w-[300px] border-[#D9D9D9] border-[1px] rounded-lg p-[20px]">
        <img src="/account.png" alt="" className="sm:max-w-[300px] rounded-lg mb-[4px]" />

        <a href="#" className="text-[#FB40FF] hover:underline font-inter">
          Mobile Application
        </a>
        <p className="text-[#343434] mb-[26px]">
          Learn more about our
          <br /> Mobile App
        </p>
        <Link
          href="/faq/mobile"
          className="bg-[#41F092] text-[#3D3D3D] py-[8px] text-[16px] rounded-[20px] font-inter border-[1px] hover:border-[#41F092] hover:bg-transparent transition-colors ease-in-out text-center"
        >
          More
        </Link>
      </div>
      <div className="flex flex-col sm:max-w-[300px] border-[#D9D9D9] border-[1px] rounded-lg p-[20px]">
        <img src="/billing.png" alt="" className="sm:max-w-[300px] rounded-lg mb-[4px]" />

        <a href="#" className="text-[#FB40FF] hover:underline font-inter">
          Web Application
        </a>
        <p className="text-[#343434] mb-[26px]">
          Learn more about our
          <br /> Web App
        </p>
        <Link
          href="/faq/web"
          className="bg-[#41F092] text-[#3D3D3D] py-[8px] text-[16px] rounded-[20px] font-inter border-[1px] hover:border-[#41F092] hover:bg-transparent transition-colors ease-in-out text-center"
        >
          More
        </Link>
      </div>
    </div>
  );
};

export default LinkBlock;
