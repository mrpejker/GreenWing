import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fetchMeta from 'fetch-meta-tags';

/// Returns event data
/// Request example: http://localhost:3000/api/event?eventid='my_event'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { link } = req.query;
    const result = await fetchMeta(link);
    res.status(200).json(result);
  } catch (err) {
    res.status(200).json({ error: true });
  }
}
