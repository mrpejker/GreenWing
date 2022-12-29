/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import Claims from '../../features/claims';
import EventActionsTable from '../../features/events-details/eventAcionsTable';
import EventCard from '../../features/events-details/eventCard';
import EventStatsTable from '../../features/events-details/eventStatsTable';
import { getConnectedContract } from '../../utils/contract';
import { getDocFromFirebase } from '../../utils/firebase';

interface EventDetailedPageProps {
  event_id: number;
  actions: any;
  stats: any;
  data: any;
  isActive: any;
}

const EventDetailedPage: NextPage<EventDetailedPageProps> = ({ event_id, actions, stats, data, isActive }) => {
  const [claims, setClaims] = useState<any>([]);
  const { accountId } = useWalletSelector();
  const isOwnEvent = stats.created_by === accountId;

  useEffect(() => {
    const getEventsStats = async (): Promise<void> => {
      if (isOwnEvent) {
        const res: any = await getDocFromFirebase('claims', String(event_id));
        if (res) {
          setClaims(res.claimStrings);
        }
      }
    };
    getEventsStats();
  }, [accountId, event_id, isOwnEvent]);

  return (
    <>
      <div className="flex sm:justify-center sm:items-center sm:min-h-screen pt-[125px]">
        <div className="flex flex-col w-full max-w-[1240px] overflow-x-auto px-[20px]">
          <div className="flex w-full justify-center my-4 bg-white rounded-[40px]">
            <Loader is_load={!data}>
              {data && <EventCard eventData={data} isOwnEvent={isOwnEvent} event_id={event_id} isActive={isActive.}/>}
            </Loader>
          </div>

          <div className="flex flex-col w-full px-[20px] mb-4  py-[40px] overflow-x-auto bg-white rounded-[40px] justify-center">
            <div className="flex flex-col w-full max-w-[1080px] mx-auto">
              <Loader is_load={!stats}>
                {stats && (
                  <>
                    <h2 className="font-drukMedium uppercase text-black text-[30px] mb-[25px]">Event Stats</h2>
                    <EventStatsTable eventStats={stats} />
                  </>
                )}
              </Loader>
            </div>
          </div>

          {isOwnEvent && accountId && <Claims claims={claims} event_id={Number(event_id)} eventData={data} />}

          <div className="flex flex-col w-full px-[20px] py-[40px] mb-4 overflow-y-auto bg-white rounded-[40px]">
            <div className="flex flex-col w-full max-w-[1080px] mx-auto">
              <Loader is_load={!actions}>
                {actions && (
                  <>
                    <h2 className="font-drukMedium uppercase text-black text-[30px] mb-[25px]">Actions</h2>
                    <EventActionsTable isOwn={isOwnEvent} eventActions={actions.slice(0).reverse()} eventData={data} />
                  </>
                )}
              </Loader>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const event_id = query.slug;
  const { contract } = await getConnectedContract();
  const [actions, stats, data, activeEvents]: any = await Promise.all([
    contract.get_event_actions({ event_id: Number(event_id), from_index: 0, limit: 100 }),
    contract.get_event_stats({ event_id: Number(event_id) }),
    contract.get_event_data({ event_id: Number(event_id) }),
    contract.get_ongoing_events({ from_index: 0, limit: 150 }),
  ]);
  const isActive = activeEvents.find((element: any) => String(event_id) === String(element[0])) !== undefined;
  return {
    props: {
      event_id: Number(event_id),
      actions,
      stats,
      data,
      isActive,
    },
  };
};

export default EventDetailedPage;
