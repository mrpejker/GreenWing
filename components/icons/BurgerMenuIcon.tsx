import React from 'react';

interface BurgerMenuIconProps {
  className?: string;
}

const BurgerMenuIcon: React.FC<BurgerMenuIconProps> = ({ className }) => (
  <svg width="26" className={className} height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="26" height="2" rx="1" transform="matrix(-1 0 0 1 26 18)" fill="#767676" />
    <rect width="26" height="2" rx="1" transform="matrix(-1 0 0 1 26 0)" fill="#767676" />
    <rect width="14.1818" height="2" rx="1" transform="matrix(-1 0 0 1 26 9)" fill="#767676" />
  </svg>
);

export default BurgerMenuIcon;
