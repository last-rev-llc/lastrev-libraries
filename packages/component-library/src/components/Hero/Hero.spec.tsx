import * as React from 'react';
import mount from '../../../cypress/mount';
import Hero, { HeroProps } from './Hero';
import mockContent from './Hero.mock';
import getFirstOfArray from '../../utils/getFirstOfArray';

let mockedContent: HeroProps = { __typename: 'Hero', id: 'hero', title: 'test', theme: {} };

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('Hero', () => {
  context('renders correctly', () => {
    it('renders a hero with correct content', () => {
      mount(<Hero {...mockedContent} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-title]').should('exist').and('have.text', mockedContent.title);

      cy.get('[data-testid=Hero-subtitle]').should('exist').and('have.text', mockedContent.subtitle);
      cy.get('[data-testid=Hero-body]')
        .should('exist')
        .and(
          'have.text',
          mockedContent.body.json.content[0].content.map((c) => c.content[0].content[0].value).join('')
        );

      cy.get('[data-testid=Hero-background]')
        .should('exist')
        .and('have.attr', 'src', mockedContent.background.file.url);
      cy.get('[data-testid=Hero-image]')
        .should('exist')
        .and('have.attr', 'src', getFirstOfArray(mockedContent.image).file.url);

      cy.contains(mockedContent.actions[0]?.text).should('exist');
      cy.percySnapshot();
    });

    it('renders a hero with no title', () => {
      mount(<Hero {...mockedContent} title={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-title]').should('not.exist');
      cy.percySnapshot();
    });

    it('renders a hero with no subtitle', () => {
      mount(<Hero {...mockedContent} subtitle={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-subtitle]').should('not.exist');
      cy.percySnapshot();
    });

    it('renders a hero with no body', () => {
      mount(<Hero {...mockedContent} body={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-body]').should('not.exist');
      cy.percySnapshot();
    });

    it('renders a hero with no background image', () => {
      mount(<Hero {...mockedContent} background={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-background]').should('not.exist');
      cy.percySnapshot();
    });

    it('renders a hero with no image', () => {
      mount(<Hero {...mockedContent} image={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-image]').should('not.exist');
      cy.percySnapshot();
    });

    it('renders a hero with no cta button', () => {
      mount(<Hero {...mockedContent} actions={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.contains(mockedContent.actions[0]?.text).should('not.exist');
      cy.percySnapshot();
    });
  });
});
