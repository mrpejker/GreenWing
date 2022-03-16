import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { EventAction, EventData, EventStats } from '../../models/Event';
import { getNearAccountAndContract } from '../../utils';
// Components
import EventActionsTable from './eventAcionsTable';
import EventCard from './eventCard';
import EventStatsTable from './eventStatsTable';

const EventsTable: React.FC = () => {
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const [eventStats, setEventStats] = useState<EventStats | undefined>();
  const [eventActions, setEventActions] = useState<EventAction[]>([]);
  const [eventData, setEventData] = useState<EventData | undefined>();

  useEffect(() => {
    const getEventsStats = async (): Promise<void> => {
      const { contract } = await getNearAccountAndContract(account_id);
      const actions = await contract.get_actions({ from_index: 0, limit: 100 });
      const stats = await contract.get_event_stats();
      const data = await contract.get_event_data();
      setEventData(data);
      setEventStats(stats);
      setEventActions(actions);
    };
    getEventsStats();
  }, [account_id]);

  return (
    <div className="flex-row flex flex-wrap ">
      <div className="flex-1 w-1/5 relative">{eventData !== undefined && <EventCard eventData={eventData} />}</div>

      <div className="flex-1 ml-4 w-4/5">
        <div className="block p-6 rounded-lg shadow-lg bg-white  mb-4">
          <EventStatsTable eventStats={eventStats} />
        </div>
        <div
          className="block p-6 rounded-lg shadow-lg bg-white  mb-4 w-full overflow-y-auto"
          style={{ maxHeight: 350, minHeight: 350 }}
        >
          <EventActionsTable eventActions={eventActions} eventData={eventData} />
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
