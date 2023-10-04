//TODO: Fix ts issues
// @ts-nocheck
import * as React from 'react';
import mountWithRouter from '../../../cypress/mountWithRouter';

import Background from './Background';

import mockContent from './Background.mock';
import getFirstOfArray from '../utils/getFirstOfArray';

import type { BackgroundProps } from './Background.types';

let mockedContent: BackgroundProps = { __typename: 'Background', id: 'background', title: 'test', theme: {} };

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('Background', () => {
  context('renders correctly', () => {
    it('renders a background with correct content', () => {
      mountWithRouter(<Background {...mockedContent} />);
      cy.get('[data-testid=Background]').should('exist');
      cy.get('[data-testid=Background-title]').should('exist').and('have.text', mockedContent.title);

      cy.get('[data-testid=Background-subtitle]').should('exist').and('have.text', mockedContent.subtitle);
      cy.get('[data-testid=Background-body]')
        .should('exist')
        .and(
          'have.text',
          mockedContent.body?.json.content[0].content.map((c) => c.content[0].content[0].value).join('')
        );

      cy.get('[data-testid=Background-background]')
        .should('exist')
        .and('have.attr', 'src', mockedContent.background?.file?.url);
      cy.get('[data-testid=Background-image]')
        .should('exist')
        .and('have.attr', 'src', getFirstOfArray(mockedContent.image)?.file?.url);

      cy.contains(mockedContent.actions?.[0]?.text).should('exist');
      //cy.percySnapshot();
    });

    it('renders a background with no title', () => {
      mountWithRouter(<Background {...mockedContent} title={undefined} />);
      cy.get('[data-testid=Background]').should('exist');
      cy.get('[data-testid=Background-title]').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a background with no subtitle', () => {
      mountWithRouter(<Background {...mockedContent} subtitle={undefined} />);
      cy.get('[data-testid=Background]').should('exist');
      cy.get('[data-testid=Background-subtitle]').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a background with no body', () => {
      mountWithRouter(<Background {...mockedContent} body={undefined} />);
      cy.get('[data-testid=Background]').should('exist');
      cy.get('[data-testid=Background-body]').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a background with no background image', () => {
      mountWithRouter(<Background {...mockedContent} background={undefined} />);
      cy.get('[data-testid=Background]').should('exist');
      cy.get('[data-testid=Background-background]').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a background with no image', () => {
      mountWithRouter(<Background {...mockedContent} image={undefined} />);
      cy.get('[data-testid=Background]').should('exist');
      cy.get('[data-testid=Background-image]').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a background with no cta button', () => {
      mountWithRouter(<Background {...mockedContent} actions={undefined} />);
      cy.get('[data-testid=Background]').should('exist');
      cy.contains(mockedContent.actions?.[0]?.text).should('not.exist');
      //cy.percySnapshot();
    });
  });
});
