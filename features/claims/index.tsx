/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import Modal from '../../components/modal';
import { AnalyticsEvents } from '../../constants/analytics-events';
import { EventData } from '../../models/Event';
import { logFirebaseEvent } from '../../utils/firebase';
import ClaimForm from './claim-form';
import ClaimsList from './claims-list';

interface ClaimsProps {
  event_id: number;
  claims: any[];
  eventData: EventData | undefined;
}

const Claims: React.FC<ClaimsProps> = ({ claims, event_id, eventData }) => {
  const [qrString, setQRString] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const [claimString, setClaimString] = useState<string | null>(null);

  const closeModal = () => {
    setQRString(null);
    setClaimString(null);
    setImgSrc(null);
  };

  const openImgModal = (index: number) => {
    const rewardImg = eventData?.quests[index].reward_uri;
    setImgSrc(String(rewardImg));
  };

  const openQRCodeModal = (index: number) => {
    setQRString(claims[index]);
  };

  const openClaimModal = (index: number) => {
    setClaimString(claims[index]);
  };

  const downloadQR = () => {
    const svg: any = document.getElementById('qrcode');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = String(qrString);
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    logFirebaseEvent(AnalyticsEvents.CLAIM_QR_DOWNLOADED, {});
  };

  return (
    <>
      <Modal isOpened={!!imgSrc} closeCallback={closeModal}>
        <img
          src={String(imgSrc)}
          alt=""
          className="mb-4 object-contain"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = 'https://wallet.testnet.near.org/failed_to_load.3a5f0340.svg';
          }}
        />
      </Modal>
      <Modal isOpened={!!qrString} closeCallback={closeModal} secondBtnTitle="Download" secondCallback={downloadQR}>
        <h2 className="font-drukMedium uppercase text-black text-xl mb-2">QR Code</h2>
        <QRCode id="qrcode" value={String(qrString)} />
      </Modal>
      <Modal isOpened={!!claimString} closeCallback={closeModal}>
        <ClaimForm event_id={event_id} claimString={String(claimString)} />
      </Modal>
      <div className="flex flex-col w-full px-[20px] py-[40px] mb-4 overflow-x-auto bg-white rounded-[40px] shadow-lg ">
        <div className="flex flex-col w-full max-w-[1080px] mx-auto">
          <h2 className="font-drukMedium uppercase text-black text-[30px] mb-[25px]">QR Strings</h2>
          <ClaimsList
            event_id={event_id}
            eventData={eventData}
            claims={claims}
            imgCallback={openImgModal}
            qrbtnCallback={openQRCodeModal}
            claimBtnCallback={openClaimModal}
          />
        </div>
      </div>
    </>
  );
};

export default Claims;
