import type { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '../../cors';

import { runAlgoliaStatusChecks } from '../../src/statusChecks/algolia';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await cors(req, res);

  const algoliaStatusChecks = await runAlgoliaStatusChecks();

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Accept', 'application/json');

  // Rest of the API logic
  res.json(algoliaStatusChecks);
}
