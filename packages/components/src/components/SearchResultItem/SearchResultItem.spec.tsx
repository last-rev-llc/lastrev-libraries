import * as React from 'react';
import mount from '../../../cypress/mount';
import SearchResultItem, { SearchResultItemProps } from './SearchResultItem';
import searchResultItemMock from './SearchResultItem.mock';

describe('SearchResultItem', () => {
  it('renders a SearchResultItem', () => {
    const mockedContent: SearchResultItemProps = { ...searchResultItemMock };
    mount(<SearchResultItem {...mockedContent} />);
    cy.get('[data-testid=SearchResultItem]').should('exist');
    cy.get('[data-testid=SearchResultItem-title]').should('exist');
    cy.get('[data-testid=SearchResultItem-content]').should('exist');
    searchResultItemMock.hit.categoryLinks.forEach((category, idx) => {
      cy.get(`[data-testid=SearchResultItem-category${idx}]`).should('exist');
    });
    // cy.percySpapshot();
  });
});
