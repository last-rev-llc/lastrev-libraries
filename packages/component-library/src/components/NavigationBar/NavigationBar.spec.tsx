import * as React from 'react';
import mount from '../../../cypress/mount';
import NavigationBar, { NavigationBarProps } from './NavigationBar';
import mockContent from './NavigationBar.mock';

let mockedContent: NavigationBarProps = { theme: {}, sidekickLookup: '' };

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('NavigationBar', () => {
  context('renders correctly', () => {
    it('renders a NavigationBar', () => {
      mount(<NavigationBar {...mockedContent} />);
      cy.get('[data-testid=NavigationBar]').should('exist');
      cy.get('[data-testid=NavigationBar-title]').should('exist');
      cy.get('[data-testid=NavigationBar-body]').should('exist');
      cy.get('[data-testid=NavigationBar-items]').should('exist');
      cy.percySnapshot();
    });
  });
});
