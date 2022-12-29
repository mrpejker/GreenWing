import { useRouter } from 'next/router';
import React from 'react';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import ActiveLink from '../active-link';

const NotAuthorizedBlock: React.FC = () => {
  const { modal } = useWalletSelector();
  const router = useRouter();

  const handleAuth = async () => {
    modal.show();
    setTimeout(() => {
      const middleBtn: any = document.querySelector('.middleButton');
      middleBtn.onclick = () => {
        modal.hide();
        router.push('/onboard');
      };
    }, 0);
  };
  return (
    <div className="flex flex-col flex-wrap w-full overflow-x-auto">
      <h2 className="font-drukMedium text-black uppercase mb-2">You are not authorized</h2>
      <p className="text-[#3D3D3D]">
        Please{' '}
        <button onClick={handleAuth} className="cursor-pointer text-[#019FFF] underline hover:no-underline">
          {' '}
          Sign In
        </button>{' '}
        or{' '}
        <ActiveLink href="/onboard">
          <span className="cursor-pointer text-[#019FFF] underline hover:no-underline">Create new account</span>
        </ActiveLink>
      </p>
    </div>
  );
};

export default NotAuthorizedBlock;
