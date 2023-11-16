import * as React from 'react';
import { mount } from '@cypress/react18';

import InlineNavigation from './InlineNavigation';

import type { InlineNavigationProps } from './InlineNavigation.types';
import { inlinenavigationBaseMock, inlinenavigationButtonMock } from './InlineNavigation.mock';

let mockedInlineNavigationContent: InlineNavigationProps = {};
let mockedButtonContent: InlineNavigationProps = {};

// TODO: Best approach?
beforeEach(() => {
  mockedInlineNavigationContent = { ...inlinenavigationBaseMock() };
  mockedButtonContent = { ...inlinenavigationButtonMock() };
});

describe('InlineNavigation renders correctly', () => {
  describe('variant attribute', () => {
    it('renders a basic inlinenavigation when variant is inlinenavigation', () => {
      mount(<InlineNavigation {...mockedInlineNavigationContent} variant="inlinenavigation" />);
      cy.get('a')
        .should('exist')
        .and('have.attr', 'href', `/${mockedInlineNavigationContent.href}`)
        .and('have.text', mockedInlineNavigationContent.text);
      //cy.percySnapshot();
    });

    it('renders a basic inlinenavigation when variant is not provided', () => {
      mount(<InlineNavigation {...mockedInlineNavigationContent} variant="" />);
      cy.get('a')
        .should('exist')
        .and('have.attr', 'href', `/${mockedInlineNavigationContent.href}`)
        .and('have.text', mockedInlineNavigationContent.text);
    });

    it('renders a contained button when variant is buttonContained', () => {
      mount(<InlineNavigation {...mockedButtonContent} variant="buttonContained" />);
      cy.get('a')
        .should('exist')
        .and('have.class', 'MuibuttonContained')
        .and('have.text', mockedInlineNavigationContent.text);
      //cy.percySnapshot();
    });

    it('renders an outlined button when variant is buttonOutlined', () => {
      mount(<InlineNavigation {...mockedButtonContent} variant="buttonOutlined" />);
      cy.get('a')
        .should('exist')
        .and('have.class', 'MuibuttonOutlined')
        .and('have.text', mockedInlineNavigationContent.text);
      //cy.percySnapshot();
    });

    it('renders text as a button when variant is button-text', () => {
      mount(<InlineNavigation {...mockedButtonContent} variant="button-text" />);
      cy.get('a')
        .should('exist')
        .and('have.class', 'MuiButton-text')
        .and('have.text', mockedInlineNavigationContent.text);
      //cy.percySnapshot();
    });
  });

  describe('type attribute', () => {
    it('renders a inlinenavigation of type button when type is button', () => {
      mount(<InlineNavigation {...mockedInlineNavigationContent} type="button" />);
      cy.get('[type=button]').should('exist').and('have.text', mockedInlineNavigationContent.text);
    });

    it('renders a inlinenavigation of type submit when type is submit', () => {
      mount(<InlineNavigation {...mockedInlineNavigationContent} type="submit" />);
      cy.get('[type=submit]').should('exist').and('have.text', mockedInlineNavigationContent.text);
    });

    it('renders a inlinenavigation of type reset when type is reset', () => {
      mount(<InlineNavigation {...mockedInlineNavigationContent} type="reset" />);
      cy.get('[type=reset]').should('exist').and('have.text', mockedInlineNavigationContent.text);
    });
  });

  describe('icon attribute', () => {
    it('renders a inlinenavigation without an icon if one is not provided', () => {
      mount(<InlineNavigation {...mockedInlineNavigationContent} icon={undefined} />);
      cy.get('.MuiIcon-root').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a inlinenavigation with an icon on the right if iconPosition is Right', () => {
      mount(<InlineNavigation {...mockedInlineNavigationContent} iconPosition="Right" />);
      cy.get('.MuiButton-endIcon').should('exist');
    });

    it('renders a inlinenavigation with an icon on the left if iconPosition is Left', () => {
      mount(<InlineNavigation {...mockedInlineNavigationContent} iconPosition="Left" />);
      cy.get('.MuiButton-startIcon').should('exist');
      //cy.percySnapshot();
    });
  });
});
