import React, { useState } from 'react';
import Modal from '../../components/modal';
import { AnalyticsEvents } from '../../constants/analytics-events';
import { isStringEmpty } from '../../utils';
import { addDocToFirestore, logFirebaseEvent } from '../../utils/firebase';

const TopComponent: React.FC = () => {
  const [isSent, setIsSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const closeModal = () => {
    setIsSent(false);
  };
  const handleEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setEmail(value);
  };
  const submitForm = (event: React.FormEvent): void => {
    event.preventDefault();
    if (isStringEmpty(email)) {
      return;
    }
    addDocToFirestore('donate_emails', { email });
    setIsSent(true);
    setEmail('');
    logFirebaseEvent(AnalyticsEvents.EMAIL_SUBMITTED_LANDING, {});
  };
  return (
    <div className="flex flex-col w-full max-w-[1040px] mx-auto md:flex-row items-center mt-[150px] md:mt-0">
      <Modal isOpened={isSent} closeCallback={closeModal}>
        <h2 className="font-drukBold text-[#3D3D3D] uppercase my-4">Thank you!</h2>
        <p className="text-[#3D3D3D]">We&apos;ve got yor email!</p>
      </Modal>
      <div className="md:w-2/3">
        <h1 className="uppercase font-grotesk text-[25px] text-white">
        Greenwing is a revolutionary digital solution  for sustainable aviation fuels (SAF) supply chain management.        </h1>
        <p className="font-inter mt-[16px] mb-4 text-white">
          Сonnect to be added in our whitelist: be the first to get access to our private beta
        </p>
        <form onSubmit={submitForm} className="mt-[80px]">
          <div className="flex flex-col items-start md:flex-row md:items-center">
            <input
              value={email}
              onChange={handleEmailInput}
              type="email"
              placeholder="Email"
              className="text-[#41F092] outline-none p-2 bg-transparent border-b-[1px] border-[#B1B1B1] focus:border-[#41F092] md:min-w-[300px] md:mr-4 mb-[31px] md:mb-0"
            />
            <button
              type="submit"
              className="md:self-end font-inter p-[20px] py-[7px] border-[1px] rounded-[20px] text-[#41F092] border-[#41F092] hover:bg-[#41F092] hover:text-[#343434]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopComponent;
