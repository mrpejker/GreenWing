import React from 'react';

const ErrorCreateMessage: React.FC = () => {
  return (
    <>
      <h2 className="font-drukMedium text-red-900 mb-4">Ooops... Something went wrong.</h2>
      <p className="text-[#3D3D3D]">
        Please try again.
      </p>
    </>
  );
};

export default ErrorCreateMessage;
