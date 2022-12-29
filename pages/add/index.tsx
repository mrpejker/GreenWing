/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextPage } from 'next';
import { useState } from 'react';
import Modal from '../../components/modal';
import EventForm, { ResultFormData } from '../../features/event-form';
import { Quest } from '../../models/Event';
import { hash, resizeFile } from '../../utils';
import { addDocToFirestoreWithName, logFirebaseEvent, uploadImageToFirebase } from '../../utils/firebase';

import { utils } from 'near-api-js';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import ErrorCreateMessage from '../../features/event-form/error-create';
import SuccessCreateMessage from '../../features/event-form/success-create';
import Loader from '../../components/loader';
import NotAuthorizedBlock from '../../components/not-authorized';
import { AnalyticsEvents } from '../../constants/analytics-events';

const BOATLOAD_OF_GAS = utils.format.parseNearAmount('0.00000000003')!;

const NewEventPage: NextPage = () => {
  const { selector, accountId } = useWalletSelector();
  const [eventId, setEventId] = useState<number | null>(null);
  const [event_data, setEvenData] = useState<any>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [claimStrings, setClaimStrings] = useState<any>([]);

  const toggleEventPrivateSettings = () => {
    setIsPrivate(!isPrivate);
  };
  // Uploading Images to Firebase and Start New Event after success
  const startNewEvent = async (event_data: ResultFormData) => {
    try {
      setIsLoading(true);
      setEvenData({
        ...event_data,
      });
      // Resize Images Before Upload
      const { event_description, event_name, finish_time, start_time, quests, files } = event_data;
      const resizedImgsPromises = files.map(resizeFile);
      const resizedFiles = await Promise.all(resizedImgsPromises);
      // Upload Images To Firebase And Getiing Download URLS
      const promises = resizedFiles.map(uploadImageToFirebase);
      const urls = await Promise.all(promises);
      // Placing URLS of Images to Request
      const strings: any[] = [];
      const questsWithUrls = quests.map((quest: Quest, index: number) => {
        if (urls[index] === undefined) return;
        // Setting URLS of Uploaded Images To Quests
        strings.push(quest.qr_prefix_enc);
        const hashedPrefix = hash(quest.qr_prefix_enc);
        const prefixLength = quest.qr_prefix_enc.length;
        return {
          ...quest,
          qr_prefix_enc: hashedPrefix,
          qr_prefix_len: prefixLength,
          reward_uri: urls[index],
        };
      });

      // Starting New Event In NEAR
      const wallet = await selector.wallet();

      const result: any = await wallet
        .signAndSendTransaction({
          signerId: accountId!,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: 'start_event',
                args: {
                  event_data: {
                    event_description,
                    event_name,
                    finish_time,
                    start_time,
                    quests: questsWithUrls,
                  },
                },
                gas: BOATLOAD_OF_GAS,
                deposit: utils.format.parseNearAmount('0')!,
              },
            },
          ],
        })
        .catch((err: any) => {
          throw err;
        });
      // TODO: Need to refactor this.
      const event_id = result.receipts_outcome[0].outcome.logs[0].split(' ')[8];
      addDocToFirestoreWithName('claims', String(event_id), { claimStrings: strings, isPrivate: Boolean(isPrivate) });
      logFirebaseEvent(AnalyticsEvents.NEW_EVENT_CREATED, {});

      setClaimStrings(strings);
      setEventId(Number(event_id));
      setIsLoading(false);
      setEvenData(null);
    } catch (err) {
      console.log(err);
      logFirebaseEvent(AnalyticsEvents.NEW_EVENT_FAILED, {});
      setIsError(true);
      setIsLoading(false);
    }
  };

  const closeModal = (): void => {
    setEventId(null);
    setIsError(false);
  };

  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const claimLink = `${origin}/claim/${eventId}?strings=${claimStrings}`;
  const copyToClipBoard = async () => {
    navigator.clipboard.writeText(claimLink);
  };
  return (
    <>
      <Modal
        isOpened={Boolean(eventId)}
        closeCallback={closeModal}
        secondBtnTitle="Copy"
        secondCallback={copyToClipBoard}
      >
        <h2 className="font-drukMedium text-black mb-2">Your Event Was Created</h2>
        <p className="text-[#3D3D3D] mb-2">
          You can see it&apos;s stats on the{' '}
          <a className="underline" href={`/event/${eventId}`}>
            event&apos;s page
          </a>
        </p>
        <p className="text-[#3D3D3D] mb-2">Your Claim Link for Reward:</p>
        <input type="text" className="w-full mb-4 text-black" value={claimLink} disabled />
      </Modal>
      <Modal isOpened={isError} isError={isError} closeCallback={closeModal}>
        <ErrorCreateMessage />
      </Modal>
      <div className="flex justify-center min-h-screen items-center px-[20px]">
        <Loader is_load={isLoading}>
          {accountId ? (
            <EventForm submitForm={startNewEvent} event_data={event_data} toggle={toggleEventPrivateSettings} />
          ) : (
            <div className="w-full max-w-[1240px] px-[20px] py-[40px] bg-white rounded-xl">
              <div className="w-full max-w-[1080px] mx-auto">
                <NotAuthorizedBlock />
              </div>
            </div>
          )}
        </Loader>
      </div>
    </>
  );
};

export default NewEventPage;
