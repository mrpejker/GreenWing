/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

interface LoaderProps {
  children: React.ReactElement;
  is_load: boolean;
}

export const SpinnerLoader: React.FC = () => {
  return (
    <div className="mx-auto animate-arrow bg-transparent h-[170px] w-[170px] bg-[url(/g6.png)] bg-center bg-[length:170px_170px] my-[40px] rounded-full" />
  );
};

const Loader: React.FC<LoaderProps> = ({ children, is_load }) => {
  const [isLoading, setIsLoading] = useState<boolean>(is_load || true);

  useEffect(() => {
    setIsLoading(is_load);
  }, [is_load]);

  return isLoading ? <SpinnerLoader /> : children;
};

export default Loader;
