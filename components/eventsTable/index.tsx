import React, { useState, useEffect } from 'react';

import { EventAction, EventData, EventStats } from '../../models/Event';
import { getNearContract } from '../../utils';
import EventActionsTable from './eventAcionsTable';
import EventCard from './eventCard';
import EventStatsTable from './eventStatsTable';

const EventsTable: React.FC = () => {
  const [eventStats, setEventStats] = useState<EventStats | undefined>();
  const [eventActions, setEventActions] = useState<EventAction[]>([]);
  const [eventData, setEventData] = useState<EventData | undefined>();

  const getEventsStats = async () => {
    const { contract } = await getNearContract();
    const actions = await contract.get_actions({ from_index: 0, limit: 100 });
    const stats = await contract.get_event_stats();
    const data = await contract.get_event_data();
    console.log('data: ', data);
    setEventData(data);
    setEventStats(stats);
    setEventActions(actions);
  };

  useEffect(() => {
    getEventsStats();
  }, []);

  return (
    <div className="flex-row flex flex-wrap">
      <div className="flex-1">{eventData !== undefined && <EventCard eventData={eventData} />}</div>
      <div className="flex-1 ml-4">
        <div className="block p-6 rounded-lg shadow-lg bg-white  mb-4">
          <EventStatsTable eventStats={eventStats} />
        </div>
        <div className="block p-6 rounded-lg shadow-lg bg-white  mb-4 w-full">
          <EventActionsTable eventActions={eventActions} />
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
