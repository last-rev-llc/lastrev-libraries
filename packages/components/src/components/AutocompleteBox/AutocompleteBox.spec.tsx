import * as React from 'react';
import mount from '../../../cypress/mount';
import AutocompleteBox, { AutocompleteBoxProps } from './AutocompleteBox';
import autocompleteBoxMock from './AutocompleteBox.mock';

describe('AutocompleteBox', () => {
  it('renders a AutocompleteBox', () => {
    const mockedContent: AutocompleteBoxProps = { ...autocompleteBoxMock };
    mount(<AutocompleteBox {...mockedContent} />);
    cy.get('[data-testid=AutocompleteBox]').should('exist');
    cy.get('[data-testid=Autocomplete]').should('exist');
    cy.get('[data-testid=SearchResultItem]').should('not.exist');
  });
});
