import React, { useState, useEffect } from 'react';

import { EventAction, EventData, EventStats } from '../../models/Event';
import { formatTimeStampToLocaleDateString, formatTimeStampToLocaleTimeString, getNearContract } from '../../utils';
import StartEventButton from '../startEventButton';

const EventsTable: React.FC = () => {
  const [eventStats, setEventStats] = useState<EventStats>();
  const [eventActions, setEventActions] = useState<EventAction[]>([]);
  const [eventData, setEventData] = useState<EventData>();

  const getEventsStats = async () => {
    const { contract } = await getNearContract();
    const actions = await contract.get_actions({ from_index: 0, limit: 100 });
    const stats = await contract.get_event_stats();
    const data = await contract.get_event_data();
    setEventData(data);
    setEventStats(stats);
    setEventActions(actions);
  };

  useEffect(() => {
    getEventsStats();
  }, []);

  return (
    <div className="flex-row flex flex-wrap justify-center">
      <div className="border-2 p-10 rounded-md">
        <h2 className="m-0 font-bold">{eventData?.event_name}</h2>
        <p>{eventData?.event_description}</p>

        {eventData?.quests.map((quest, index) => (
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
        <p className="mt-2">
          Start Time: {eventData?.start_time && formatTimeStampToLocaleDateString(eventData.start_time)}
        </p>
        <p className="mb-2">
          Finish Time: {eventData?.finish_time && formatTimeStampToLocaleDateString(eventData.finish_time)}
        </p>
        <div>
          <StartEventButton />
        </div>
      </div>
      <div>
        <table className="table-auto border-2 w-full rounded-md ml-2 text-center">
          <thead>
            <th className="py-4 border-b-2 px-2">finish_time</th>
            <th className="py-4 border-b-2 px-2">start_time</th>
            <th className="py-4 border-b-2 px-2">total_actions</th>
            <th className="py-4 border-b-2 px-2">total_rewards</th>
            <th className="py-4 border-b-2 px-2">total_users</th>
          </thead>
          {eventStats && (
            <tbody>
              <tr className="text-center">
                <td className="py-4 ">
                  {eventStats.finish_time !== null && formatTimeStampToLocaleDateString(eventStats.finish_time)}
                </td>
                <td className="py-4 ">
                  {eventStats.start_time !== null && formatTimeStampToLocaleDateString(eventStats.start_time)}
                </td>
                <td className="py-4 ">{eventStats.total_actions}</td>
                <td className="py-4 ">{eventStats.total_rewards}</td>
                <td className="py-4 ">{eventStats.total_users}</td>
              </tr>
              <tr className="border-t-2">
                <td className="py-4 ">
                  <b>participants:</b>
                </td>
                <td className="break-words py-4 pl-2 border-l-2">{eventStats.participants.join(' ')}</td>
              </tr>
            </tbody>
          )}
        </table>
        <table className="table-auto border-2 text-center rounded-md w-full mt-2 ml-2">
          <thead>
            <th className="py-4 border-2">username</th>
            <th className="py-4 border-2">qr_string</th>
            <th className="py-4 border-2">timestamp</th>
            <th className="py-4 border-2">reward_index</th>
          </thead>
          <tbody>
            {eventActions.map(({ username, qr_string, timestamp, reward_index }, index) => (
              <tr key={index} className="text-center hover:bg-gray-100 cursor-pointer">
                <td className="py-4">{username}</td>
                <td className="py-4">{qr_string}</td>
                <td className="py-4">
                  {formatTimeStampToLocaleDateString(timestamp) + ' ' + formatTimeStampToLocaleTimeString(timestamp)}
                </td>
                <td>{reward_index}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsTable;
