import type { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '../../cors';
// import fixServices from '../../src/statusChecks/fixServices';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await cors(req, res);

  // const statusAfterFix = await fixServices();

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Accept', 'application/json');

  res.json({
    // status: statusAfterFix,
    status: 'not-implemented',
    timestamp: Date.now()
  });
}
