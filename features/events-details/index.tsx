import React from 'react';
import { EventAction, EventData, EventStats } from '../../models/Event';
// Components
import EventActionsTable from './eventAcionsTable';
import EventCard from './eventCard';
import EventStatsTable from './eventStatsTable';

interface EventsTableProps {
  event_stats: EventStats | undefined;
  event_data: EventData | undefined;
  event_actions: EventAction[];
}

const EventsTable: React.FC<EventsTableProps> = ({ event_stats, event_data, event_actions }) => {
  return (
    <div className="flex-row flex flex-wrap container">
      <div className="md:flex-1 xl:w-1/5 sm:my-4 relative w-full">
        {event_data !== undefined && <EventCard eventData={event_data} />}
      </div>

      <div className="md:flex-1 xl:ml-4 xl:w-3/5 sm:my-4">
        <div className="flex p-6 rounded-lg shadow-lg bg-white  mb-4 overflow-x-auto">
          <EventStatsTable eventStats={event_stats} />
        </div>
        <div
          className="flex p-6 rounded-lg shadow-lg bg-white  mb-4 w-full overflow-x-auto overflow-y-auto"
          style={{ maxHeight: 350, minHeight: 350 }}
        >
          <EventActionsTable eventActions={event_actions.slice(0).reverse()} eventData={event_data} />
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
