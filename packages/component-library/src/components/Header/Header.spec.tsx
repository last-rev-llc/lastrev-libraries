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
      cy.get('a').should('exist').and('have.attr', 'href', mockedContent.logoUrl);
      cy.get('img').should('exist').and('have.attr', 'src', mockedContent.logo.file.url);
      cy.get('[data-testid=NavigationBar]').should('exist');
      cy.get('[data-testid=NavigationItem]').should(
        'have.length',
        mockedContent.navigationItems.map((navItem) => navItem.items.length).reduce(getSumReducer, 0)
      );
      cy.get('.PrivateHiddenCss-root').should('exist');
      cy.get('.PrivateHiddenCss-root').should('not.be.visible');
      cy.percySnapshot();
    });
  });
});
