/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import ActiveLink from '../active-link';
import SocialLinks from '../header/social-links';
import AppleStoreIcon from '../icons/AppleStoreIcon';
import GoogleStoreIcon from '../icons/GoogleStoreIcon';

const Footer: React.FC = () => {
  const router = useRouter();
  const { modal, accountId, selector } = useWalletSelector();

  const handleAuth = async () => {
    if (!accountId) {
      modal.show();
      setTimeout(() => {
        const middleBtn: any = document.querySelector('.middleButton');
        middleBtn.onclick = () => {
          modal.hide();
          router.push('/onboard');
        };
      }, 0);
    } else {
      const wallet = await selector.wallet();

      wallet.signOut().catch((err: any) => {
        console.log('Failed to sign out');
        console.error(err);
      });
    }
  };
  const isAbout =
    router.pathname === '/about' ||
    router.pathname.includes('/blog') ||
    router.pathname === '/blog' ||
    router.pathname.includes('/faq') ||
    router.pathname == '/faq';

  const renderFooterBackground = () => {
    switch (router.pathname) {
      case '/':
      case '/contact':
      case '/404':
        return 'bg-transparent text-white';
      case '/about':
      case router.pathname.includes('/blog') && router.pathname:
      case router.pathname.includes('/faq') && router.pathname:
        return 'bg-transparent text-black';
      default:
        return 'bg-[#00000066]';
    }
  };
  const signInBtnClassName = isAbout
    ? 'bg-[#FB40FF] text-white hover:text-[#FB40FF] hover:border-[#FB40FF]'
    : 'bg-[#41F092] text-black hover:text-[#41F092] hover:border-[#41F092]';
  return (
    <div className={renderFooterBackground() + ' flex flex-col py-[40px]'}>
      <div className="flex flex-col md:flex-row w-full max-w-[1240px] mx-auto self-center justify-between items-baseline px-[20px]">
        <div className="flex flex-col w-full md:flex-row md:w-2/3">
          <div className="w-full md:w-1/3">
            <ActiveLink href="/">
              <h2 className={` ${isAbout ? 'text-[#343434]' : 'text-[#41F092]'} font-grotesk text-[25px]`}>vSelf</h2>
            </ActiveLink>
          </div>
          <div className="flex w-full flex-col md:flex-row md:w-1/2 mt-[20px] md:mt-0">
            <div className="flex w-full flex-col md:w-2/3">
              <h2 className={isAbout ? 'text-[#343434]' : 'text-[#41F092]'}>
                <b>Products</b>
              </h2>
              <ActiveLink href="/onboard" className="mt-2">
                <p className={isAbout ? 'hover:text-[#FB40FF] text-black' : 'hover:text-[#41F092] text-white'}>
                  Onboarding to Near
                </p>
              </ActiveLink>
              <ActiveLink href="/dashboard" className="mt-2">
                <p className={isAbout ? 'hover:text-[#FB40FF] text-black' : 'hover:text-[#41F092] text-white'}>
                  Collections dashboard
                </p>
              </ActiveLink>

              <ActiveLink href="/add" className="mt-2">
                <p className={isAbout ? 'hover:text-[#FB40FF] text-black' : 'hover:text-[#41F092] text-white'}>
                  Create Collection
                </p>
              </ActiveLink>
              <ActiveLink href="/vranda" className="mt-2">
                <p className={isAbout ? 'hover:text-[#FB40FF] text-black' : 'hover:text-[#41F092] text-white'}>
                  vRanda
                </p>
              </ActiveLink>
            </div>
            <div className="flex w-full flex-col md:w-1/2">
              <h2 className={isAbout ? 'text-[#343434]' : 'text-[#41F092]'}>
                <b>Resources</b>
              </h2>
              <ActiveLink href="/faq" className="mt-2">
                <p className={isAbout ? 'hover:text-[#FB40FF] text-black' : 'hover:text-[#41F092] text-white'}>FAQ</p>
              </ActiveLink>
              <ActiveLink href="/academy" className="mt-2">
                <p className={(isAbout ? 'hover:text-[#FB40FF] text-black' : 'hover:text-[#41F092] text-white') + ' '}>
                  vSelf Academy
                </p>
              </ActiveLink>
              <ActiveLink href="https://vself-project.gitbook.io/vself-project-documentation/" className="mt-2">
                <p className={(isAbout ? 'hover:text-[#FB40FF] text-black' : 'hover:text-[#41F092] text-white') + ' '}>
                  Documents
                </p>
              </ActiveLink>
              <ActiveLink href="/blog" className="mt-2">
                <p className={(isAbout ? 'hover:text-[#FB40FF] text-black' : 'hover:text-[#41F092] text-white') + ' '}>
                  Blog
                </p>
              </ActiveLink>
            </div>
          </div>
        </div>{' '}
        <div className="flex flex-col md:items-end w-full md:w-1/3">
          <div className="flex grow w-full max-w-[250px] flex-row items-center">
            <SocialLinks isColored={isAbout} />
            <button
              type="button"
              onClick={handleAuth}
              className={
                'flex justify-center items-center cursor-pointer transition-colors rounded-full border-[1px] sm:inline-block border-transparent min-w-[75px] hover:bg-transparent ' +
                signInBtnClassName
              }
            >
              {accountId ? 'Sign Out' : 'Sign In'}
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-end mt-[20px] md:mt-[70px]">
            <ActiveLink
              className="w-1/2 mb-[18px] md:mb-0 md:mr-1"
              href="https://play.google.com/store/apps/details?id=com.VSelf.vselfapp"
            >
              <GoogleStoreIcon
                className={`${
                  isAbout ? '  hover:fill-[#b8b8b8]' : ' hover:fill-[#41F092] hover:stroke-black '
                }  transition-colors`}
                fill={isAbout ? '#343434' : 'white'}
              />
            </ActiveLink>
            <ActiveLink className="w-1/2 !mr-0" href="https://apps.apple.com/app/vself/id1631569446">
              <AppleStoreIcon
                className={`${
                  isAbout ? ' hover:fill-[#b8b8b8]' : ' hover:fill-[#41F092] hover:stroke-black '
                }  transition-colors`}
                stroke={isAbout ? '#343434' : 'white'}
                fill={isAbout ? '#343434' : 'white'}
              />
            </ActiveLink>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1240px] mx-auto px-[20px] text-center mt-8">
        <p className="font-DrukMedium">&copy; VSELF LTD 2022 </p>
      </div>
    </div>
  );
};

export default Footer;
