import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import { Box } from '@mui/material';
import SearchBox, { SearchBoxProps } from './SearchBox';
import searchBoxMock from './SearchBox.mock';

const algoliaOptions = {
  appId: process.env.STORYBOOK_ALGOLIA_APP_ID as string,
  searchApiKey: process.env.STORYBOOK_ALGOLIA_SEARCH_API_KEY as string,
  sourceId: 'articles',
  indexName: 'articles'
};

const searchClient = algoliasearch(algoliaOptions.appId, algoliaOptions.searchApiKey);

export default {
  title: 'Modules / Search / SearchBox',
  component: SearchBox,
  argTypes: {
    settings: { name: 'Settings' }
  },
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={[1, 10]} bgcolor="midnight.A100">
        <InstantSearch searchClient={searchClient} indexName={algoliaOptions.indexName}>
          {storyFn()}
        </InstantSearch>
      </Box>
    )
  ]
};

const Template = (args: SearchBoxProps) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = { ...searchBoxMock };
