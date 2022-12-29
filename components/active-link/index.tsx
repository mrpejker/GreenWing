import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ActiveLinkProps {
  children: React.ReactElement;
  href: string;
  className?: string;
  active?: string;
  callback?: () => void;
  checked?: boolean;
}
const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href, className, active, callback, checked }) => {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router?.asPath === href || checked ? active : 'inherit',
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (callback) {
      callback();
      return;
    }
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} style={style} className={className}>
      {children}
    </Link>
  );
};

export default ActiveLink;
