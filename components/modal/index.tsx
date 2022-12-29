import React from 'react';

interface ModalProps {
  title?: string;
  closeCallback?: () => void;
  secondCallback?: () => void;
  isOpened?: boolean;
  isError?: boolean;
  wFull?: boolean;
  secondBtnTitle?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isError,
  closeCallback,
  secondCallback,
  isOpened,
  secondBtnTitle,
}) => {
  // return (
  //   <div
  //     className="modal items-center fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-background-dark hidden animate-fadein"
  //     style={isOpened ? { display: 'grid', opacity: 1 } : {}}
  //     tabIndex={-1}
  //     role="dialog"
  //     aria-modal={true}
  //   >
  //     <div
  //       className={`max-w-prose flex flex-col w-full bg-white relative rounded-lg p-5 z-10 ${
  //         wFull ? 'container w-full' : 'modal-dialog w-auto'
  //       } `}
  //     >
  //       {isOpened && children}
  //       <div className="flex justify-center mt-4">
  //         <button
  //           onClick={closeCallback}
  //           type="button"
  //           className="flex self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
  //         >
  //           Close
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
  if (!isOpened) return null;
  return (
    <div
      className="grid modal items-center justify-center fixed top-0 left-0 w-screen h-screen outline-none overflow-x-hidden overflow-y-scroll bg-background-dark animate-fadein"
      tabIndex={-1}
      role="dialog"
      aria-modal={true}
    >
      <div className="modal-dialog h-fit relative transform rounded-[30px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-[30px]">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              {isError && (
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                  />
                </svg>
              )}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">{children}</div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-[30px]">
          {secondCallback && (
            <button
              onClick={secondCallback}
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {secondBtnTitle}
            </button>
          )}
          <button
            onClick={() => {
              closeCallback && closeCallback();
            }}
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
