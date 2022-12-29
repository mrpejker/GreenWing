/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';

/// It returns list of NFT reward URIs for the event `eventid` (if `nearid` is not defined)
/// or NFT rewards URIs for account `nearid`
/// Request examples:
/// http://localhost:3000/api/rewards?eventid='my_event'
/// http://localhost:3000/api/rewards?eventid='my_event'&nearid='ilerik.testnet'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('query: ', req.query);

    // Parse query
    let { eventid, nearid }: any = req.query;
    eventid = eventid.slice(1, -1); // trim quotes

    // Create contract instance
    const connection: any = await getConnectedContract();
    const { contract } = connection;

    // Fetch event data
    let result = [];
    const event_data = await contract.get_event_data({ event_id: Number(eventid) });
    console.log({ event_data });
    if (event_data !== null) {
      if (nearid !== undefined) {
        nearid = nearid.slice(1, -1);
        console.log({ nearid });
        const user_balance = await contract.get_user_balance({ event_id: Number(eventid), account_id: nearid });
        if (user_balance !== null) {
          const { quests_status } = user_balance;
          console.log({ quests_status });
          result = event_data.quests
            .filter((quest: any, index: number) => quests_status[index])
            .map((quest: any) => quest.reward_uri);
        }
      } else {
        result = event_data.quests.map((quest: any) => quest.reward_uri);
      }
    }
    console.log({ result });

    // Response
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
}
