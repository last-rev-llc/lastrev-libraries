import * as React from 'react';
import { capitalize } from 'lodash';
import { mount } from '@cypress/react18';
import Link from './Link';
import { LinkProps } from './Link.types';
import mockContent from './Link.mock';

let mockedContent: LinkProps = {};

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('Link renders correctly', () => {
  describe('variant attribute', () => {
    it('renders a basic link when variant is link', () => {
      mount(<Link {...mockedContent} variant="link" />);
      cy.get('a')
        .should('exist')
        .and('have.attr', 'href', `/${mockedContent.href}`)
        .and('have.text', mockedContent.text);
      cy.percySnapshot();
    });

    it('renders a basic link when variant is not provided', () => {
      mount(<Link {...mockedContent} variant="" />);
      cy.get('a')
        .should('exist')
        .and('have.attr', 'href', `/${mockedContent.href}`)
        .and('have.text', mockedContent.text);
    });

    it('renders a contained button when variant is button-contained', () => {
      mount(<Link {...mockedContent} variant="button-contained" />);
      cy.get('a').should('exist').and('have.class', 'MuiButton-contained').and('have.text', mockedContent.text);
      cy.percySnapshot();
    });

    it('renders an outlined button when variant is button-outlined', () => {
      mount(<Link {...mockedContent} variant="button-outlined" />);
      cy.get('a').should('exist').and('have.class', 'MuiButton-outlined').and('have.text', mockedContent.text);
      cy.percySnapshot();
    });

    it('renders text as a button when variant is button-text', () => {
      mount(<Link {...mockedContent} variant="button-text" />);
      cy.get('a').should('exist').and('have.class', 'MuiButton-text').and('have.text', mockedContent.text);
      cy.percySnapshot();
    });
  });

  describe('type attribute', () => {
    it('renders a link of type button when type is button', () => {
      mount(<Link {...mockedContent} type="button" />);
      cy.get('[type=button]').should('exist').and('have.text', mockedContent.text);
    });

    it('renders a link of type submit when type is submit', () => {
      mount(<Link {...mockedContent} type="submit" />);
      cy.get('[type=submit]').should('exist').and('have.text', mockedContent.text);
    });

    it('renders a link of type reset when type is reset', () => {
      mount(<Link {...mockedContent} type="reset" />);
      cy.get('[type=reset]').should('exist').and('have.text', mockedContent.text);
    });
  });

  describe('icon attribute', () => {
    it('renders a link without an icon if one is not provided', () => {
      mount(<Link {...mockedContent} icon={undefined} />);
      cy.get('.MuiIcon-root').should('not.exist');
      cy.percySnapshot();
    });

    it('renders a link with an icon on the right if iconPosition is Right', () => {
      mount(<Link {...mockedContent} iconPosition="Right" />);
      cy.get('.MuiButton-endIcon').should('exist');
    });

    it('renders a link with an icon on the left if iconPosition is Left', () => {
      mount(<Link {...mockedContent} iconPosition="Left" />);
      cy.get('.MuiButton-startIcon').should('exist');
      cy.percySnapshot();
    });
  });
});
