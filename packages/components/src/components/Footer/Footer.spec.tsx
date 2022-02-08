import * as React from 'react';
import mount from '../../../cypress/mount';
import Footer, { FooterProps } from './Footer';
import mockContent from './Footer.mock';

let mockedContent: FooterProps = { sidekickLookup: {} };

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

const getSumReducer = (previous: number, current: number): number => previous + current;

describe('Footer', () => {
  context('renders correctly', () => {
    it('renders a Footer', () => {
      mount(<Footer {...mockedContent} />);
      cy.get('[data-testid=Footer-Logo] a').should('exist').and('have.attr', 'href', mockedContent.logoUrl);
      cy.get('[data-testid=Footer-Logo] img').should('exist').and('have.attr', 'src', mockedContent.media[0].file.url);
      
      cy.get('[data-testid=Footer-Links-Column]').should('have.length', mockedContent.navigationItems.length);
      cy.get('[data-testid=Footer-Actions-Item]').should('have.length', mockedContent.actions.length);
      
      // cy.percySnapshot();
    });
  });
});
