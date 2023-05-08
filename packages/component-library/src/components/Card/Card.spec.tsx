import * as React from 'react';
import mountWithRouter from '../../../cypress/mountWithRouter';
import Card from './Card';
import mockContent, { cardWithLink, cardWithLinkButton } from './Card.mock';

describe('Card', () => {
  it('renders a card', () => {
    mountWithRouter(<Card {...mockContent()} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-title]').should('exist');
    cy.get('[data-testid=Card-subtitle]').should('exist');
    cy.get('[data-testid=Card-body]').should('exist');
    cy.get('[data-testid=Card-media]').should('exist');
    cy.get('[data-testid=Card-actions]').should('exist');
    cy.percySnapshot();
  });

  it('renders a card with no actions', () => {
    mountWithRouter(<Card {...mockContent()} actions={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-actions]').should('not.exist');
    cy.percySnapshot();
  });

  it('renders a card with no title', () => {
    mountWithRouter(<Card {...mockContent()} title={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-title]').should('not.exist');
    cy.percySnapshot();
  });

  it('renders a card with no subtitle', () => {
    mountWithRouter(<Card {...mockContent()} subtitle={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-subtitle]').should('not.exist');
    cy.percySnapshot();
  });

  it('renders a card with no media', () => {
    mountWithRouter(<Card {...mockContent()} media={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-media]').should('not.exist');
    cy.percySnapshot();
  });

  it('renders a card with no body', () => {
    mountWithRouter(<Card {...mockContent()} body={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-body]').should('not.exist');
    cy.percySnapshot();
  });

  it('renders a card with a clickable button link', () => {
    mountWithRouter(<Card {...cardWithLinkButton()} body={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-body]').should('not.exist');
    cy.get('[data-testid="Card-link"]').should('have.attr', 'href');
    cy.percySnapshot();
  });

  it('renders a card with a clickable link', () => {
    mountWithRouter(<Card {...cardWithLink()} body={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-body]').should('not.exist');
    cy.get('[data-testid="Card-link"]').should('have.attr', 'href');
    cy.percySnapshot();
  });
});
