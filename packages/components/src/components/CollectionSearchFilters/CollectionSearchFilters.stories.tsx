import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import { Box } from '@mui/material';

import CollectionSearchFilters from './CollectionSearchFilters';

const algoliaOptions = {
  appId: process.env.STORYBOOK_ALGOLIA_APP_ID as string,
  searchApiKey: process.env.STORYBOOK_ALGOLIA_SEARCH_API_KEY as string,
  sourceId: 'articles',
  indexName: 'articles'
};

const searchClient = algoliasearch(algoliaOptions.appId, algoliaOptions.searchApiKey);

export default {
  title: 'Modules / Search / CollectionSearchFilters',
  component: CollectionSearchFilters,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={3}>
        <InstantSearch
          searchClient={searchClient}
          indexName={algoliaOptions.indexName}
          searchState={{ query: 'technology' }}>
          {storyFn()}
        </InstantSearch>
      </Box>
    )
  ]
};

const Template = (args: any) => <CollectionSearchFilters {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  controls: { hideNoControlsWarning: true }
};
