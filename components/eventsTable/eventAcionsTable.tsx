import React from 'react';
import { EventAction } from '../../models/Event';
import { formatTimeStampToLocaleDateString, formatTimeStampToLocaleTimeString } from '../../utils';

interface EventActionsTableProps {
  eventActions: EventAction[];
}

const EventActionsTable: React.FC<EventActionsTableProps> = ({ eventActions }) => {
  return (
    <table className="min-w-full text-center">
      <thead className="border-b bg-gray-800">
        <tr>
          <th className="text-sm font-medium text-white px-6 py-4">username</th>
          <th className="text-sm font-medium text-white px-6 py-4">qr_string</th>
          <th className="text-sm font-medium text-white px-6 py-4">timestamp</th>
          <th className="text-sm font-medium text-white px-6 py-4">reward_index</th>
        </tr>
      </thead>
      <tbody>
        {eventActions.map(({ username, qr_string, timestamp, reward_index }, index) => (
          <tr key={index} className="bg-white border-b hover:bg-gray-100 cursor-pointer">
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{username}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{qr_string}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {formatTimeStampToLocaleDateString(timestamp) + ' ' + formatTimeStampToLocaleTimeString(timestamp)}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{reward_index}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventActionsTable;
