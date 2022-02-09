import * as React from 'react';
import mount from '../../../cypress/mount';
import CollectionFiltered from './CollectionFiltered';
import mockContent, { noOptionalPropsMock } from './CollectionFiltered.mock';

describe('CollectionFiltered', () => {
  context('renders correctly', () => {
    it('renders an CollectionFiltered with all options added', () => {
      mount(<CollectionFiltered {...mockContent} />);
      cy.get('[data-testid=CollectionFiltered]').should('exist');
    });

    it('renders an CollectionFiltered with no options added', () => {
      mount(<CollectionFiltered {...noOptionalPropsMock} />);
      cy.get('[data-testid=CollectionFiltered]').should('exist');
    });
  });
});
