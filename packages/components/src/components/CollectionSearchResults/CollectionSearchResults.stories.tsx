import React from 'react';
import algoliasearch from 'algoliasearch';
import { Box } from '@mui/material';
import { InstantSearch } from 'react-instantsearch-dom';
import CollectionSearchResults from './CollectionSearchResults';

const algoliaOptions = {
  appId: (process.env.STORYBOOK_ALGOLIA_APP_ID as string),
  searchApiKey: (process.env.STORYBOOK_ALGOLIA_SEARCH_API_KEY as string),
  sourceId: 'articles',
  indexName: 'articles',
};

const searchClient = algoliasearch(algoliaOptions.appId, algoliaOptions.searchApiKey);

export default {
  title: 'Modules / Search / CollectionSearchResults',
  component: CollectionSearchResults,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={[1, 10]}>
        <InstantSearch
          searchClient={searchClient}
          indexName={algoliaOptions.indexName}
          searchState={{ query: 'technology' }}
        >
          {storyFn()}
        </InstantSearch>
      </Box>
    )
  ]
};

const Template = () => <CollectionSearchResults id={'testId01234'} />;

export const Default = Template.bind({});
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
