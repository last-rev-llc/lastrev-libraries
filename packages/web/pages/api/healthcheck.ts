import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

import { runAlgoliaStatusChecks } from '../../src/statusChecks/algolia';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET']
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const algoliaStatusChecks = await runAlgoliaStatusChecks();

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Accept', 'application/json');

  // Rest of the API logic
  res.json(algoliaStatusChecks);
}
