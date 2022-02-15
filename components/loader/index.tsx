import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';

interface LoaderProps {
  children: React.ReactElement;
}

const Loader: React.FC<LoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { is_loading } = useAppSelector((state) => state.appStateReducer);

  useEffect(() => {
    setIsLoading(is_loading);
  }, [is_loading]);

  const renderLoader = () => {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="flex justify-center items-center space-x-2">
            <div
              className="spinner-grow inline-block w-8 h-8 bg-yellow-400 rounded-full opacity-0 text-blue-600"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="
        spinner-grow inline-block w-8 h-8 bg-yellow-400 rounded-full opacity-0
          text-purple-500
        "
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="
        spinner-grow inline-block w-8 h-8 bg-yellow-400 rounded-full opacity-0
          text-green-500
        "
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow inline-block w-8 h-8 bg-yellow-400 rounded-full opacity-0 text-red-500"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="
        spinner-grow inline-block w-8 h-8 bg-yellow-400 rounded-full opacity-0
          text-yellow-500
        "
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow inline-block w-8 h-8 bg-yellow-400 rounded-full opacity-0 text-blue-300"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow inline-block w-8 h-8 bg-yellow-400 rounded-full opacity-0 text-gray-300"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return isLoading ? renderLoader() : children;
};

export default Loader;
