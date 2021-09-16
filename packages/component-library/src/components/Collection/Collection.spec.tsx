import * as React from 'react';
import mount from '../../../cypress/mount';
import Collection from './Collection';
import mockContent from './Collection.mock';

describe('Collection', () => {
  it('renders a Collection', () => {
    mount(<Collection {...mockContent} />);
    cy.get('[data-testid=Collection]').should('exist');
    cy.get('[data-testid=Collection-introText]').should('exist');
    cy.percySnapshot();
  });

  it('renders a Collection with no introText', () => {
    mount(<Collection {...mockContent} introText={undefined} />);
    cy.get('[data-testid=Collection]').should('exist');
    cy.get('[data-testid=Collection-introText]').should('not.exist');
    cy.percySnapshot();
  });

});
