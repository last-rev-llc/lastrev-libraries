import * as React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import CollectionSearchResults from './CollectionSearchResults';
import { collectionSearchResultsMock } from './CollectionSearchResults.mock';
import mount from '../../../cypress/mount';

const algoliaOptions = {
  appId: (process.env.ALGOLIA_APP_ID as string),
  searchApiKey: (process.env.ALGOLIA_SEARCH_API_KEY as string),
  sourceId: 'articles',
  indexName: 'articles',
};

const searchClient = algoliasearch(algoliaOptions.appId, algoliaOptions.searchApiKey);

describe('CollectionSearchResults', () => {
  it('renders a CollectionSearchResults', () => {
    const mockedContent = { ...collectionSearchResultsMock };
    mount(
      <InstantSearch
        searchClient={searchClient}
        indexName={algoliaOptions.indexName}
        searchState={{ query: 'technology' }}
      >
        <CollectionSearchResults {...mockedContent} />
      </InstantSearch>
    );
    cy.get('[data-testid=CollectionSearchResults]').should('exist');
    cy.get('[data-testid=CollectionSearchResults-introText]').should('exist');
  });
});
