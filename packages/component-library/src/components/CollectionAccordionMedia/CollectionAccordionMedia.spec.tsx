import * as React from 'react';
import mount from '../../../cypress/mount';
import CollectionAccordionMedia, { CollectionAccordionMediaProps } from './CollectionAccordionMedia';
import mockContent from './CollectionAccordionMedia.mock';

let mockedContent: CollectionAccordionMediaProps = { theme: {}, sidekickLookup: '', itemSpacing: 0 };

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('CollectionAccordionMedia', () => {
  context('renders correctly', () => {
    it('renders a collection of accordions', () => {
      mount(<CollectionAccordionMedia {...mockedContent} />);
      cy.get('[data-testid=CollectionAccordionMedia]').should('exist');
      cy.get('[data-testid=Accordion').should('have.length', mockedContent.items.length);
      cy.percySnapshot();
    });

    it('renders correct content', () => {
      mount(<CollectionAccordionMedia {...mockedContent} />);
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
      mount(<CollectionAccordionMedia {...mockedContent} />);
      cy.get('[data-testid=Accordion]').each((element, idx) => {
        cy.get('[data-testid=Accordion-body]').should('not.be.visible');

        cy.wrap(element).click();
        cy.get('[data-testid=Accordion-body]').should('be.visible');

        if (idx === 0) cy.percySnapshot();
        cy.wrap(element).click();
        cy.get('[data-testid=Accordion-body]').should('not.be.visible');
      });
    });
  });
});
