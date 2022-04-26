import * as React from 'react';
import mount from '../../../../cypress/mount';
import Collection from '@last-rev/component-library/dist/components/Collection';
import { fourPerRowMock } from '../../../stories/Collection/Collection.mock';

describe('Collection: four-per-row', () => {
  context('Renders correctly', () => {
    it('Renders four-per-row Collection variant with default cards and with all fields provided', () => {
      const mockedContent = { ...fourPerRowMock };
      mount(<Collection variant="four-per-row" itemsVariant="default" {...(mockedContent as any)} />);
      cy.get('[data-testid=Collection]').should('exist');
      cy.get('[data-testid=Collection-section]').should('exist');
      fourPerRowMock.items.forEach(() => {
        cy.get('[data-testid=Card').should('exist');
      });
    });
  });
});
