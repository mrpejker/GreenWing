/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader';
import NotAuthorizedBlock from '../../components/not-authorized';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import EventTable from '../../features/dashboard/event-table';
import { getConnectedContract } from '../../utils/contract';

interface EventsDashboardProps {
  ongoingEvents: any;
}

const EventsDashboardPage: NextPage<EventsDashboardProps> = ({ ongoingEvents }) => {
  const router = useRouter();
  const [userPastEvents, setUserPastEvents] = useState<any[]>([]);
  const [userOngoingEvents, setUserOngoingEvents] = useState<any[]>([]);
  const { accountId } = useWalletSelector();

  useEffect(() => {
    const getEventsStats = async (): Promise<void> => {
      if (accountId) {
        const { contract } = await getConnectedContract();
        const userEvents = await contract.get_ongoing_user_events({ account_id: String(accountId) });
        if (userEvents) {
          // Filtering ongoing user events
          const ongoingUserEvents = userEvents.filter(
            (event: any) => new Date().getTime() * 1000000 < event[1].finish_time
          );
          // Filtering past user events
          const pastUserEvents = userEvents.filter(
            (event: any) => new Date().getTime() * 1000000 > event[1].finish_time
          );
          setUserOngoingEvents(ongoingUserEvents);
          setUserPastEvents(pastUserEvents);
        }
      }
    };
    getEventsStats();
  }, [accountId]);

  const navigateToEvent = (e: React.MouseEvent<HTMLElement>) => {
    router.push('/event/' + e.currentTarget.id);
  };

  const navigateToNewEventForm = () => {
    router.push('/add');
  };
  return (
    <div className="flex flex-col sm:justify-center sm:items-center sm:min-h-screen overflow-x-auto">
      <div className="flex flex-col w-full px-[20px] py-[40px] max-w-[1240px] mt-[120px] rounded-[40px] bg-white items-center justify-center mb-[40px]">
        <div className="flex flex-col p-6 pb-10 flex-wrap max-w-[1080px] w-full mb-4 text-[#D9D9D9] overflow-x-auto">
          <h2 className="font-drukBold text-black uppercase mt-0 mb-4 text-[30px]">Active Certificte Collections </h2>
          <Loader is_load={ongoingEvents.length === 0}>
            <EventTable rowCallback={navigateToEvent} events={ongoingEvents} />
          </Loader>
          {accountId &&
            (!userOngoingEvents ||
              (userOngoingEvents.length === 0 && (
                <div className="text-center mt-8">
                  <p className="text-[#3D3D3D]">It seems, you don&apos;t have any active collections yet</p>
                  <button
                    type="button"
                    className="mt-4 text-[16px] font-inter px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    onClick={navigateToNewEventForm}
                  >
                    Add New Event
                  </button>
                </div>
              )))}{' '}
          {!accountId && (
            <div className="mt-8">
              <NotAuthorizedBlock />
            </div>
          )}
        </div>

        {accountId && userOngoingEvents && userOngoingEvents.length > 0 && (
          <div className="flex flex-col flex-wrap p-6 pb-10 max-w-[1080px] mb-4 text-[#D9D9D9] overflow-x-auto bg-white w-full rounded-xl ">
            <h2 className="font-drukBold text-black uppercase mt-0 mb-[25px] text-[30px]">Your Active Collections</h2>
            <Loader is_load={userOngoingEvents.length === 0}>
              <EventTable rowCallback={navigateToEvent} events={userOngoingEvents} />
            </Loader>
          </div>
        )}

        {accountId && userPastEvents && userPastEvents.length > 0 && (
          <div className="flex flex-col flex-wrap p-6 pb-10 max-w-[1080px] mb-4 text-[#D9D9D9] overflow-x-auto bg-white w-full rounded-xl ">
            <h2 className="font-drukBold text-black uppercase mt-0 mb-[25px] text-[30px]">Your Past Events</h2>
            <Loader is_load={userPastEvents.length === 0}>
              <EventTable rowCallback={navigateToEvent} events={userPastEvents} />
            </Loader>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { contract } = await getConnectedContract();
  const ongoingEvents = await contract.get_ongoing_events({ from_index: 0, limit: 100 });
  return {
    props: {
      ongoingEvents,
    },
  };
};

export default EventsDashboardPage;
