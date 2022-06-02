import * as React from 'react';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch
} from 'react-instantsearch-dom';
import CollectionSearchFilters from './CollectionSearchFilters';
import { collectionSearchFiltersMock } from './CollectionSearchFilters.mock';
import mount from '../../../cypress/mount';

const algoliaOptions = {
  appId: (process.env.ALGOLIA_APP_ID as string),
  searchApiKey: (process.env.ALGOLIA_SEARCH_API_KEY as string),
  sourceId: 'articles',
  indexName: 'articles',
};

const searchClient = algoliasearch(algoliaOptions.appId, algoliaOptions.searchApiKey);

describe('CollectionSearchFilters', () => {
  context('renders correctly', () => {
    it('renders a CollectionSearchFilters component', () => {
      const mockedContent = { ...collectionSearchFiltersMock };
      mount(
        <InstantSearch
          searchClient={searchClient}
          indexName={algoliaOptions.indexName}
          searchState={{ query: 'technology' }}
        >
          <CollectionSearchFilters {...mockedContent} />
        </InstantSearch>
      );
      cy.get('[data-testid=CollectionSearchFilters]').should('exist');
      cy.get('[data-testid=CollectionSearchFilters-introText]').should('exist');
    });
  });
});
