import React from 'react';
import { formatTimeStampToLocaleDateString } from '../../utils';

interface EventTableProps {
  rowCallback: (e: React.MouseEvent<HTMLElement>) => void;
  events: any[];
}

const EventTable: React.FC<EventTableProps> = ({ rowCallback, events }) => {
  return (
    <table>
      <thead className="bg-[#d9d9d9b0] text-black">
        <tr>
          <th className=" text-sm font-interBold px-4 py-2">Event Title</th>
          <th className=" text-sm font-interBold px-4 py-2 hidden sm:table-cell">Quests</th>
          <th className=" text-sm font-interBold px-4 py-2 hidden sm:table-cell">Users</th>
          <th className=" text-sm font-interBold px-4 py-2 hidden sm:table-cell">Start Time</th>
          <th className=" text-sm font-interBold px-4 py-2 ">End Time</th>
        </tr>
      </thead>
      <tbody>
        <>
          {events.map((event: any, index: number) => (
            <tr
              key={index}
              id={event[0]}
              onClick={rowCallback}
              className="cursor-pointer hover:bg-[#cbd5e173] text-black transition-colors ease-in"
            >
              <td className="px-4 py-2">{event[1].event_name}</td>
              <td className="px-4 py-2 text-center hidden sm:table-cell">{event[1].quests.length}</td>
              <td className="px-4 py-2 text-center hidden sm:table-cell">{event[2].total_users}</td>
              <td className="px-4 py-2 text-center hidden sm:table-cell">
                {formatTimeStampToLocaleDateString(event[1].start_time)}
              </td>
              <td className="px-4 py-2 text-center">{formatTimeStampToLocaleDateString(event[1].finish_time)}</td>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};

export default EventTable;
