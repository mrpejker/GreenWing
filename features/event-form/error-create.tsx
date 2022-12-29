import React from 'react';

const ErrorCreateMessage: React.FC = () => {
  return (
    <>
      <h2 className="font-drukMedium text-red-900 mb-4">Ooops... Something went wrong.</h2>
      <p className="text-[#3D3D3D]">
        Please try again or feel free to reach us via{' '}
        <a className="underline text-[#019FFF] hover:no-underline" href="mailto:info@vself.app">
          info@vself.app
        </a>
      </p>
    </>
  );
};

export default ErrorCreateMessage;
