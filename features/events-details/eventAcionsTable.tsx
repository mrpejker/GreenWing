/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { EventAction, EventData } from '../../models/Event';
import { formatTimeStampToLocaleDateString, formatTimeStampToLocaleTimeString } from '../../utils';

interface EventActionsTableProps {
  eventActions: EventAction[];
  eventData: EventData | undefined;
  isOwn?: boolean;
}

const EventActionsTable: React.FC<EventActionsTableProps> = ({ eventActions, eventData, isOwn }) => {
  return (
    <table className="min-w-full text-center">
      <thead className="bg-[#d9d9d9b0] text-black font-interBold text-[14px]">
        <tr>
          <th className="text-sm px-4 py-[5px]">User</th>
          {isOwn && <th className="text-sm px-4 py-[5px] hidden sm:table-cell">QR</th>}
          <th className="text-sm px-4 py-[5px]">Date</th>
          <th className="text-sm px-4 py-[5px] hidden sm:table-cell">Certificate</th>
        </tr>
      </thead>
      <tbody>
        {eventActions.map(({ username, qr_string, timestamp, reward_index }, index) => (
          <tr
            key={index}
            className="text-[#3D3D3D] hover:text-black hover:bg-[#cbd5e173] transition-colors ease-in cursor-pointer"
          >
            <td className="text-sm px-4 py-2 whitespace-nowrap">{username}</td>
            {isOwn && (
              <td className="text-sm px-4 py-2 whitespace-nowrap overflow-x-auto max-w-[300px] hidden sm:table-cell">
                {qr_string}
              </td>
            )}
            <td className="text-sm px-4 py-2 whitespace-nowrap">
              {formatTimeStampToLocaleDateString(timestamp) + ' ' + formatTimeStampToLocaleTimeString(timestamp)}
            </td>
            <td className="text-sm px-4 py-2 whitespace-nowrap align-middle text-center hidden sm:table-cell">
              {eventData?.quests[reward_index] ? (
                <img
                  src={`${eventData?.quests[reward_index].reward_uri}`}
                  alt="reward"
                  width={50}
                  height={50}
                  className="mx-auto"
                />
              ) : (
                <div style={{ width: 50, height: 50 }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventActionsTable;
