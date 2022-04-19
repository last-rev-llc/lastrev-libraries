import * as React from 'react';
import mount from '../../../cypress/mount';
import Quote from './Quote';
import { mockQuoteOneColumn } from './Quote.mock';

describe('Quote', () => {
  it('renders a quote', () => {
    mount(<Quote {...mockQuoteOneColumn()} />);
    cy.get('[data-testid=Quote]').should('exist');

    cy.percySnapshot();
  });
});
