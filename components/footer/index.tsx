/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import ActiveLink from '../active-link';

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
            </div>
          </div>
        </div>{' '}

      </div>
    </div>
  );
};

export default Footer;
