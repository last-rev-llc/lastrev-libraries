import * as React from 'react';
import mount from '../../../cypress/mount';
import CollectionFiltered from './CollectionFiltered';
import mockContent, { collectionFilteredMock, noOptionalPropsMock, allOptions } from './CollectionFiltered.mock';

const returnedItems = mockContent.items;

describe('CollectionFiltered', () => {
  context('renders correctly', () => {
    it('renders an CollectionFiltered with all options added', () => {
      mount(<CollectionFiltered {...mockContent} />);
      cy.get('[data-testid=CollectionFiltered]').should('exist');
      cy.get('[data-testid=CollectionFiltered-LoadMoreButton]').should('have.text', mockContent.loadMoreText);
    });

    it('renders an CollectionFiltered with no options added', () => {
      mount(<CollectionFiltered {...noOptionalPropsMock} />);
      cy.get('[data-testid=CollectionFiltered]').should('exist');
      cy.get('[data-testid=CollectionFiltered-LoadMoreButton]').should('have.text', 'LOAD MORE');
    });
  });

  context('functions correctly', () => {
    // it('show Try Again button if item fetch returns error', () => {
    //   // @ts-ignore
    //   const mockedContent = collectionFilteredMock({}, () => new Error());
    //   mockedContent.items = null;
    //   mount(<CollectionFiltered {...mockedContent} />);
    //   cy.get('[data-testid=CollectionFiltered-TryAgainButton]').should('have.text', 'TRY AGAIN');
    // });

    it('loads more items when load more button is clicked', () => {
      mockContent.fetchItems = () => Promise.resolve({ items: returnedItems });
      mount(<CollectionFiltered {...mockContent} />);
      cy.get('[data-testid=Section-ContentItem]').should('have.length', mockContent.items.length);
      cy.get('[data-testid=CollectionFiltered-LoadMoreButton]').click();
      cy.get('[data-testid=Section-ContentItem]').should('have.length', mockContent.items.length + returnedItems.length);
    });

    it('it fetches items when select filter item is selected', () => {
      // mockContent.fetchItems = () => Promise.resolve({ items: returnedItems, allOptions });
      // mount(<CollectionFiltered {...mockContent} />);
      // cy.get('[data-testid=Section-ContentItem]').should('have.length', mockContent.items.length);
      // cy.get('[data-testid=CollectionFilters-select]').select(allOptions.topics[0].value);
      // cy.get('[data-testid=Section-ContentItem]').should('have.length', mockContent.items.length + returnedItems.length);
    });

    it('it fetches items when autocomplete filter item is selected', () => {
      
    });

    it('it fetches items when typing in the search box', () => {
      
    });
  });
});
