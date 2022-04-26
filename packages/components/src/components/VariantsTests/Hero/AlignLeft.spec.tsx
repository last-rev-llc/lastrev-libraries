import * as React from 'react';
import mount from '../../../../cypress/mount';
import Hero from '@last-rev/component-library/dist/components/Hero';
import { alignLeftMock } from '../../../stories/Hero/Hero.mock';

describe('Hero: Align - Left', () => {
  context('Renders correctly', () => {
    it('Renders variant: Align - Left of Hero component', () => {
      const mockedContent = { ...alignLeftMock };
      mount(<Hero variant="Align - Left" {...(mockedContent as any)} />);
      cy.get('[data-testid=Hero]').should('exist');
    });
  });
});
