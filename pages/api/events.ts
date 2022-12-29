/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { getDocFromFirebase } from '../../utils/firebase';

const COLLECTION_NAME = 'non_individual_events';
const DOCUMENT_NAME = 'events';

/// Returns list of 'non-individual' events among first 100 ongoing events
/// Request example: http://localhost:3000/api/events
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create contract instance
    const { contract } = await getConnectedContract();

    // Get IDs of non-individual events
    const { ids }: any = await getDocFromFirebase(COLLECTION_NAME, DOCUMENT_NAME);

    // Fetch event data
    const events = await contract.get_ongoing_events({ from_index: 0, limit: 100 }); // must return events list
    const filteredEvents = events.filter((element: any) => ids.includes(element[0]));
    const filteredEventsList = filteredEvents.map((event: any) => ({
      eventid: event[0],
      eventName: event[1].event_name,
      isActive: true,
    }));
    res.status(200).json({ myList: filteredEventsList });
  } catch (err) {
    console.log(err);
    res.status(500).json(null);
  }
}
