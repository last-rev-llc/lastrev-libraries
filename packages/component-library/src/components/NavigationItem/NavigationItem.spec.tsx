import * as React from 'react';
import mountWithRouter from '../../../cypress/mountWithRouter';
import NavigationItem from './NavigationItem';
import { NavigationItemProps } from './NavigationItem.types';
import mockContent from './NavigationItem.mock';

let mockedContent: NavigationItemProps = {};

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('NavigationItem', () => {
  context('renders correctly', () => {
    it('renders a navigation item and its subnav links', () => {
      mountWithRouter(<NavigationItem {...mockedContent} />);
      cy.get('[data-testid=NavigationItem]').should('exist');
      cy.get('a')
        .should('have.length', (mockedContent.subNavigation?.length || 0) + 1)
        .each((item, index) => {
          if (index !== 0) {
            cy.wrap(item)
              .should('have.attr', 'href', `/${mockedContent.subNavigation?.[index - 1].href}`)
              .and('have.text', mockedContent.subNavigation?.[index - 1].text);
          } else {
            cy.wrap(item).should('have.attr', 'href', `/${mockedContent.href}`).and('have.text', mockedContent.text);
          }
        });
      cy.percySnapshot();
    });

    it('renders a navigation item without subnav links', () => {
      mountWithRouter(<NavigationItem {...mockedContent} subNavigation={undefined} />);
      cy.get('[data-testid=NavigationItem]').should('exist');
      cy.get('a')
        .should('have.length', 1)
        .and('have.attr', 'href', `/${mockedContent.href}`)
        .and('have.text', mockedContent.text);
    });
  });
});
