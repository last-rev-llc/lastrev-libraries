'use client';
import algoliasearch, { type SearchClient } from 'algoliasearch';

export const createSearchClient = (): SearchClient => {
  const searchClient = algoliasearch('MH24U6G8TO', '58cc0b4fc97965049b8b4ec7ca5c5ce9');
  return searchClient;
};
