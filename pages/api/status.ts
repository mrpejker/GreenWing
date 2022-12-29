/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';

/// Returns quests number
/// Request examples:
/// http://localhost:3000/api/status?eventid='my_event'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('query: ', req.query);

    // Parse query
    let { eventid }: any = req.query;
    eventid = eventid.slice(1, -1); // trim quotes

    // Create contract instance
    const connection: any = await getConnectedContract();
    const { contract } = connection;

    // Fetch event data
    const event_data = await contract.get_event_data({ event_id: Number(eventid) });
    console.log({ event_data });

    // Response
    res.status(200).json(event_data.quests.length);
  } catch (err) {
    console.log(err);
    res.status(500).json(0);
  }
}
