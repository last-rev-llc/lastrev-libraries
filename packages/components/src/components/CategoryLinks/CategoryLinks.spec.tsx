import * as React from 'react';

import CategoryLinks, { CategoryLinkProps } from './CategoryLinks';
import { categoryLinksMock } from './CategoryLinks.mock';
import mount from '../../../cypress/mount';

describe('CategoryLinks', () => {
  context('renders correctly', () => {
    it('renders an CategoryLinks component with all fields provided', () => {
      const mockedContent: CategoryLinkProps = { ...categoryLinksMock };
      mount(<CategoryLinks {...mockedContent} />);
      cy.get('[data-testid=CategoryLinks]').should('exist');

      cy.get('[data-testid=CategoryLinks-link]').each((link, index) => {
        cy.wrap(link)
          .should('have.attr', 'href', `/${mockedContent.links[index].href}`)
          .and('have.text', mockedContent.links[index].text)
      });
    });

    it('renders an CategoryLinks component with no unrequired fields provided', () => {
      mount(<CategoryLinks />);
      cy.get('[data-testid=CategoryLinks]').should('not.exist');
      cy.get('[data-testid=CategoryLinks-link]').should('not.exist');
    });
  });
});
