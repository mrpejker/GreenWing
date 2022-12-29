/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';

/// Returns first 100 events
/// Request example: http://localhost:3000/api/ongoing-events
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('query: ', req.query);

    // Create contract instance
    const connection: any = await getConnectedContract();
    const { contract } = connection;

    // Fetch event data
    const events = await contract.get_ongoing_events({ from_index: 0, limit: 100 }); // must return events list
    const eventsList = events.map((event: any) => ({
      eventid: event[0],
      eventName: event[1].event_name,
      isActive: true,
    }));
    console.log({ eventsList });

    res.status(200).json({ myList: eventsList });
  } catch (err) {
    console.log(err);
    res.status(500).json(null);
  }
}
