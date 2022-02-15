/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { EventData } from '../../models/Event';
import { formatTimeStampToLocaleDateString } from '../../utils';
import StartEventButton from '../startEventButton';

interface EventCardProps {
  eventData: EventData | undefined;
  detailed?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ children, eventData, detailed }) => {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
          <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt="" />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{eventData?.event_name}</h5>
          {detailed &&
            eventData?.quests.map((quest, index) => (
              <div key={index} className="flex flex-col rounded-lg shadow-lg bg-white mb-2 p-10">
                <h3 className="font-bold">Quest #{index + 1}</h3>
                <img className="rounded mb-4" src={`/${index + 1}.png`} alt="" />
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
          <p className="text-gray-700 text-base mb-4">{eventData?.event_description}</p>
          <p className="text-gray-700 text-base mb-4">
            Start Time: {eventData?.start_time && formatTimeStampToLocaleDateString(eventData.start_time)}
          </p>
          <p className="text-gray-700 text-base mb-4">
            Finish Time: {eventData?.finish_time && formatTimeStampToLocaleDateString(eventData.finish_time)}
          </p>

          <StartEventButton />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
