import React from 'react';
import { EventStats } from '../../models/Event';
import { formatTimeStampToLocaleDateString } from '../../utils';

interface EventStatsTableProps {
  eventStats: EventStats | undefined;
}

const EventStatsTable: React.FC<EventStatsTableProps> = ({ eventStats }) => {
  return (
    <table className="w-full">
      <thead className="bg-[#d9d9d9b0] text-black font-interBold text-[14px]">
        <tr>
          <th className="px-4 py-2 text-left hidden sm:table-cell">Created At</th>
          <th className="px-4 py-2 text-center hidden sm:table-cell">Stopped At</th>
          <th className="px-4 py-2 text-center">Total Actions</th>
          <th className="px-4 py-2 text-center">Total Certificates</th>
          <th className="px-4 py-2 text-center">Total Users</th>
        </tr>
      </thead>
      {eventStats && (
        <tbody className="text-[#3D3D3D]">
          <tr>
            <td className="text-sm px-4 py-2 whitespace-nowrap text-center hidden sm:table-cell">
              {eventStats.created_at && formatTimeStampToLocaleDateString(eventStats.created_at)}
            </td>
            <td className="text-sm px-4 py-2 whitespace-nowrap text-center hidden sm:table-cell">
              {eventStats.stopped_at && formatTimeStampToLocaleDateString(eventStats.stopped_at)}
            </td>

            <td className="text-center text-sm px-4 py-2 whitespace-nowrap">{eventStats.total_actions}</td>
            <td className="text-center text-sm px-4 py-2 whitespace-nowrap">{eventStats.total_rewards}</td>
            <td className="text-center text-sm px-4 py-2 whitespace-nowrap">{eventStats.total_users}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm ">
              <b>Participants:</b>
            </td>
            <td className="break-words text-sm px-4 py-2 whitespace-nowrap overflow-x-auto max-w-[100px] md:max-w-[300px]">
              {eventStats.participants && eventStats.participants.join(', ')}
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default EventStatsTable;
