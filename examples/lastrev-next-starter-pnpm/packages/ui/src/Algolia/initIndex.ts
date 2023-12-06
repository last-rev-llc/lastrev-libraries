'use client';
import { type SearchClient, type SearchIndex } from 'algoliasearch';

type initIndexProps = {
  searchClient: SearchClient;
  index: string;
};

export const initIndex = ({ searchClient, index: indexName }: initIndexProps): SearchIndex => {
  const index = searchClient.initIndex(indexName);
  return index;
};
