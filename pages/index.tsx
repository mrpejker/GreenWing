/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useEffect } from 'react';
// import Bubble1Icon from '../components/icons/Bubble1Icon';

import AOS from 'aos';
import 'aos/dist/aos.css';
import ActiveLink from '../components/active-link';
import TopComponent from '../features/landing/top-component';
import ProductsComponent from '../features/landing/products';
const Home: NextPage = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex flex-col w-full min-h-screen items-center justify-center px-[20px]"
        style={{ backgroundImage: 'linear-gradient(180deg, transparent 80%, #1E1E1E 20%)' }}
      >
        <TopComponent />
        <div className="flex items-center justify-center w-full ">
          <div
            className="w-full max-w-[1240px] bg-[url(/lnd_bl2.png)] p-[20px] bg-no-repeat bg-center bg-cover rounded-lg"
            data-aos="fade-up"
          >
          </div>
        </div>
      </div>

      {/* <CarouselComponent /> */}

      {/* <div
            className="flex mt-[20px] mb-[20px] flex-col rounded-lg  bg-[url(/Rectangle.png)] bg-no-repeat bg-center bg-cover mx-[20px] p-[20px]"
            data-aos="fade-up"
          >
            <h2 className="font-grotesk mt-[10px] mb-[25px] text-white uppercase text-[25px]">Main Events</h2>
          </div> */}

      <div className="flex mb-[20px] w-full items-center flex-col mx-auto py-[40px] ">
        <div className="flex flex-col w-full max-w-[1240px] p-[80px] bg-[#1E1E1E] rounded-[50px]" data-aos="fade-up">
          <h2 className="font-grotesk mb-[40px] text-white uppercase text-[25px]">our vision</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[95px] auto-cols-max max-w-[1080px]">
            <div className="flex flex-col items-center w-full">
              <img src="/account.png" alt="" className="w-full" />
              <div className="mt-[40px]">
                <h3 className="font-drukHeavy text-[#41F092] uppercase text-[16px] mb-[14px]">Problem</h3>
                <p className="text-[#D9D9D9]">
                  Digital identity management is flawed: lack of data portability, risks of deplatforming, low privacy
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mt-[50px] md:mt-0">
              <img src="/sol.png" alt="" className="w-full" />
              <div className="mt-[40px]">
                <h3 className="font-drukHeavy text-[#41F092] uppercase text-[16px] mb-[14px]">Solution</h3>
                <p className="text-[#D9D9D9]">
                  Identity-as-Service platform to connect organisations and their users in thrustful and engaging way
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mt-[50px] md:mt-0">
              <img src="/who.png" alt="" className="w-full" />
              <div className="mt-[40px]">
                <h3 className="font-drukHeavy text-[#41F092] uppercase text-[16px] mb-[14px]">who? what?</h3>
                <p className="text-[#D9D9D9]">
                  vSelf team has years your experience in web3 development and computer science research
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col w-full max-w-[1080px] mx-auto mt-[20px] mb-[60px] px-[20px] items-start">
        <div>
          <div className="flex flex-col md:flex-row flex-wrap gap-3">
            <h3
              className="inline-flex bg-gradient-to-r from-[#157FDF] to-[#01E1FF] p-[20px] rounded-[20px] sm:text-[14px] xl:text-[16px] uppercase font-drukHeavy"
              data-aos="flip-up"
            >
              Verifiable <br />
              Credentials
            </h3>
            <h3
              className="bg-gradient-to-r from-[#157FDF] to-[#01E1FF] p-[20px] rounded-[20px] sm:text-[14px] xl:text-[16px] uppercase font-drukHeavy inline-flex"
              data-aos="flip-up"
              data-aos-delay="100"
            >
              base for ethical <br />
              data market
            </h3>
            <h3
              className="bg-gradient-to-r from-[#01E1FF] to-[#FB40FF] p-[20px] rounded-[20px] sm:text-[14px] xl:text-[16px] uppercase font-drukHeavy inline-flex"
              data-aos="flip-up"
              data-aos-delay="200"
            >
              privacy by
              <br />
              design
            </h3>
            <h3
              className="bg-gradient-to-r from-[#FB40FF] to-[#01E1FF] rounded-[20px] p-[20px] sm:text-[14px] xl:text-[16px] uppercase font-drukHeavy inline-flex"
              data-aos="flip-up"
              data-aos-delay="100"
            >
              nft-based <br />
              gamification
            </h3>
            <h3
              className="bg-gradient-to-r from-[#FB40FF] to-[#01E1FF] rounded-[20px] p-[20px] sm:text-[14px] xl:text-[16px] uppercase font-drukHeavy inline-flex"
              data-aos="flip-up"
              data-aos-delay="200"
            >
              multichain <br />
              support
            </h3>
            <h3
              className="bg-gradient-to-r from-[#157FDF] to-[#01E1FF] p-[20px] rounded-[20px] sm:text-[14px] xl:text-[16px] uppercase font-drukHeavy inline-flex"
              data-aos="flip-up"
              data-aos-delay="300"
            >
              web 3.0-native <br />
              architecture
            </h3>
            <h3
              className="bg-gradient-to-r from-[#FB40FF] to-[#01E1FF] p-[20px] rounded-[20px] sm:text-[14px] xl:text-[16px] uppercase font-drukHeavy inline-flex"
              data-aos="flip-up"
              data-aos-delay="100"
            >
              smooth web3
              <br /> onboarding
            </h3>
            <h3
              className="bg-gradient-to-r from-[#157FDF] to-[#01E1FF] p-[20px] rounded-[20px] sm:text-[14px] xl:text-[16px] uppercase font-drukHeavy inline-flex"
              data-aos="flip-up"
              data-aos-delay="200"
            >
              web3 reputation <br />
              tools
            </h3>
            <h3
              className="bg-gradient-to-r from-[#FB40FF] to-[#01E1FF] p-[20px] rounded-[20px] sm:text-[14px] xl:text-[16px] uppercase font-drukHeavy inline-flex"
              data-aos="flip-up"
              data-aos-delay="300"
            >
              Emergent <br />
              market niche
            </h3>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
