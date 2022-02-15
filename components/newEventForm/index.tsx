/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
// Models and types
import { Quest, EventData } from '../../models/Event';
import { QuestChangeCallback } from './quests/questComponent';
// Components
import Quests from './quests';
// Icons
import EventCard from '../eventsTable/eventCard';
import Modal from '../modal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAppStateDevMode } from '../../store/reducers/appStateReducer/actions';
// Mock data
import { mockEvent } from '../../mockData/mockEvents';

const initialQuest: Quest = {
  qr_prefix: '',
  reward_description: '',
  reward_title: '',
  reward_url: '',
};

const NewEventForm: React.FC = () => {
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [quests, editQuests] = useState<Quest[]>([initialQuest]);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [finishTime, setFinishTime] = useState<Date>(new Date());
  const [submitedEvent, setSubmitedEvent] = useState<EventData | undefined>();
  const { is_dev } = useAppSelector((state) => state.appStateReducer);
  const dispatch = useAppDispatch();

  const enableDevMode = (): void => {
    dispatch(setAppStateDevMode(true));
  };

  useEffect(() => {
    if (is_dev) {
      setEventTitle(mockEvent.event_name);
      setEventDescription(mockEvent.event_description);
      editQuests([...mockEvent.quests]);
      setStartTime(new Date(mockEvent.start_time / 1000000));
      setFinishTime(new Date(mockEvent.finish_time / 1000000));
    }
  }, [is_dev]);

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
    // Cleaning form
    // setEventTitle('');
    // setEventDescription('');
    // editQuests([initialQuest]);
    // setStartTime(new Date());
    // setFinishTime(new Date());
  };

  const onEventTitleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setEventTitle(event.currentTarget.value);
  };

  const onEventDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setEventDescription(event.target.value);
  };

  const onQuestChange: QuestChangeCallback = (index, field, value): void => {
    const editedQuest = {
      ...quests[index],
      [field]: value,
    };
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
          <Modal closeCallBack={closeModal} modalTitle="Confirm New Event">
            <EventCard eventData={submitedEvent} detailed />
          </Modal>
        </>
      )}

      <form onSubmit={onNewEventSubmit} className="flex-row flex flex-wrap container">
        <div className="flex-0 form-group mb-6 p-6 pb-0 rounded-lg shadow-lg bg-white max-w-md w-1/2 ">
          <h5 className="text-gray-900 text-xl font-medium mb-2">New Event</h5>
          <img className="rounded mb-4" src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt="" />
          <input
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
          <span className="flex-row flex justify-between mb-2 cursor-pointer">
            <DatePicker
              onChange={onStartTimeChange}
              selected={startTime}
              dateFormat="dd/MM/yyyy"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {/* <CalendarIcon /> */}
          </span>
          <span className="flex-row flex justify-between mb-2 cursor-pointer align-middle">
            <DatePicker
              onChange={onFinishTimeChange}
              selected={finishTime}
              dateFormat="dd/MM/yyyy"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {/* <CalendarIcon /> */}
          </span>
          <div className="mt-5">
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
            <button
              type="button"
              onClick={enableDevMode}
              className="inline-block ml-4 px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-blue-200 hover:bg-opacity-6 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Fill In Quests
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewEventForm;
