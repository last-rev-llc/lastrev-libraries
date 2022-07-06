import * as React from 'react';
import Quote from './Quote';
import { mockQuoteOneColumn } from './Quote.mock';

describe('Quote', () => {
  it('renders a quote', () => {
    cy.mount(<Quote {...mockQuoteOneColumn()} />);
    cy.get('[data-testid=Quote]').should('exist');

    cy.percySnapshot();
  });
});
