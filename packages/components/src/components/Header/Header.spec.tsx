import * as React from 'react';
import mount from '../../../cypress/mount';
import Header, { HeaderProps } from './Header';
import mockContent from './Header.mock';

let mockedContent: HeaderProps = { sidekickLookup: {} };

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

const getSumReducer = (previous: number, current: number): number => previous + current;

describe('Header', () => {
  context('renders correctly', () => {
    it('renders a header', () => {
      mount(<Header {...mockedContent} />);
      cy.get('[data-testid=Header-Logo-Button]').should('exist').and('have.attr', 'href', mockedContent.logoUrl);
      cy.get('[data-testid=Header-Logo-Button] img').should('exist').and('have.attr', 'src', mockedContent.logo.file.url);
      
      cy.get('[data-testid=Header-LeftNav]').should('have.length', mockedContent.leftNav.length);
      //cy.get('[data-testid=Header-RightNav-Desktop]').should('have.length', mockedContent.rightNav.length);
      cy.get('[data-testid=Header-Actions-Desktop]').should('have.length', mockedContent.actions.length);

      //cy.get('[data-testid=Header-RightNav-Mobile]').should('have.length', mockedContent.rightNav.length);
      //cy.get('[data-testid=Header-Actions-Mobile]').should('have.length', mockedContent.actions.length);
      
      // cy.get('.PrivateHiddenCss-root').should('exist');
      // cy.get('.PrivateHiddenCss-root').should('not.be.visible');
      // cy.percySnapshot();
    });
  });
});
