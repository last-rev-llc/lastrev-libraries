import * as React from 'react';
import { mount } from '@cypress/react18';

import Link from './Link';

import type { LinkProps } from './Link.types';
import { linkBaseMock, linkButtonMock } from './Link.mock';

let mockedLinkContent: LinkProps = {};
let mockedButtonContent: LinkProps = {};

// TODO: Best approach?
beforeEach(() => {
  mockedLinkContent = { ...linkBaseMock() };
  mockedButtonContent = { ...linkButtonMock() };
});

describe('Link renders correctly', () => {
  describe('variant attribute', () => {
    it('renders a basic link when variant is link', () => {
      mount(<Link {...mockedLinkContent} variant="link" />);
      cy.get('a')
        .should('exist')
        .and('have.attr', 'href', `/${mockedLinkContent.href}`)
        .and('have.text', mockedLinkContent.text);
      //cy.percySnapshot();
    });

    it('renders a basic link when variant is not provided', () => {
      mount(<Link {...mockedLinkContent} variant="" />);
      cy.get('a')
        .should('exist')
        .and('have.attr', 'href', `/${mockedLinkContent.href}`)
        .and('have.text', mockedLinkContent.text);
    });

    it('renders a contained button when variant is button-contained', () => {
      mount(<Link {...mockedButtonContent} variant="button-contained" />);
      cy.get('a').should('exist').and('have.class', 'MuiButton-contained').and('have.text', mockedLinkContent.text);
      //cy.percySnapshot();
    });

    it('renders an outlined button when variant is button-outlined', () => {
      mount(<Link {...mockedButtonContent} variant="button-outlined" />);
      cy.get('a').should('exist').and('have.class', 'MuiButton-outlined').and('have.text', mockedLinkContent.text);
      //cy.percySnapshot();
    });

    it('renders text as a button when variant is button-text', () => {
      mount(<Link {...mockedButtonContent} variant="button-text" />);
      cy.get('a').should('exist').and('have.class', 'MuiButton-text').and('have.text', mockedLinkContent.text);
      //cy.percySnapshot();
    });
  });

  describe('type attribute', () => {
    it('renders a link of type button when type is button', () => {
      mount(<Link {...mockedLinkContent} type="button" />);
      cy.get('[type=button]').should('exist').and('have.text', mockedLinkContent.text);
    });

    it('renders a link of type submit when type is submit', () => {
      mount(<Link {...mockedLinkContent} type="submit" />);
      cy.get('[type=submit]').should('exist').and('have.text', mockedLinkContent.text);
    });

    it('renders a link of type reset when type is reset', () => {
      mount(<Link {...mockedLinkContent} type="reset" />);
      cy.get('[type=reset]').should('exist').and('have.text', mockedLinkContent.text);
    });
  });

  describe('icon attribute', () => {
    it('renders a link without an icon if one is not provided', () => {
      mount(<Link {...mockedLinkContent} icon={undefined} />);
      cy.get('.MuiIcon-root').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a link with an icon on the right if iconPosition is Right', () => {
      mount(<Link {...mockedLinkContent} iconPosition="Right" />);
      cy.get('.MuiButton-endIcon').should('exist');
    });

    it('renders a link with an icon on the left if iconPosition is Left', () => {
      mount(<Link {...mockedLinkContent} iconPosition="Left" />);
      cy.get('.MuiButton-startIcon').should('exist');
      //cy.percySnapshot();
    });
  });
});
