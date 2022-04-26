import * as React from 'react';
import mount from '../../../../cypress/mount';
import Hero from '@last-rev/component-library/dist/components/Hero';
import { alignCenterMock } from '../../../stories/Hero/Hero.mock';

describe('Hero: Align - Center', () => {
  context('Renders correctly', () => {
    it('Renders variant: Align - Center of Hero component', () => {
      const mockedContent = { ...alignCenterMock };
      mount(<Hero variant="Align - Center" {...(mockedContent as any)} />);
      cy.get('[data-testid=Hero]').should('exist');
    });
  });
});
