/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import ActiveLink from '../../components/active-link';

const AppPage: NextPage = () => {
  return (
    <div className="grid place-items-center min-h-screen bg-[#343434]">
      <div
        id="ourapp"
        className="flex flex-col md:flex-row-reverse  w-full max-w-[1080px] mx-auto  items-center mt-[20px] mb-[60px] p-[20px] rounded-[20px] bg-[url(/lnd_lst_blk.png)] md:bg-[url(/lnd-bg2.png)] bg-no-repeat bg-center bg-cover"
      >
        <div className="flex flex-col md:w-1/2 items-center">
          <img src="/lnd_img5.png" alt="vSelf" className="mt-[-20px] md:w-1/2 md:mt-0" data-aos="slide-up" />
          <h3 className="uppercase mb-[10px] text-center text-[22px] mt-[45px] font-interBold">try our app</h3>
          <p className="text-center text-white mb-[20px]">
            vSelf app is now available for iOS and android. <br />
            Download it now and start writing <br />
            your own web3 history!
          </p>
          <div className="flex flex-col md:flex-row items-center md:mt-[20px]">
            <ActiveLink
              className="w-1/2 mb-[18px] md:mb-0 md:mr-1"
              href="https://play.google.com/store/apps/details?id=com.VSelf.vselfapp"
            >
              <img src="/google_btn.png" alt="Google Play Store" />
            </ActiveLink>
            <ActiveLink className="w-1/2" href="https://apps.apple.com/app/vself/id1631569446">
              <img src="/apple_btn.png" alt="Apple Store" />
            </ActiveLink>
          </div>
        </div>
        <div className="flex justify-center relative md:w-1/2">
          <img src="/phone1.png" alt="phone" className="flex self-center w-1/2" data-aos="slide-up" />

          <img src="/phone2.png" alt="phone" className="absolute w-1/2" data-aos="slide-up" data-aos-delay="500" />
        </div>
      </div>
    </div>
  );
};

export default AppPage;
