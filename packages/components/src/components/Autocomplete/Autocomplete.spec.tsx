import * as React from 'react';
import mount from '../../../cypress/mount';
import Autocomplete from './Autocomplete';
import AutocompleteMock from './Autocomplete.mock';

describe('Autocomplete', () => {
  it('renders an autocomplete Algolia component', () => {
    mount(<Autocomplete {...AutocompleteMock} />);
    cy.get('[data-testid=Autocomplete]').should('exist');
  });
});
