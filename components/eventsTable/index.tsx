import React, { useState, useEffect } from 'react';

import { EventAction, EventData, EventStats } from '../../models/Event';
import { getNearContract } from '../../utils';

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
    <>
      <h1>{eventData?.event_name}</h1>
      <p>{eventData?.event_description}</p>
      {eventData?.quests.map((quest, index) => (
        <div key={index} className="flex flex-col">
          <span>{quest.reward_title}</span>
          <span>{quest.reward_description}</span>
          <span>{quest.reward_url}</span>
          <span>{quest.qr_prefix}</span>
        </div>
      ))}
      <p>Start Time: {eventData?.start_time}</p>
      <p>Finish Time: {eventData?.finish_time}</p>
      <table className="table-auto w-full">
        <thead>
          <th>finish_time</th>
          <th>participants</th>
          <th>start_time</th>
          <th>total_actions</th>
          <th>total_rewards</th>
          <th>total_users</th>
        </thead>
        <tbody>
          {eventStats && (
            <tr className="text-center">
              <td>{eventStats.finish_time}</td>
              <td>{eventStats.participants.join(' ')}</td>
              <td>{eventStats.start_time}</td>
              <td>{eventStats.total_actions}</td>
              <td>{eventStats.total_rewards}</td>
              <td>{eventStats.total_users}</td>
            </tr>
          )}
        </tbody>
      </table>
      <table className="table-auto w-full">
        <thead>
          <th>username</th>
          <th>qr_string</th>
          <th>timestamp</th>
          <th>reward_index</th>
        </thead>
        <tbody>
          {eventActions.map(({ username, qr_string, timestamp, reward_index }, index) => (
            <tr key={index} className="text-center">
              <td>{username}</td>
              <td>{qr_string}</td>
              <td>
                {new Date(timestamp / 1000).toLocaleDateString() +
                  ' ' +
                  new Date(timestamp / 1000).toLocaleTimeString()}
              </td>
              <td>{reward_index}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EventsTable;
