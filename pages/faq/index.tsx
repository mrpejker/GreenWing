/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import React from 'react';
import FAQComponent from '../../components/faq';
import FaqSidebar from '../../components/faq/sidebar';
import LinkBlock from '../../components/link-block';

const FaqPage: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center text-[#3D3D3D] mt-[120px]">
      <div className="max-w-[1240px] w-full mb-[30px] px-[20px]">
        <span className="text-[#B1B1B1] font-inter">
          Main / Resources / <b className="text-[#343434]">FAQ</b>
        </span>
      </div>
      <div className="w-full h-[300px] bg-[url(/instrcover.png)] bg-no-repeat bg-center bg-cover rounded-[20px] max-w-[1240px] px-[20px]" />
      <div className="flex flex-col w-full max-w-[1240px] px-[20px] py-[40px]">
        <div className="flex flex-col md:flex-row-reverse items-start w-full justify-between">
          <FaqSidebar />
          <div className="flex md:basis-2/3 flex-col w-full ">
            <FAQComponent />
          </div>
        </div>
        <LinkBlock />
      </div>
    </div>
  );
};

export default FaqPage;
