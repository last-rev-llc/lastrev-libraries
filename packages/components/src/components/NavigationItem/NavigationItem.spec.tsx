import * as React from 'react';
import mount from '../../../cypress/mount';
import NavigationItem, { NavigationItemProps } from './NavigationItem';
import { mockNavigationItemSubNavigation } from './NavigationItem.mock';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';

let router: NextRouter;
let mockedContent: NavigationItemProps = {};

beforeEach(() => {
  mockedContent = { ...mockNavigationItemSubNavigation() };
});

describe('NavigationItem', () => {
  beforeEach(() => {
    router = {
      pathname: '',
      route: '',
      query: {},
      asPath: '',
      isFallback: false,
      basePath: '',
      events: { emit: cy.spy(), off: cy.spy(), on: cy.spy() },
      push: cy.spy(),
      replace: cy.spy(),
      reload: cy.spy(),
      back: cy.spy(),
      prefetch: cy.spy(),
      isReady: true,
      isPreview: false,
      isLocaleDomain: false,
      beforePopState: cy.spy()
    };
  });

  context('renders correctly', () => {
    it('renders a navigation item and its subnav links', () => {
      mount(<NavigationItem {...mockedContent} />);
      cy.get('[data-testid=NavigationItem]').should('exist');
      cy.get('a')
        .should('have.length', mockedContent.subNavigation && mockedContent.subNavigation.length + 1)
        .each((item, index) => {
          if (index !== 0) {
            cy.wrap(item)
              .should(
                'have.attr',
                'href',
                `${mockedContent.subNavigation && mockedContent.subNavigation[index - 1].href}`
              )
              .and('have.text', mockedContent.subNavigation && mockedContent.subNavigation[index - 1].text);
          } else {
            cy.wrap(item).should('have.attr', 'href', `${mockedContent.href}`).and('have.text', mockedContent.text);
          }
        });
      // cy.percySnapshot();
    });

    it('renders a navigation item without subnav links', () => {
      mount(
        <RouterContext.Provider value={router}>
          <NavigationItem {...mockedContent} subNavigation={undefined} />
        </RouterContext.Provider>
      );
      cy.get('[data-testid=NavigationItem]').should('exist');
      cy.get('a')
        .should('have.length', 1)
        .and('have.attr', 'href', `${mockedContent.href}`)
        .and('have.text', mockedContent.text);
    });
  });
});
