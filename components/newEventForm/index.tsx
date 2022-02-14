import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
// Models and types
import { Quest, EventData } from '../../models/Event';
// Components
import QuestComponent, { QuestChangeCallback } from './questComponent';
import StartEventButton from '../startEventButton';
// Icons
import AddNewItemIcon from '../icons/AddNewItemIcon';
// import CalendarIcon from '../icons/CalendarIcon';
import ForwardIcon from '../icons/ForwardIcon';
import { formatTimeStampToLocaleDateString } from '../../utils';

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
  const [submitedEvent, setSubmitedEvent] = useState<EventData>();

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

  return (
    <div className="flex flex-col">
      <div className="flex flex-col ml-5 mb-4 border-2 pb-4 rounded-md p-4">
        <h2 className="m-0 font-bold">{submitedEvent?.event_name}</h2>
        <p>{submitedEvent?.event_description}</p>

        {submitedEvent?.quests.map((quest: Quest, index: number) => (
          <div key={index} className="flex flex-col w-full mt-2">
            <h3>Quest #{index}</h3>
            <span className="justify-between w-full flex">
              <b>reward_title:</b> {quest.reward_title}
            </span>
            <span className="justify-between w-full flex">
              <b>reward_description:</b> {quest.reward_description}
            </span>
            <span className="justify-between w-full flex">
              <b>reward_url:</b> {quest.reward_url}
            </span>
            <span className="justify-between w-full flex">
              <b>qr_prefix:</b> {quest.qr_prefix}
            </span>
          </div>
        ))}
        <span className="mt-2">
          {submitedEvent?.start_time && 'Start Date: ' + formatTimeStampToLocaleDateString(submitedEvent.start_time)}
        </span>
        <span className="mt-2">
          {submitedEvent?.finish_time && 'End Date: ' + formatTimeStampToLocaleDateString(submitedEvent.finish_time)}
        </span>
        <div className="mt-2" mb-2>
          {submitedEvent && <StartEventButton />}
        </div>
      </div>

      <form onSubmit={onNewEventSubmit} className="flex justify-center">
        <div className="flex flex-col">
          <h3 className="my-1">New Event</h3>
          <input
            type="text"
            name="title"
            onChange={onEventTitleChange}
            value={eventTitle}
            className="my-1 placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Event title"
          />
          <textarea
            name="description"
            value={eventDescription}
            onChange={onEventDescriptionChange}
            className="my-1 resize-none placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Event description"
          />
          <span className="flex-row flex justify-between my-1 cursor-pointer">
            <DatePicker
              onChange={onStartTimeChange}
              selected={startTime}
              dateFormat="dd/MM/yyyy"
              className="w-full cursor-pointer my-1 resize-none placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            />
            {/* <CalendarIcon /> */}
          </span>
          <span className="flex-row flex justify-between my-1 cursor-pointer align-middle">
            <DatePicker
              onChange={onFinishTimeChange}
              selected={finishTime}
              dateFormat="dd/MM/yyyy"
              className="w-full cursor-pointer my-1 resize-none placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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

        <div className="flex ml-4 w-full border-l-2 pl-4 flex-col">
          <div className="w-full flex flex-row flex-wrap">
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
    </div>
  );
};

export default NewEventForm;