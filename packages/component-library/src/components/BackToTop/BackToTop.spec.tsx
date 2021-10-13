import * as React from 'react';
import mount from '../../../cypress/mount';
import BackToTop from './BackToTop';
import mockContent from './BackToTop.mock';

describe('BackToTop', () => {
  it('renders a back-to-top button (bttb)', () => {
    mount(<BackToTop {...mockContent()} />);
    cy.get('[data-testid=BackToTop]').should('exist');
    cy.get('[data-testid=Accordion-title]').should('exist');
    cy.get('[data-testid=Accordion-body]').should('exist');
    cy.percySnapshot();
  });
});
