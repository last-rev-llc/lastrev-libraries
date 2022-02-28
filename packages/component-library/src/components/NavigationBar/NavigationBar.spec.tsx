import * as React from 'react';
import 'cypress-real-events/support';
import mount from '../../../cypress/mount';
import NavigationBar, { NavigationBarProps } from './NavigationBar';
import NavigationItem, { NavigationItemProps } from '../NavigationItem/NavigationItem';
import mockContent, { mockWithNavigationItems } from './NavigationBar.mock';

let mockedContent: NavigationBarProps = { theme: {}, sidekickLookup: '' };
let mockedContentWithNavigationItems: NavigationBarProps = { theme: {}, sidekickLookup: '' };

beforeEach(() => {
  mockedContent = { ...mockContent() };
  mockedContentWithNavigationItems = { ...mockWithNavigationItems() };
});

describe('NavigationBar', () => {
  context('renders correctly', () => {
    describe('items as NavigationItems', () => {
      it('renders a NavigationBar with correct navigation items and subnav items', () => {
        const mainNavLinks = mockedContentWithNavigationItems.items.length;
        const subNavLinks = mockedContentWithNavigationItems.items
          .map((item) => item.subNavigation.length)
          .reduce((previous, current) => previous + current, 0);

        mount(<NavigationBar {...mockedContentWithNavigationItems} />);
        cy.get('[data-testid=NavigationBar]').should('exist');
        cy.get('[data-testid=NavigationItem]').should('have.length', mainNavLinks);
        cy.get('a').should('have.length', mainNavLinks + subNavLinks);
        cy.percySnapshot();
      });

      it('renders a NavigationBar with correct navigation items ', () => {
        mount(<NavigationBar {...mockedContentWithNavigationItems} />);
        cy.get('[data-testid=NavigationBar]').should('exist');
        cy.get('[data-testid=NavigationItem]').should('have.length', mockedContentWithNavigationItems.items.length);
        cy.percySnapshot();
      });
    });

    describe('items as Links', () => {
      it('renders a NavigationBar with correct links', () => {
        mount(<NavigationBar {...mockedContent} />);
        cy.get('[data-testid=NavigationBar]').should('exist');
        cy.get('a').each((a, index) => {
          cy.wrap(a)
            .should('have.attr', 'href', `/${mockedContent.items[index].href}`)
            .and('have.text', mockedContent.items[index].text);
        });
      });
    });

    context('functions correctly', () => {
      describe('hover on NavigationItems', () => {
        it('renders with correct sub-navigation items', () => {
          mount(<NavigationBar {...mockedContentWithNavigationItems} />);
          cy.get('[data-testid=NavigationItem]').each((navItem, index) => {
            const item: NavigationItemProps = { ...mockedContentWithNavigationItems.items[index] };
            item.subNavigation.forEach((subNav) => {
              cy.get('span').contains(subNav.text).should('not.be.visible');
            });
            cy.wrap(navItem).realHover();
            item.subNavigation.forEach((subNav) => {
              cy.get('span').contains(subNav.text).should('be.visible');
            });
            cy.percySnapshot();
          });
        });
      });
    });
  });
});
