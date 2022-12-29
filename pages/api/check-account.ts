/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkNearAccount } from '../../utils/near';

/// Check that near id exists
/// http://localhost:3000/api/check-account?nearid=ilerik.testnet
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result = false;
  const { query }: any = req;
  const { nearid }: any = query;
  try {
    // Switch between MAINNET and TESTNET
    let result_m = false;
    const network_id = nearid.includes('.near') ? 'mainnet' : 'testnet';
    result_m = await checkNearAccount(nearid, network_id);
    result = result_m;
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
  res.status(200).json(result);
}
