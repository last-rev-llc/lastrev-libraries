import * as React from 'react';
import mount from '../../../cypress/mount';
import AutocompleteBox, { AutocompleteBoxProps } from './AutocompleteBox';
import autocompleteBoxMock from './AutocompleteBox.mock';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';

let router: NextRouter;

describe('AutocompleteBox', () => {
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

  it('renders a AutocompleteBox', () => {
    const mockedContent: AutocompleteBoxProps = { ...autocompleteBoxMock };
    mount(<AutocompleteBox {...mockedContent} />);
    cy.get('[data-testid=AutocompleteBox]').should('exist');
    cy.get('[data-testid=Autocomplete]').should('exist');
    cy.get('[data-testid=SearchResultItem]').should('not.exist');
  });

  it('calls router.push with correct URL when search query is present', () => {
    const mockedContent: AutocompleteBoxProps = { ...autocompleteBoxMock };
    const fakeSearchQuery = 'Lorem Ipsum';
    const fakeSearchPushPathname = mockedContent.settings.searchResultsUrl;
    const expectedRouterPush = { pathname: fakeSearchPushPathname, query: { query: fakeSearchQuery } };

    mount(
      <RouterContext.Provider value={router}>
        <AutocompleteBox {...mockedContent} />
      </RouterContext.Provider>
    );

    cy.get('input').type(fakeSearchQuery);
    cy.get('form')
      .submit()
      .then(() => {
        expect(router.push).to.be.calledWith(expectedRouterPush);
      });
  });

  it('does not call router.push when search query is just a space', () => {
    const mockedContent: AutocompleteBoxProps = { ...autocompleteBoxMock };
    const emptySearchQuery = ' ';

    mount(
      <RouterContext.Provider value={router}>
        <AutocompleteBox {...mockedContent} />
      </RouterContext.Provider>
    );

    cy.get('input').type(emptySearchQuery);
    cy.get('form')
      .submit()
      .then(() => {
        expect(router.push).to.not.be.called;
      });
  });

  it('doest not call router.push when searchResultsUrl is missing', () => {
    const mockedContent: AutocompleteBoxProps = {
      ...autocompleteBoxMock,
      settings: {
        ...autocompleteBoxMock.settings,
        searchResultsUrl: undefined
      }
    };
    const fakeSearchQuery = 'Lorem Ipsum';

    mount(
      <RouterContext.Provider value={router}>
        <AutocompleteBox {...mockedContent} />
      </RouterContext.Provider>
    );

    cy.get('input').type(fakeSearchQuery);
    cy.get('form')
      .submit()
      .then(() => {
        expect(router.push).to.not.be.called;
      });
  });
});
