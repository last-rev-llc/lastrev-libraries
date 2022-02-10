import * as React from 'react';
import mount from '../../../../cypress/mount';
import Hero from '@last-rev/component-library/dist/components/Hero/Hero';
import { heightMediumMock } from '../../../stories/Hero/Hero.mock';

describe('Hero: Height - Med', () => {
  context('Renders correctly', () => {
    it('Renders variant: Height - Med of Hero component with all fields provided', () => {
      const mockedContent = { ...heightMediumMock };
      mount(<Hero variant="Height - Med" {...(mockedContent as any)} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-title]').should('exist');
      cy.get('[data-testid=Hero-body]').should('exist');
    });
  });
});
