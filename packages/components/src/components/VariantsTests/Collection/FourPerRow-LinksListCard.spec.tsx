import * as React from 'react';
import mount from '../../../../cypress/mount';
import Collection from '@last-rev/component-library/dist/components/Collection';
import { fourPerRowLinksListMock } from '../../../stories/Collection/Collection.mock';

describe('Collection: four-per-row + links list cards', () => {
  context('Renders correctly', () => {
    it('Renders four-per-row Collection variant with links list cards and with all fields provided', () => {
      const mockedContent = { ...fourPerRowLinksListMock };
      mount(<Collection variant="four-per-row" itemsVariant="links list" {...(mockedContent as any)} />);
      cy.get('[data-testid=Collection]').should('exist');
      cy.get('[data-testid=Collection-section]').should('exist');
      fourPerRowLinksListMock.items.forEach(() => {
        cy.get('[data-testid=Card').should('exist');
      });
    });
  });
});
