import * as React from 'react';
import mount from '../../../cypress/mount';
import Card from './Card';
import mockContent, { cardWithLink, cardWithLinkButton } from './Card.mock';

describe('Card', () => {
  it('renders a card', () => {
    mount(<Card {...mockContent()} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-title]').should('exist');
    cy.get('[data-testid=Card-subtitle]').should('exist');
    cy.get('[data-testid=Card-body]').should('exist');
    cy.get('[data-testid=Card-media]').should('exist');
    cy.get('[data-testid=Card-actions]').should('exist');
    cy.percySnapshot();
  });

  it('renders a card with no actions', () => {
    mount(<Card {...mockContent()} actions={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-actions]').should('not.exist');
    cy.percySnapshot();
  });

  it('renders a card with no title', () => {
    mount(<Card {...mockContent()} title={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-title]').should('not.exist');
    cy.percySnapshot();
  });

  it('renders a card with no subtitle', () => {
    mount(<Card {...mockContent()} subtitle={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-subtitle]').should('not.exist');
    cy.percySnapshot();
  });

  it('renders a card with no media', () => {
    mount(<Card {...mockContent()} media={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-media]').should('not.exist');
    cy.percySnapshot();
  });

  it('renders a card with no body', () => {
    mount(<Card {...mockContent()} body={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-body]').should('not.exist');
    cy.percySnapshot();
  });

  it('renders a card with a clickable button link', () => {
    mount(<Card {...cardWithLinkButton()} body={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-body]').should('not.exist');
    cy.get('[data-testid="Card-link"]').should('have.attr', 'href');
    cy.percySnapshot();
  });

  it('renders a card with a clickable link', () => {
    mount(<Card {...cardWithLink()} body={undefined} />);
    cy.get('[data-testid=Card]').should('exist');
    cy.get('[data-testid=Card-body]').should('not.exist');
    cy.get('[data-testid="Card-link"]').should('have.attr', 'href');
    cy.percySnapshot();
  });
});
