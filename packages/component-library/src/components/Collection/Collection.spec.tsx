import * as React from 'react';
import mountWithRouter from '../../../cypress/mountWithRouter';
import Collection from './Collection';
import mockContent, { collectionWithIntroText } from './Collection.mock';

describe('Collection', () => {
  it('renders a Collection', () => {
    mountWithRouter(<Collection {...collectionWithIntroText} />);
    cy.get('[data-testid=Collection]').should('exist');
    cy.get('[data-testid=Collection-introText]').should('exist');
    cy.percySnapshot();
  });

  it('renders a Collection with no introText', () => {
    mountWithRouter(<Collection {...mockContent()} introText={undefined} />);
    cy.get('[data-testid=Collection]').should('exist');
    cy.get('[data-testid=Collection-introText]').should('not.exist');
    cy.percySnapshot();
  });
});
