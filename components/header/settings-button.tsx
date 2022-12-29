/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface SettingsButtonProps {
  isColored: boolean;
  toggleSettings: () => void;
  avatar: string | null;
  accountId: string | null;
}

const HeaderSettingsButton: React.FC<SettingsButtonProps> = ({ isColored, toggleSettings, avatar, accountId }) => {
  // UX Design: Setting Proper Class Names for TailwindCSS
  const setSettingsBtnClassName = () => {
    let btnClassName = 'flex justify-center items-center cursor-pointer transition-colors rounded-full border-[1px]';
    if (accountId) {
      const accountBtnClassName = isColored
        ? 'border-[#FB40FF] hover:bg-[#FB40FF] text-black hover:text-white'
        : 'border-[#ffffff2b] hover:border-[#41F092] hover:bg-[#41F092] text-white hover:text-black';

      btnClassName = btnClassName + ' sm:flex flex-row ' + accountBtnClassName;
    } else {
      const signInBtnClassName = isColored
        ? 'bg-[#FB40FF] text-white hover:text-[#FB40FF] hover:border-[#FB40FF]'
        : 'bg-[#41F092] text-black hover:text-[#41F092] hover:border-[#41F092]';
      btnClassName =
        btnClassName + ' sm:inline-block border-transparent min-w-[75px] hover:bg-transparent ' + signInBtnClassName;
    }
    return btnClassName + ' ';
  };

  return (
    <button onClick={toggleSettings} className={setSettingsBtnClassName()}>
      {accountId ? (
        <>
          <img
            src={String(avatar)}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = '/ninja2.png';
            }}
            alt=""
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
        </>
      ) : (
        <p>Sign In</p>
      )}
    </button>
  );
};

export default HeaderSettingsButton;
