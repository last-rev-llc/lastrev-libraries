import * as React from 'react';
import mount from '../../../../cypress/mount';
import Card from '@last-rev/component-library/dist/components/Card/Card';
import { linksListMock } from '../../../stories/Card/Card.mock';

describe('Card: links list', () => {
  context('Renders correctly', () => {
    it('Renders links list variant Card with all fields provided', () => {
      const mockedContent = { ...linksListMock };
      mount(<Card variant="links list" {...mockedContent} />);
      cy.get('[data-testid=Card]').should('exist');
      cy.get('[data-testid=Card-title]').should('exist');
      cy.get('[data-testid=Card-subtitle]').should('not.exist');
      cy.get('[data-testid=Card-body]').should('not.exist');
      cy.get('[data-testid=Card-media]').should('not.exist');
      cy.get('[data-testid=Card-actions]').should('exist');
    });
  });
});
