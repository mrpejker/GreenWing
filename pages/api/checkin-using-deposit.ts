/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { mainContractMethodsNew, mainContractName } from '../../utils/contract-methods';
import { depositContractMethods, depositsContractName } from '../../utils/contract-methods';
import { checkNearAccount } from '../../utils/near';

/// Constants
// Owner of events payd for checkin this value from the deposit
const CHECKIN_FEE = BigInt('15000000000000000000000'); // 0.015 N

// Response in an error case
const errorResponse = (errorMessage: string) => ({
  index: -1,
  got: false,
  title: 'nothing',
  description: 'nothing',
  errorMessage: String(errorMessage),
});

/// Call checkin method of the contract managing events
/// Request example:
/// http://localhost:3000/api/checkin-using-deposit?eventid='3090415815'&nearid='ilerik.testnet'&qr='some_string'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Log query
    console.log('query: ', req.query);

    // Parse query
    let { eventid, nearid, qr }: any = req.query;
    nearid = nearid.slice(1, -1); // trim quotes
    eventid = eventid.slice(1, -1);
    qr = qr.slice(1, -1);

    // Switch between MAINNET and TESTNET
    const network_id = nearid.includes('.near') ? 'mainnet' : 'testnet';

    // Check that near id exists
    nearid = String(nearid).toLowerCase();
    const account_exists = await checkNearAccount(nearid, network_id);
    if (!account_exists) {
      // eslint-disable-next-line quotes
      res.status(500).json(errorResponse(`User ID isn't valid`));
      return;
    }

    // Create contract instances
    const event_contract: any = (await getConnectedContract(mainContractName, mainContractMethodsNew)).contract;
    const deposits_contract: any = (await getConnectedContract(depositsContractName, depositContractMethods)).contract;

    // Check that event is active
    const event_stats = await event_contract.get_event_stats({ event_id: Number(eventid) });
    const event_data = await event_contract.get_event_data({ event_id: Number(eventid) });
    if (Date.now() * 1000000 > event_data.finish_time) {
      res.status(500).json(errorResponse('Event has expired'));
      return;
    }
    if (event_stats.stopped_at) {
      res.status(500).json(errorResponse('Event is stopped'));
      return;
    }

    // Get deposit amount of event owner
    const event_owner = event_stats.created_by;
    const deposit_amount = await deposits_contract.get_deposit_amount({ account_id: event_owner });

    // Deposit amount must be greater or equal to checkin fee
    if (BigInt(deposit_amount) < CHECKIN_FEE) {
      res.status(500).json(errorResponse('Insufficient funds on deposit'));
      return;
    }

    // Decrease deposit by fee
    await deposits_contract.decrease_deposit({ account_id: event_owner, amount: CHECKIN_FEE.toString() });

    // Set appropriate gas and storage cost
    const gas_cost = 300000000000000;
    const minting_cost = '9000000000000000000000'; // 0.009 NEAR
    //const minting_cost = '25000000000000000000000'; // 0.025 NEAR - previous used amount

    // Call checkin
    const result = await event_contract
      .checkin({
        args: { event_id: Number(eventid), username: String(nearid), request: String(qr) },
        gas: gas_cost,
        amount: minting_cost,
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json(errorResponse(err));
        return;
      });
    console.log({ result });

    // Special case
    if (result === null) {
      res.json({
        index: -1,
        got: false,
        title: 'nothing',
        description: 'nothing',
      });
      return;
    }

    // Success
    const event = await event_contract.get_event_data({ event_id: Number(eventid) });
    result['eventName'] = event.event_name;
    result['hashtags'] = [' ']; // hide hashtag value for some time
    res.status(200).json(result);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ ...errorResponse(err), ...{ error: true } });
  }
}
