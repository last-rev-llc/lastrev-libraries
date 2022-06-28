import * as React from 'react';
import swrMount from '../../../cypress/swrMount';
import CollectionFiltered from './CollectionFiltered';
import { CollectionFilteredProps } from './CollectionFiltered.types';
import mockContent, {
  collectionFilteredMock,
  noOptionalPropsMock,
  allOptions,
  topicOptions
} from './CollectionFiltered.mock';

const returnedItems = mockContent.items;
let mockedContent = { id: '' } as CollectionFilteredProps;

beforeEach(() => {
  mockedContent = {
    ...collectionFilteredMock({}, () => Promise.resolve({ items: [], options: {}, allOptions: {} }))
  };
});

describe('CollectionFiltered', () => {
  context('functions correctly', () => {
    it('show Try Again button if item fetch returns error', () => {
      mockedContent = collectionFilteredMock({}, () => {
        throw new Error();
      });
      mockedContent.items = undefined;
      swrMount(<CollectionFiltered {...mockedContent} />);
      cy.get('[data-testid=CollectionFiltered-TryAgainButton]').should('have.text', 'TRY AGAIN');
    });

    it('loads more items when load more button is clicked', () => {
      mockedContent = { ...mockContent };
      mockedContent.fetchItems = () => Promise.resolve({ items: returnedItems });
      swrMount(<CollectionFiltered {...mockedContent} />);
      cy.get('[data-testid=Section-ContentItem]').should('have.length', mockContent.items?.length);
      cy.get('[data-testid=CollectionFiltered-LoadMoreButton]').click();
      cy.get('[data-testid=Section-ContentItem]').should(
        'have.length',
        (mockedContent.items?.length || 0) + (returnedItems?.length || 0)
      );
    });

    it('it fetches items when select filter item is selected', () => {
      mockedContent = { ...mockContent };
      mockedContent.fetchItems = () => Promise.resolve({ items: returnedItems, allOptions });
      swrMount(<CollectionFiltered {...mockedContent} />);
      cy.get('[data-testid=Section-ContentItem]').should('have.length', mockedContent?.items?.length);
      cy.get(`[data-testid=CollectionFilters-select]`).click();
      cy.get(`.MuiPopover-paper ul li`).first().click();
      console.log('test info => ', {
        itemsLength: mockedContent.items?.length,
        returnedItemsLength: returnedItems?.length
      });
      cy.get('[data-testid=Section-ContentItem]').should(
        'have.length',
        (mockedContent.items?.length || 0) + (returnedItems?.length || 0)
      );
    });

    //   it('it fetches items when autocomplete filter item is selected', () => {});

    //   it('it fetches items when typing in the search box', () => {});
  });

  context('renders correctly', () => {
    it('renders an CollectionFiltered with all options added', () => {
      mockedContent = { ...mockContent };
      swrMount(<CollectionFiltered {...mockedContent} />);
      cy.get('[data-testid=CollectionFiltered]').should('exist');
      cy.get('[data-testid=CollectionFiltered-LoadMoreButton]').should('have.text', mockContent.loadMoreText);
    });

    it('renders an CollectionFiltered with no options added', () => {
      mockedContent = { ...noOptionalPropsMock };
      swrMount(<CollectionFiltered {...mockedContent} />);
      cy.get('[data-testid=CollectionFiltered]').should('exist');
      cy.get('[data-testid=CollectionFiltered-LoadMoreButton]').should('have.text', 'LOAD MORE');
    });
  });
});
