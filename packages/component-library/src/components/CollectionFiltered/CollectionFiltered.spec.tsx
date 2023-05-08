import * as React from 'react';
import swrMount from '../../../cypress/swrMount';
import { routerProvider } from '../../../cypress/mountWithRouter';
import CollectionFiltered from './CollectionFiltered';
import { CollectionFilteredProps } from './CollectionFiltered.types';
import mockContent, { collectionFilteredMock, noOptionalPropsMock, allOptions } from './CollectionFiltered.mock';

const returnedItems = mockContent.items;
let mockedContent = { id: '' } as CollectionFilteredProps;

beforeEach(() => {
  mockedContent = { ...mockContent };
  mockedContent.fetchItems = () => Promise.resolve({ items: returnedItems, allOptions });
});

describe('CollectionFiltered', () => {
  context('renders correctly', () => {
    it('renders an CollectionFiltered with all options added', () => {
      swrMount(routerProvider(<CollectionFiltered {...mockedContent} />));
      cy.get('[data-testid=CollectionFiltered]').should('exist');
      cy.get('[data-testid=CollectionFiltered-LoadMoreButton]').should('have.text', mockContent.loadMoreText);
      cy.percySnapshot();
    });

    it('renders an CollectionFiltered with no options added', () => {
      mockedContent = { ...noOptionalPropsMock };
      swrMount(routerProvider(<CollectionFiltered {...mockedContent} />));
      cy.get('[data-testid=CollectionFiltered]').should('exist');
      cy.get('[data-testid=CollectionFiltered-LoadMoreButton]').should('have.text', 'LOAD MORE');
      cy.percySnapshot();
    });
  });

  context('functions correctly', () => {
    it('show Try Again button if item fetch returns error', () => {
      mockedContent = {
        ...collectionFilteredMock({}, () => {
          throw new Error();
        })
      };
      mockedContent.items = undefined;
      swrMount(routerProvider(<CollectionFiltered {...mockedContent} />));
      cy.get('[data-testid=CollectionFiltered-TryAgainButton]').should('have.text', 'TRY AGAIN');
    });

    it('loads more items when load more button is clicked', () => {
      swrMount(routerProvider(<CollectionFiltered {...mockedContent} />));
      cy.get('[data-testid=Section-ContentItem]').should('have.length', mockContent.items?.length);
      cy.get('[data-testid=CollectionFiltered-LoadMoreButton]').click();
      cy.get('[data-testid=Section-ContentItem]').should(
        'have.length',
        (mockedContent.items?.length || 0) + (returnedItems?.length || 0)
      );
    });

    it('it fetches items when select filter item is selected', () => {
      swrMount(routerProvider(<CollectionFiltered {...mockedContent} />));
      cy.get('[data-testid=Section-ContentItem]').should('have.length', mockedContent?.items?.length);
      // click select
      cy.get('[data-testid=CollectionFilters-select]').click();
      // click first option
      cy.get('.MuiPopover-paper ul li').first().click();

      // check values
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains(allOptions.topics[0].label);
      cy.get('[data-testid=Section-ContentItem]').should('have.length', returnedItems?.length || 0);
    });

    it('it fetches items when autocomplete filter item is selected', () => {
      swrMount(routerProvider(<CollectionFiltered {...mockedContent} />));
      cy.get('[data-testid=Section-ContentItem]').should('have.length', mockedContent.items?.length);
      // click autocomplete
      cy.get('[data-testid=CollectionFilters-autocomplete]').click();
      // click first option
      cy.get('.MuiAutocomplete-paper ul li').first().click();

      // check values
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains(allOptions?.tags[0]?.label);
      cy.get('[data-testid=Section-ContentItem]').should('have.length', returnedItems?.length || 0);
    });

    it('it fetches items when typing in the search box', () => {
      swrMount(routerProvider(<CollectionFiltered {...mockedContent} />));
      cy.get('[data-testid=Section-ContentItem]').should('have.length', mockedContent?.items?.length);
      // type in search
      cy.get('[data-testid=CollectionFilters-text]').type('test');

      // check values
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains('test');
      cy.get('[data-testid=Section-ContentItem]').should('have.length', returnedItems?.length || 0);
    });

    it('it clears select when clear button is clicked', () => {
      swrMount(routerProvider(<CollectionFiltered {...mockedContent} />));
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains('All');
      // click select
      cy.get('[data-testid=CollectionFilters-select]').click();
      // click first option
      cy.get('.MuiPopover-paper ul li').first().click();

      // check values
      cy.get('.MuiSelect-select').should('have.text', allOptions.topics[0].label);
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains(allOptions.topics[0].label);

      // click clear
      cy.get('[data-testid=CollectionFilters-clear]').click();

      // check values
      cy.get('.MuiSelect-select').should('have.value', '');
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains('All');
    });

    it('it clears autocomplete when clear button is clicked', () => {
      swrMount(routerProvider(<CollectionFiltered {...mockedContent} />));
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains('All');
      // click autocomplete
      cy.get('[data-testid=CollectionFilters-autocomplete]').click();
      // click first option
      cy.get('.MuiAutocomplete-paper ul li').first().click();

      // check values
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains(allOptions?.tags[0]?.label);

      // click clear
      cy.get('[data-testid=CollectionFilters-clear]').click();

      // check values
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains('All');
    });

    it('it clears search box when clear button is clicked', () => {
      swrMount(routerProvider(<CollectionFiltered {...mockedContent} />));
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains('All');
      // type in search
      cy.get(`[data-testid=CollectionFilters-text]`).type('test');

      // check values
      cy.get('[data-testid=CollectionFilters-text] div input').should('have.value', 'test');
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains('test');

      // click clear
      cy.get('[data-testid=CollectionFilters-clear]').click();

      // check values
      cy.get('[data-testid=CollectionFilters-text] div input').should('have.value', '');
      cy.get('[data-testid=CollectionFiltered-ResultsDisplay]').contains('All');
    });
  });
});
