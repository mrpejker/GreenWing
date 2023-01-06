/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { isEnvProd } from '../../utils';
import { navMenuItems, subMenuItems } from './header-menu';
import NavButtons from './nav-buttons';

import { useWalletSelector } from '../../contexts/WalletSelectorContext';

interface DropdownMenuProps {
  activemenu: { title: string; type: string };
  isOpened: boolean;
  openSubmenu: (title: string) => void;
  handleSignOut: () => void;
  isAbout: boolean;
  accountId: string | null;
}

export enum MenuType {
  Main = 'MainMenu',
  Submenu = 'Submenu',
  Settings = 'SettingsMenu',
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  activemenu,
  isOpened,
  openSubmenu,
  isAbout,
  handleSignOut,
  accountId,
}) => {
  const { selector } = useWalletSelector();
  if (!isOpened) return null;
  const isProducts = activemenu.title === 'Products';
  const imgsrc = isProducts ? '/products.png' : '/resources.png';

  switch (activemenu.type) {
    case MenuType.Main:
      return (
        <div className="flex flex-row max-w-[1140px] mx-auto w-full p-[20px]">
          <NavButtons
            isAbout={isAbout}
            callback={openSubmenu}
            menuItems={navMenuItems}
            className="flex flex-col gap-4 w-full md:w-1/2"
          />
        </div>
      );
    case MenuType.Submenu:
      return (
        <div className="flex flex-row max-w-[1140px] mx-auto w-full p-[20px]">
          <NavButtons
            isAbout={isAbout}
            callback={openSubmenu}
            menuItems={subMenuItems[String(activemenu.title)]}
            className="flex flex-col gap-4 w-full md:w-1/2"
          />
        </div>
      );
    case MenuType.Settings:
      return (
        <div className="flex flex-col max-w-[1240px] mx-auto w-full p-[20px] items-start sm:items-end">
          <p className="font-interBold mb-[10px]">{accountId}</p>
          <button
            type="button"
            onClick={handleSignOut}
            className=" sm:inline-block hover:bg-transparent hover:text-[#41F092] rounded-full"
          >
            Sign Out
          </button>
        </div>
      );
    default:
      return null;
  }
};

export default DropdownMenu;
