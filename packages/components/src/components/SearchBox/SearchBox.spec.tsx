import * as React from 'react';
import mount from '../../../cypress/mount';
import SearchBox, { SearchBoxProps } from './SearchBox';
import SearchBoxMock from './SearchBox.mock';

describe('SearchBox', () => {
  it('renders a SearchBox', () => {
    const mockedContent: SearchBoxProps = { ...SearchBoxMock };
    mount(<SearchBox variant="home" {...mockedContent} />);
    cy.get('[data-testid=SearchBox]').should('exist');
    cy.get('[data-testid=Autocomplete]').should('exist');
    cy.get('[data-testid=SearchResultItem]').should('not.exist');
  });
});
