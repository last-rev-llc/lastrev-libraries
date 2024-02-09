import * as React from 'react';
import { mount } from '@cypress/react18';

import Quote from './Quote';

import { quoteBaseMock } from './Quote.mock';

// TODO: Write tests
describe('Quote', () => {
  it('renders a quote', () => {
    mount(<Quote {...quoteBaseMock()} />);
    cy.get('[data-testid=Quote]').should('exist');

    //cy.percySnapshot();
  });
});
