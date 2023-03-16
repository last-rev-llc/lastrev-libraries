import * as React from 'react';
import mount from '../../../../cypress/mount';
import Card from '@last-rev/component-library/dist/components/Card';
import { defaultMock } from '../../../stories/Card/Card.mock';

describe('Card: default', () => {
  context('Renders correctly', () => {
    it('Renders default variant Card with all fields provided', () => {
      const mockedContent = { ...defaultMock };
      mount(<Card variant="default" {...mockedContent} />);
      cy.get('[data-testid=Card]').should('exist');
      cy.get('[data-testid=Card-media]').should('exist');
      cy.get('[data-testid=Card-title]').should('exist');
      cy.get('[data-testid=Card-body]').should('exist');
      cy.get('[data-csk-entry-display-text="Link"]').should('exist');
      cy.get('[data-testid=Card-subtitle]').should('not.exist');
      cy.get('[data-testid=Card-actions]').should('not.exist');
    });
  });
});
