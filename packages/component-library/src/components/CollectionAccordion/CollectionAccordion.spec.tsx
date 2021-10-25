import * as React from 'react';
import mount from '../../../cypress/mount';
import CollectionAccordion, { CollectionAccordionProps } from './CollectionAccordion';
import mockContent from './CollectionAccordion.mock';

let mockedContent: CollectionAccordionProps = { theme: {}, sidekickLookup: '', itemSpacing: 0 };

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('CollectionAccordion', () => {
  context('renders correctly', () => {
    it('renders a collection of accordions', () => {
      mount(<CollectionAccordion {...mockedContent} />);
      cy.get('[data-testid=CollectionAccordion]').should('exist');
      cy.get('[data-testid=Accordion').should('have.length', mockedContent.items.length);
      cy.percySnapshot();
    });

    it('renders correct content', () => {
      mount(<CollectionAccordion {...mockedContent} />);
      cy.get('[data-testid=Accordion-title]').each((element, index) => {
        cy.wrap(element).should('have.text', mockedContent.items[index].title);
      });
      cy.get('[data-testid=Accordion-body]>p').each((element, index) => {
        cy.wrap(element).should('have.text', mockedContent.items[index].body.json.content[0].content[0].value);
      });
      cy.percySnapshot();
    });
  });

  context('functions correctly', () => {
    it('accordions open and collapse correctly', () => {
      mount(<CollectionAccordion {...mockedContent} />);
      cy.get('[data-testid=Accordion]').each((element) => {
        cy.get('[data-testid=Accordion-body]').should('not.be.visible');
        cy.percySnapshot();

        cy.wrap(element).click();
        cy.get('[data-testid=Accordion-body]').should('be.visible');
        cy.percySnapshot();

        cy.wrap(element).click();
        cy.get('[data-testid=Accordion-body]').should('not.be.visible');
        cy.percySnapshot();
      });
    });
  });
});
