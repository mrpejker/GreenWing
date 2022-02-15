import React from 'react';
import { EventStats } from '../../models/Event';
import { formatTimeStampToLocaleDateString } from '../../utils';

interface EventStatsTableProps {
  eventStats: EventStats | undefined;
}

const EventStatsTable: React.FC<EventStatsTableProps> = ({ eventStats }) => {
  return (
    <table className="min-w-full">
      <thead className="bg-white border-b">
        <tr>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">finish_time</th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">start_time</th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">total_actions</th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">total_rewards</th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">total_users</th>
        </tr>
      </thead>
      {eventStats && (
        <tbody>
          <tr className="bg-gray-100 border-b">
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {eventStats.finish_time !== null && formatTimeStampToLocaleDateString(eventStats.finish_time)}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {eventStats.start_time !== null && formatTimeStampToLocaleDateString(eventStats.start_time)}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{eventStats.total_actions}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{eventStats.total_rewards}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{eventStats.total_users}</td>
          </tr>
          <tr className="bg-gray-100 border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <b>participants:</b>
            </td>
            <td className="break-words text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {eventStats.participants.join(' ')}
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default EventStatsTable;
