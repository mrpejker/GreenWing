/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { setEventStatus, stopCreateEvent } from '../../store/reducers/contractReducer/actions';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { getNearAccountAndContract } from '../../utils';
// Models and types
import { Quest, EventData } from '../../models/Event';
import { QuestChangeCallback } from './quests/questComponent';
// Components
import Quests from './quests';
import Spinner from '../spinner';
import EventCard from '../eventsTable/eventCard';
import Modal from '../modal';

const initialQuest: Quest = {
  qr_prefix: '',
  reward_description: '',
  reward_title: '',
  reward_uri: '',
  file: undefined,
};

const NewEventForm: React.FC = () => {
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [quests, editQuests] = useState<Quest[]>([initialQuest]);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [finishTime, setFinishTime] = useState<Date>(new Date());
  const [submitedEvent, setSubmitedEvent] = useState<EventData | undefined>();
  const [isUploadingImgs, setIsUploadingImgs] = useState<boolean>(false);
  const { is_starting } = useAppSelector((state) => state.contractReducer);
  const { account_id } = useAppSelector((state) => state.userAccountReducer);

  const dispatch = useAppDispatch();

  const uploadImages = async () => {
    const promises = quests.map((quest: Quest) => {
      const { file } = quest;
      if (file === undefined) return;
      const randomcrctrs = (Math.random() + 1).toString(36).substring(7);
      const storageRef = ref(storage, `images/${randomcrctrs + file.name.replace(/ /g, '_')}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      return uploadTask.then(() => {
        return getDownloadURL(uploadTask.snapshot.ref);
      });
    });

    Promise.all(promises)
      .then((urls) => {
        dispatch(setAppLoadingState(true));
        startNewEvent(urls);
      })
      .catch((err) => console.log(err));
  };

  const startNewEvent = async (urls: any[]) => {
    const questsWithUrls = quests.map((quest: Quest, index: number) => {
      if (urls[index] === undefined) return;
      delete quest.file;
      return {
        ...quest,
        reward_uri: urls[index],
      };
    });
    if (questsWithUrls === undefined) return;
    try {
      const { contract } = await getNearAccountAndContract(account_id);
      await contract.start_event({
        event: {
          event_description: eventDescription,
          event_name: eventTitle,
          finish_time: finishTime.getTime() * 1000000,
          start_time: startTime.getTime() * 1000000,
          quests: questsWithUrls,
        },
      });
      dispatch(setEventStatus(true));
      dispatch(stopCreateEvent());
      dispatch(setAppLoadingState(false));

      // Cleaning form
      // setEventTitle('');
      // setEventDescription('');
      // editQuests([initialQuest]);
      // setStartTime(new Date());
      // setFinishTime(new Date());
    } catch (err) {
      console.log('Connection to contract ended with errors: ', err);
    }
  };

  // Uploading Images to Firebase and Start New Event after success
  useEffect(() => {
    if (is_starting) {
      setIsUploadingImgs(true);
      uploadImages();
    }
  }, [is_starting]);

  // New Event Form Handlers

  const onStartTimeChange = (date: Date): void => setStartTime(date);

  const onFinishTimeChange = (date: Date): void => setFinishTime(date);

  const onNewEventSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // Setting New Event
    setSubmitedEvent({
      event_name: eventTitle,
      event_description: eventDescription,
      finish_time: finishTime.getTime() * 1000000,
      start_time: startTime.getTime() * 1000000,
      quests,
    });
  };

  const onEventTitleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setEventTitle(event.currentTarget.value);
  };

  const onEventDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setEventDescription(event.target.value);
  };

  const onQuestChange: QuestChangeCallback = (index, field, value, file?): void => {
    let editedQuest = {
      ...quests[index],
      [field]: value,
    };

    if (file !== undefined) {
      editedQuest = {
        ...quests[index],
        [field]: value,
        file,
      };
    }
    const newState = [...quests];
    newState[index] = editedQuest;

    editQuests(newState);
  };

  const addNewQuest = (): void => {
    const newState = [...quests];
    newState.push(initialQuest);
    editQuests(newState);
  };

  const removeQuest = (index: number): void => {
    const newState = [...quests];
    newState.splice(index, 1);
    editQuests(newState);
  };

  const closeModal = (): void => setSubmitedEvent(undefined);

  return (
    <>
      {submitedEvent && (
        <>
          <div className="bg-black fixed top-0 left-0 w-full h-full flex bg-opacity-60 z-50"></div>
          <Modal closeCallBack={closeModal} modalTitle={isUploadingImgs ? 'Creating New Event' : 'Confirm New Event'}>
            {isUploadingImgs ? <Spinner /> : <EventCard eventData={submitedEvent} detailed />}
          </Modal>
        </>
      )}

      <form onSubmit={onNewEventSubmit} className="flex-row flex flex-wrap container">
        <div className="flex-0 form-group mb-6 p-6 pb-0 rounded-lg shadow-lg bg-white max-w-md w-1/2 relative">
          <h5 className="text-gray-900 text-xl font-medium mb-2">New Event</h5>
          <img className="rounded mb-4" src="/meta.jpg" alt="" />
          <input
            autoComplete="off"
            type="text"
            name="title"
            onChange={onEventTitleChange}
            value={eventTitle}
            className="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Event title"
          />
          <textarea
            name="description"
            value={eventDescription}
            onChange={onEventDescriptionChange}
            className="form-control
            block
            w-full
            mb-2
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Event description"
          />
          <span className="mb-2 ">Start Date:</span>
          <span className="flex-row flex justify-between mb-2 cursor-pointer">
            <DatePicker
              onChange={onStartTimeChange}
              selected={startTime}
              dateFormat="dd/MM/yyyy"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {/* <CalendarIcon /> */}
          </span>
          <span className="mb-4 ">End Date:</span>
          <span className="flex-row flex justify-between mb-2 cursor-pointer align-middle">
            <DatePicker
              onChange={onFinishTimeChange}
              selected={finishTime}
              dateFormat="dd/MM/yyyy"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {/* <CalendarIcon /> */}
          </span>
          <div className="mt-5 absolute bottom-6 left-6">
            <button
              type="submit"
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-blue-200 hover:bg-opacity-6 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Create New Event
            </button>
          </div>
        </div>

        <div className="flex-1 flex-row ml-4 form-group mb-6 p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">Quests</h5>
          <div className="flex flex-col overflow-y-scroll h-screen " style={{ maxHeight: 500 }}>
            <Quests quests={quests} onQuestChange={onQuestChange} removeQuest={removeQuest} />
          </div>
          <div className="mt-5 border-t-2 pt-5">
            <button
              type="button"
              onClick={addNewQuest}
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-blue-200 hover:bg-opacity-6 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Add New Quest
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewEventForm;
