import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
// Models and types
import { Quest, EventData } from '../../models/Event';
// Components
import QuestComponent, { QuestChangeCallback } from './questComponent';
// Icons
import AddNewItemIcon from '../icons/AddNewItemIcon';
// import CalendarIcon from '../icons/CalendarIcon';
import ForwardIcon from '../icons/ForwardIcon';
import EventCard from '../eventsTable/eventCard';
import Modal from '../modal';

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
    setEventTitle('');
    setEventDescription('');
    editQuests([initialQuest]);
    setStartTime(new Date());
    setFinishTime(new Date());
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
        <Modal closeCallBack={closeModal} modalTitle="Confirm New Event">
          <EventCard eventData={submitedEvent} />
        </Modal>
      )}

      <form onSubmit={onNewEventSubmit} className="flex-row flex flex-wrap">
        <div className="flex-1 form-group mb-6 p-6 rounded-lg shadow-lg bg-white max-w-md w-1/2 flex-shrink-0">
          <h5 className="text-gray-900 text-xl font-medium mb-2">New Event</h5>
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
          <span className="flex-row flex justify-between my-1 cursor-pointer">
            <DatePicker
              onChange={onStartTimeChange}
              selected={startTime}
              dateFormat="dd/MM/yyyy"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {/* <CalendarIcon /> */}
          </span>
          <span className="flex-row flex justify-between my-1 cursor-pointer align-middle">
            <DatePicker
              onChange={onFinishTimeChange}
              selected={finishTime}
              dateFormat="dd/MM/yyyy"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {/* <CalendarIcon /> */}
          </span>
          <div>
            <button type="submit" className="flex flex-row justify-between my-1 items-center">
              Create New Event
              <ForwardIcon />
            </button>
          </div>
        </div>

        <div className="flex-1 flex-row ml-4">
          <div className="flex flex-row overflow-y-hidden flex-nowrap overflow-x-auto min-w-[50%] ">
            {quests.map((quest, index) => (
              <QuestComponent
                key={index}
                quest={quest}
                onQuestChange={onQuestChange}
                index={index}
                removable={quests.length >= 2}
                removeQuest={removeQuest}
              />
            ))}
          </div>
          <div>
            <button type="button" onClick={addNewQuest} className="flex flex-row justify-between my-1 items-center">
              Add New Quest
              <AddNewItemIcon />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewEventForm;
