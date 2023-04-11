require('dotenv').config();

import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { SearchResponse, Hit as AlgoliaHit } from '@algolia/client-search';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { DriftButton, DriftMessageNew } from '@ias/components/src/@types/drift';

const { ALGOLIA_APPLICATION_ID = '', ALGOLIA_SEARCH_API_KEY = '', ALGOLIA_INDEX_NAME = '' } = process.env;

const searchClient: SearchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY);
const algoliaIndex = searchClient.initIndex(ALGOLIA_INDEX_NAME);
const responses = {
  resultsFound: 'Here are some recommended articles, or type /s keyword to search again.',
  noResultsFound: 'No results were found. Please try again or visit our search page',
  error: 'An error occured. Please try again.'
};

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD']
});

// Helper method to wait for a middleware to execute before continuing
// And to return an error when an error happens in a middleware
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

interface CreateDriftMessageProps {
  conversationId: number;
  body: string;
  buttons?: (DriftButton | null)[];
}

type HitProps = AlgoliaHit<{
  path: string;
  title: string;
  locale: string;
}>;

const createDriftMessage = async ({ conversationId, body, buttons }: CreateDriftMessageProps) => {
  try {
    if (!conversationId) throw new Error('Invalid Conversation ID');

    const url = `https://driftapi.com/conversations/${conversationId}/messages`;

    const message: DriftMessageNew = {
      type: 'chat',
      body,
      buttons
    };

    await axios
      .post(url, message, {
        headers: {
          Authorization: `Bearer ${process.env.DRIFT_OAUTH_TOKEN}`
        }
      })
      .catch((e) => {
        return JSON.stringify(e);
      });
  } catch (error: any) {
    console.error(`Drift Webhook Error: ${error.message}`);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
  let responseMessage;
  let convoId;

  try {
    const {
      data: { conversationId, body },
      type,
      token,
      orgId
    } = req.body;

    const missingParams: string[] = [];
    if (!conversationId) missingParams.push('data > conversationId');
    if (!type) missingParams.push('data > type');
    if (!token) missingParams.push('data > token');
    if (!orgId) missingParams.push('data > orgId');
    if (!body) missingParams.push('data > body');

    convoId = conversationId;

    if (missingParams.length)
      throw new Error(`Request missing params ${missingParams.map((d) => `'${d}'`).join(',')} Results Found`);

    if (!body.startsWith('/s ') && !body.startsWith('/search ')) throw new Error('Wrong Command');

    const queryString: string = body.replace('/s ', '').replace('/search ', '');
    if (queryString.trim() === '') throw new Error('Malformed "body" request');

    const algoliaResults: SearchResponse<HitProps> = await algoliaIndex.search(queryString, {
      attributesToRetrieve: ['title', 'path', 'locale'],
      facetFilters: ['locale:en-US'],
      hitsPerPage: 3
    });

    if (!algoliaResults?.hits.length) {
      responseMessage = await createDriftMessage({
        conversationId: convoId,
        body: responses.noResultsFound
      });
      res.json({ data: responseMessage });
      res.end();
      return;
    }

    const buttons: (DriftButton | null)[] = algoliaResults?.hits
      .map((hit: HitProps) => {
        if (!(hit.path && hit.title)) return null;

        const button: DriftButton = {
          label: hit.title,
          value: hit.title
        };

        return button;
      })
      .filter(Boolean);

    if (buttons?.length) {
      responseMessage = await createDriftMessage({ conversationId, body: responses.resultsFound, buttons });
    } else {
      responseMessage = await createDriftMessage({
        conversationId,
        body: responses.noResultsFound
      });
    }
  } catch (error: any) {
    console.error(error);
    responseMessage = await createDriftMessage({ conversationId: convoId, body: responses.error });
  }

  res.json({ data: responseMessage });
  res.end();
}
