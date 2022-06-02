import * as React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import mount from '../../../cypress/mount';
import SearchBox, { SearchBoxProps } from './SearchBox';
import searchBoxMock from './SearchBox.mock';

const algoliaOptions = {
  appId: (process.env.ALGOLIA_APP_ID as string),
  searchApiKey: (process.env.ALGOLIA_SEARCH_API_KEY as string),
  sourceId: 'articles',
  indexName: 'articles',
};

const searchClient = algoliasearch(algoliaOptions.appId, algoliaOptions.searchApiKey);

describe('SearchBox', () => {
  it('renders a SearchBox', () => {
    const mockedContent: SearchBoxProps = { ...searchBoxMock };;
    mount(
      <InstantSearch
        searchClient={searchClient}
        indexName={algoliaOptions.indexName}
        searchState={{ query: 'technology' }}
      >
        <SearchBox {...mockedContent} />
      </InstantSearch>
    );
    cy.get('[data-testid=SearchBox]').should('exist');
  });
});
