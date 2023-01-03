/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useEffect } from 'react';
import AOS from 'aos';

import ActiveLink from '../../components/active-link';
import TwitterIcon from '../../components/icons/TwitterIcon';
import LinkedInIcon from '../../components/icons/LinkedInIcon';
import HiIcon from '../../components/icons/HiIcon';
import WelcomeIcon from '../../components/icons/WelcomeIcon';

const AboutPage: NextPage = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="bg-[#fff]">
      <div className="flex flex-col items-center px-[20px]">
        <div className="flex flex-col md:flex-row max-w-[1240px] bg-[#343434] p-[30px] md:p-[75px] mt-[155px] rounded-xl overflow-hidden">
          <div className="md:w-2/3">
            <h1 className="font-grotesk uppercase text-[#fff] sm:text-[32px] text-[25px]">
            GreenWing is a digital solution that provides traceability for sustainable aviation fuels (SAF) certificates using blockchain technology.
            </h1>
            <p className="font-inter text-[#fff] text-[20px] mt-[20px] mb-[65px]">
            The SAF market will need to develop rapidly in the coming years to meet ambitious climate targets. 
            There is a risk that if countries develop these markets in isolation, a patchwork of systems and 
            certification standards will evolve, creating additional complexities, costs, and delays for industry participants 
            in production, distribution, compliance, and monitoring.
            </p>
          </div>
        </div>


        <div className="flex flex-col sm:flex-row max-w-[1240px] bg-[url(/mission_bg.png)] bg-cover bg-no-repeat rounded-xl mt-[100px] mb-[40px] pt-[40px] px-[80px] font-inter">
          <div className="flex flex-col w-full md:w-2/3">
            <h2 className="font-drukMedium text-[#fff] text-[25px] uppercase">Mission</h2>
            <p className="font-interBold text-[#fff] text-[20px] my-[35px]">What is GreenWing?</p>
            <p className="text-[#fff] text-[20px]">
            The creation of a national or global SAF platform could expand the typical bilateral relationship 
            between producers and buyers, providing better information and competitive prices to end customers. 
            Standardization of credentials and automation of the supply chain management allows for more independent 
            actors to use the same IT environment.  Improved supply-chain transparency could allow off-takers to source 
            volumes and their virtual attributes from their more economically advantageous points, in turn stimulating SAF 
            production from the most efficient technological pathways, most sustainable feedstocks, and most socioeconomically 
            responsible processes.
            </p>
          </div>
          <div
            className="flex flex-col w-full max-h-[400px] md:w-1/3 pt-[40px]"
            data-aos="slide-up"
            data-aos-delay="600"
          >
            <div className="flex flex-col items-center">
              <div className="animate-ninja_bounce mb-[-40px] relative">
                <img className="" src="/lnd_nj.png" alt="ninja" height={180} width={145} />
              </div>
              <img className="-top-[50%] animate-pulse" height={370} width={109} src="/lnd_tail.png" alt="ninja" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
