import * as React from 'react';
import { mount } from '@cypress/react18';

import Header from './Header';

import { headerBaseMock } from './Header.mock';

import type { HeaderProps } from './Header.types';

let mockedContent: Partial<HeaderProps> = { sidekickLookup: {} };

beforeEach(() => {
  mockedContent = { ...headerBaseMock() };
});

// const getSumReducer = (previous: number, current: number): number => previous + current;

describe.skip('Header', () => {
  context('renders correctly', () => {
    // it('renders a header', () => {
    //   mount(<Header {...mockedContent} />);
    //   cy.get('a').should('exist').and('have.attr', 'href', mockedContent.logoUrl?.href);
    //   cy.get('img').should('exist').and('have.attr', 'src', mockedContent.logo?.file?.url);
    //   cy.get('[data-testid=NavigationBar]:first')
    //     .find('[data-testid=NavigationItem]')
    //     .each((item) => {
    //       cy.wrap(item).should('be.visible');
    //     });
    //   cy.get('.PrivateHiddenCss-root').should('exist');
    //   cy.get('.PrivateHiddenCss-root').should('not.be.visible');
    //   //cy.percySnapshot();
    // });

    it('supports multiple navigation items/bars', () => {
      mount(<Header {...mockedContent} />);
      // cy.get('[data-testid=NavigationBar]').each((navBar, index, $list) => {
      //   if (index !== $list.length - 1) {
      //     cy.wrap(navBar)
      //       .find('[data-testid=NavigationItem]')
      //       .should('have.length', (mockedContent.navigationItems && mockedContent.navigationItems?.length) || 0)
      //       .each((item) => {
      //         cy.wrap(item).should('be.visible');
      //       });
      //   } else {
      //     cy.wrap(navBar)
      //       .find('[data-testid=NavigationItem]')
      //       .should(
      //         'have.length',
      //         mockedContent.navigationItems?.map((navItem) => navItem.items?.length || 0).reduce(getSumReducer, 0)
      //       )
      //       .each((item) => {
      //         cy.wrap(item).should('not.be.visible');
      //       });
      //   }
      // });
      //cy.percySnapshot();
    });

    it('mobile when menu is closed', () => {
      mockedContent.navigationItems?.push(collectionWithItems);
      mount(<Header {...mockedContent} />);
      // cy.viewport(550, 750);
      // cy.get('[data-testid=NavigationBar]').should('exist');
      // cy.get('[data-testid=NavigationItem]').should('not.be.visible');
      // cy.get('[data-testid=MenuIcon]').should('exist').and('be.visible');
      // cy.get('[data-testid=CloseIcon]').should('exist').and('not.be.visible');
      //cy.percySnapshot();
    });

    it('mobile when menu is open', () => {
      mockedContent.navigationItems?.push(collectionWithItems);
      mount(<Header {...mockedContent} />);
      cy.viewport(550, 750);
      // cy.get('button[type="button"]').click();
      // cy.get('[data-testid=MenuIcon]').should('exist').and('not.be.visible');
      // cy.get('[data-testid=CloseIcon]').should('exist').and('be.visible');
      // cy.get('[data-testid=NavigationBar]').each((navBar, index, $list) => {
      //   if (index !== $list.length - 1) {
      //     cy.wrap(navBar)
      //       .find('[data-testid=NavigationItem]')
      //       .should(
      //         'have.length',
      //         (mockedContent.navigationItems && mockedContent.navigationItems[index].items?.length) || 0
      //       );
      //   } else {
      //     cy.wrap(navBar)
      //       .find('[data-testid=NavigationItem]')
      //       .should(
      //         'have.length',
      //         mockedContent.navigationItems?.map((navItem) => navItem.items?.length || 0).reduce(getSumReducer, 0)
      //       );
      //   }
      // });
      //cy.percySnapshot();
    });
  });
});
