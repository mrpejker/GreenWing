import React, { useState } from 'react';
// Models and types
import { Quest, EventData } from '../../models/Event';
// Components
import QuestComponent, { QuestChangeCallback } from './questComponent';
import StartEventButton from '../startEventButton';
// Icons
import AddNewItemIcon from '../icons/AddNewItemIcon';
import CalendarIcon from '../icons/CalendarIcon';
import ForwardIcon from '../icons/ForwardIcon';

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
  const [submitedEvent, setSubmitedEvent] = useState<EventData>();

  const onNewEventSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // Setting New Event
    setSubmitedEvent({
      event_name: eventTitle,
      event_description: eventDescription,
      finish_time: new Date().getTime() * 1000,
      start_time: new Date().getTime() * 1000,
      quests,
    });
    // Cleaning form
    setEventTitle('');
    setEventDescription('');
    editQuests([initialQuest]);
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
    <div className="flex flex-row overflow-y-auto">
      <form onSubmit={onNewEventSubmit} className="flex flex-col">
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
        <span className="flex-row flex justify-between my-1">
          {new Date().toLocaleDateString()}
          <CalendarIcon />
        </span>
        <span className="flex-row flex justify-between my-1">
          {new Date().toLocaleDateString()}
          <CalendarIcon />
        </span>
        <h3 className="my-1 border-b-2 pb-2">Quests</h3>
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
        <button type="button" onClick={addNewQuest} className="flex flex-row justify-between my-1 items-center">
          Add New Quest
          <AddNewItemIcon />
        </button>
        <button type="submit" className="flex flex-row justify-between my-1 items-center">
          Create New Event
          <ForwardIcon />
        </button>
      </form>
      <div className="flex flex-col ml-5">
        <h2>{submitedEvent?.event_name}</h2>
        <p>{submitedEvent?.event_description}</p>
        <span>
          {submitedEvent?.start_time && 'Start Date: ' + new Date(submitedEvent.start_time / 1000).toLocaleDateString()}
        </span>
        <span>
          {submitedEvent?.finish_time && 'End Date: ' + new Date(submitedEvent.finish_time / 1000).toLocaleDateString()}
        </span>
        {submitedEvent?.quests.map((quest: Quest, index: number) => (
          <div key={index} className="flex flex-col">
            <span>{quest.reward_title}</span>
            <span>{quest.reward_description}</span>
            <span>{quest.reward_url}</span>
            <span>{quest.qr_prefix}</span>
          </div>
        ))}
        <StartEventButton />
      </div>
    </div>
  );
};

export default NewEventForm;
