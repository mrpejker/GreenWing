/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

interface LoginFormProps {
  loginCallBack: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ loginCallBack }) => {
  console.log('Proccess: ', process.env.NODE_ENV);

  return (
    <div className="container px-6 py-12 h-full">
      <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img src="/robot.jpg" className="w-full rounded" alt="Phone image" />
        </div>
        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
          <p className="text-xl font-light leading-relaxed mt-6 mb-4 text-gray-800">
            Welcome to <b>VSELF</b> please sign in with <b>NEAR</b>
          </p>
          <button
            onClick={loginCallBack}
            type="button"
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
