/* eslint-disable @next/next/no-img-element */
export default function Custom404() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="animate-ninja_bounce relative">
          <img src="/oh_no.png" alt="" />
        </div>
        <h1 className="font-grotesk text-[#41f092] text-[116px]">404</h1>
        <p className="text-white text-center text-[25px]">
          Oops! seems some sort of problem has occurred! <br />I suggest we go back to the home page
        </p>
      </div>
    </div>
  );
}
