import * as React from 'react';
import mount from '../../../cypress/mount';
import Accordion from './Accordion';
import mockContent from './Accordion.mock';

describe('Accordion', () => {
  context('renders correctly', () => {
    it('renders an accordion', () => {
      mount(<Accordion {...mockContent} />);
      cy.get('[data-testid=Accordion]').should('exist');
      cy.get('[data-testid=Accordion-title]').should('exist');
      cy.get('[data-testid=Accordion-body]').should('exist');
      cy.percySnapshot();
    });

    it('renders an accordion with no title', () => {
      mount(<Accordion {...mockContent} title={undefined} />);
      cy.get('[data-testid=Accordion]').should('exist');
      cy.get('[data-testid=Accordion-title]').should('exist');
      cy.get('[data-testid=Accordion-title]').should('be.empty');
      cy.get('[data-testid=Accordion-body]').should('exist');
      cy.percySnapshot();
    });

    it('renders an accordion with no body', () => {
      mount(<Accordion {...mockContent} body={undefined} />);
      cy.get('[data-testid=Accordion]').should('exist');
      cy.get('[data-testid=Accordion-title]').should('exist');
      cy.get('[data-testid=Accordion-body]').should('not.exist');
      cy.percySnapshot();
    });

    it('renders an accordion with no body and no title', () => {
      mount(<Accordion {...mockContent} title={undefined} body={undefined} />);
      cy.get('[data-testid=Accordion]').should('exist');
      cy.get('[data-testid=Accordion-title]').should('exist');
      cy.get('[data-testid=Accordion-title]').should('be.empty');
      cy.get('[data-testid=Accordion-body]').should('not.exist');
      cy.percySnapshot();
    });
  });

  context('functions correctly', () => {
    it('accordion opens and collapses', () => {
      mount(<Accordion {...mockContent} />);
      cy.get('[role=button]').click();
      cy.get('[data-testid=Accordion-body]').should('be.visible');
      cy.percySnapshot();

      cy.get('[role=button]').click();
      cy.get('[data-testid=Accordion-body]').should('not.be.visible');
      cy.percySnapshot();
    });

    it("accordion doesn't open when there isn't a body", () => {
      mount(<Accordion {...mockContent} body={undefined} />);
      cy.get('[data-testid=Accordion-body]').should('not.exist');
      cy.percySnapshot();

      cy.get('[role=button]').click();
      cy.get('[data-testid=Accordion-body]').should('not.exist');
      cy.percySnapshot();
    });

    it('accordion opens and collapses with no title', () => {
      mount(<Accordion {...mockContent} title={undefined} />);
      cy.get('[data-testid=Accordion-title]').should('exist');
      cy.get('[data-testid=Accordion-title]').should('be.empty');
      cy.get('[data-testid=Accordion-body]').should('not.be.visible');
      cy.percySnapshot();

      cy.get('[role=button]').click();
      cy.get('[data-testid=Accordion-body]').should('be.visible');
      cy.percySnapshot();

      cy.get('[role=button]').click();
      cy.get('[data-testid=Accordion-body]').should('not.be.visible');
    });
  });
});
