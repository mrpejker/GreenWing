/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ActiveLink from '../../components/active-link';

const ProductsComponent: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] w-full pt-[40px] pb-[80px]">
      <div className="w-full max-w-[1240px] mx-auto">
        <h2 className="px-[20px] max-w-[1080px] mx-auto text-white uppercase text-[25px] font-grotesk mb-[40px]">
          Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          <div className="flex flex-col ">
            <ActiveLink
              href="/vranda"
              className="items-center justify-center text-center transform transition duration-500 cursor-pointer bg-[#343434] hover:bg-[#276BEB] rounded-[20px] py-[75px]"
            >
              <h3 className="font-drukBold text-[30px] uppercase text-white">vRanda</h3>
            </ActiveLink>
          </div>
          <div className="flex flex-col ">
            <ActiveLink
              href="/dashboard"
              className="items-center justify-center text-center transform transition duration-500 cursor-pointer bg-[#343434] hover:bg-[#276BEB] rounded-[20px] py-[75px]"
            >
              <h3 className="font-drukBold text-[30px] uppercase text-white">Web3 Studio</h3>
            </ActiveLink>
          </div>
          <div className="flex flex-col ">
            <ActiveLink
              href="/onboard"
              className="items-center justify-center text-center transform transition duration-500 cursor-pointer bg-[#343434] hover:bg-[#276BEB] rounded-[20px] py-[50px]"
            >
              <h3 className="font-drukBold text-[30px] uppercase text-white">
                <b>
                  Identity
                  <br /> Wallet
                </b>
              </h3>
            </ActiveLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsComponent;
