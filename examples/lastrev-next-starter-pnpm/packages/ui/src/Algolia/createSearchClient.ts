'use client';
import algoliasearch, { type SearchClient } from 'algoliasearch';

const ALGOLIA_APPLICATION_ID = process.env.ALGOLIA_APPLICATION_ID as string;
const ALGOLIA_SEARCH_API_KEY = process.env.ALGOLIA_SEARCH_API_KEY as string;

export const createSearchClient = (): SearchClient => {
  const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY);
  return searchClient;
};
