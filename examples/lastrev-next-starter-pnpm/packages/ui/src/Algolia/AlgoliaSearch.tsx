'use client';
import React from 'react';

import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { Configure } from 'react-instantsearch';

import { createSearchClient } from './createSearchClient';

const searchClient = createSearchClient();

type AlgoliaSearch = {
  children: any;
  indexName: string;
  preFilter?: any;
};

// const forceState = {
//   query: 'viewability',
//   configure: {
//     filters: 'locale:"en-US"'
//   },
//   hierarchicalMenu: {
//     'categories.level-1': ['Advertiser + Agency Solutions']
//   }
// };

export const AlgoliaSearch = ({ children, indexName, preFilter }: AlgoliaSearch) => {
  console.log({ preFilter });
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName={indexName}
      initialUiState={{
        [indexName]: {
          ...preFilter
        }
      }}
      // defaultUiState={{
      //   [indexName]: {
      //     ...forceState
      //   }
      // }}
      // onStateChange={({ uiState, setUiState }) => {
      //   console.log(uiState);
      //   //   const categories = uiState[indexName].refinementList?.categories || [];
      //   // const [lastSelectedCategory] = categories.slice(-1);

      //   setUiState({
      //     ...uiState
      //     // [indexName]: {
      //     //   ...uiState[indexName],
      //     //   refinementList: {
      //     //     ...uiState[indexName].refinementList,
      //     //     categories: categories.filter((category) => (lastSelectedCategory === 'All' ? false : category !== 'All'))
      //     //   }
      //     // }
      //   });
      // }}>
    >
      <Configure filters={`locale:"en-US"`} />
      {/* query={forceState.query} filters={`locale:"en-US"`} */}
      {children}
    </InstantSearchNext>
  );
};

export default AlgoliaSearch;
