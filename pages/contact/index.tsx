/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import ActiveLink from '../../components/active-link';
import ContactUsIcon from '../../components/icons/ContactUsIcon';
import GithubIcon from '../../components/icons/GithubIcon';
import LinkedInIcon from '../../components/icons/LinkedInIcon';
import TelegramIcon from '../../components/icons/TelegramIcon';
import TwitterIcon from '../../components/icons/TwitterIcon';

const ContactPage: NextPage = () => {
  return (
    <div className="grid w-full min-h-screen items-center overflow-auto">
      <div className="flex w-full flex-col sm:flex-row max-w-[1240px] mx-auto mb-[40px] pt-[40px] px-[20px] font-inter mt-[140px]">
        <div className="flex flex-col w-full md:w-2/3">
          <h2 className="font-grotesk text-[#fff] text-[25px] uppercase">Social Media</h2>
          <div className="flex flex-row items-center my-5">
            <ActiveLink href="https://github.com/vself-project/vself-dao">
              <GithubIcon className="fill-white hover:opacity-[0.6] cursor-pointer transition-opacity" />
            </ActiveLink>
            <ActiveLink href="https://t.me/vselfbeta">
              <TelegramIcon className="fill-white hover:opacity-[0.6] cursor-pointer transition-opacity" />
            </ActiveLink>
            <ActiveLink href="https://twitter.com/vself_meta">
              <TwitterIcon className="fill-white hover:opacity-[0.6] cursor-pointer transition-opacity" />
            </ActiveLink>
            <ActiveLink href="https://www.linkedin.com/company/vself/">
              <LinkedInIcon className="fill-white hover:opacity-[0.6] cursor-pointer transition-opacity" />
            </ActiveLink>
          </div>
          <h2 className="font-grotesk text-[#fff] text-[25px] uppercase my-5">Email us</h2>
          <ActiveLink href="mailto:info@vself.app">
            <span className="text-white hover:underline no-underline">info@vself.app</span>
          </ActiveLink>
          <h2 className="font-grotesk text-[#fff] text-[25px] uppercase my-5">Use our app</h2>
          <div className="flex flex-col md:flex-row md:mt-[20px]">
            <ActiveLink
              className="mb-[18px] md:mb-0 md:mr-1"
              href="https://play.google.com/store/apps/details?id=com.VSelf.vselfapp"
            >
              <img src="/google_btn.png" alt="Google Play Store" />
            </ActiveLink>
            <ActiveLink href="https://apps.apple.com/app/vself/id1631569446">
              <img src="/apple_btn.png" alt="Apple Store" />
            </ActiveLink>
          </div>
        </div>

        <div className="flex flex-col w-full max-h-[400px] md:w-1/3 pt-[40px]" data-aos="slide-up" data-aos-delay="600">
          <div className="flex flex-col items-center">
            <div className="animate-ninja_bounce mb-[-40px] relative">
              <ContactUsIcon className="absolute z-[10] top-[20px] right-[-140px]" />
              <img className="" src="/lnd_nj.png" alt="ninja" height={180} width={145} />
            </div>
            <img className="-top-[50%] animate-pulse" height={370} width={109} src="/lnd_tail.png" alt="ninja" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
