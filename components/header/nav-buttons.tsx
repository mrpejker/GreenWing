import React, { useEffect, useState } from 'react';
import ActiveLink from '../active-link';

interface NavButtonsProps {
  isAbout: boolean;
  callback: (title: string) => void;
  menuItems: any[];
  className?: string;
  activeMenu?: string | null;
}

interface NavMenuItemProps {
  activeBtnClassName: string;
  btnClassName: string;
  href: string;
  callback?: (title: string) => void;
  titleClassName: string;
  title: string;
  activeMenu?: string | null;
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({
  activeBtnClassName,
  btnClassName,
  href,
  callback,
  titleClassName,
  title,
  activeMenu,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  // We need to deactivate category selector if another is clicked
  useEffect(() => {
    if (activeMenu !== title) {
      setIsChecked(false);
    }
  }, [activeMenu, title]);
  // We need to prevent routing to a page if the link is a category selector
  const menuItemCallback = callback
    ? () => {
        setIsChecked(!isChecked);
        callback(title);
      }
    : undefined;

  return (
    <ActiveLink
      active={activeBtnClassName}
      href={href}
      checked={isChecked}
      className={btnClassName}
      callback={menuItemCallback}
    >
      <span className={titleClassName}>{title}</span>
    </ActiveLink>
  );
};

const NavButtons: React.FC<NavButtonsProps> = ({ isAbout, callback, menuItems, className, activeMenu }) => {
  // Nav Buttons Styles
  const activeBtnClassName = isAbout ? '#FB40FF' : '#41F092';
  const btnClassName = isAbout ? 'hover:text-[#FB40FF]' : 'hover:text-[#41F092]';
  const titleClassName = isAbout ? 'hover:text-[#FB40FF]' : 'hover:text-[#41F092]' + ' px-1';

  return (
    <ul className={className}>
      {menuItems.map(({ url, title, submenu }, index) => {
        return (
          <li key={index}>
            <NavMenuItem
              activeBtnClassName={activeBtnClassName}
              btnClassName={btnClassName}
              href={String(url)}
              activeMenu={activeMenu}
              callback={submenu ? callback : undefined}
              titleClassName={titleClassName}
              title={title}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default NavButtons;
