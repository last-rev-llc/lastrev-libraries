'use client';
import React, { type ReactNode } from 'react';

import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { Configure } from 'react-instantsearch';

import { createSearchClient } from './createSearchClient';

const searchClient = createSearchClient();

type AlgoliaSearch = {
  children: any;
  indexName: string;
};

export const AlgoliaSearch = ({ children, indexName }: AlgoliaSearch) => {
  return (
    <InstantSearchNext searchClient={searchClient} indexName={indexName}>
      <Configure filters={`locale:"en-US"`} />
      {children}
    </InstantSearchNext>
  );
};

export default AlgoliaSearch;
