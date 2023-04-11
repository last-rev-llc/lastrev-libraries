require('dotenv').config();

import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { SearchResponse, Hit as AlgoliaHit } from '@algolia/client-search';
import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const { ALGOLIA_APPLICATION_ID = '', ALGOLIA_SEARCH_API_KEY = '', ALGOLIA_INDEX_NAME = '' } = process.env;

const searchClient: SearchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY);
const algoliaIndex = searchClient.initIndex(ALGOLIA_INDEX_NAME);

type HitProps = AlgoliaHit<{
  path: string;
  title: string;
  locale: string;
}>;

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD']
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
  await runMiddleware(req, res, cors);

  try {
    const { query } = req.body;

    const algoliaResults: SearchResponse<HitProps> = await algoliaIndex.search(query, {
      attributesToRetrieve: ['path', 'title', 'locale'],
      restrictSearchableAttributes: ['title'],
      facetFilters: ['locale:en-US'],
      hitsPerPage: 1
    });

    if (!algoliaResults?.hits.length) {
      res.json({
        error: 'No Results Found'
      });
      res.end();
      return;
    }

    res.json(algoliaResults);
    res.end();
  } catch (error) {
    res.json({ error });
    res.end();
  }
}
