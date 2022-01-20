import * as React from 'react';

import RelatedLinks, { RelatedLinksProps } from './RelatedLinks';
import { relatedLinksMock } from './RelatedLinks.mock';
import mount from '../../../cypress/mount';

describe('RelatedLinks', () => {
  context('renders correctly', () => {
    it('renders an RelatedLinks component with all fields provided', () => {
      const mockedContent: RelatedLinksProps = { ...relatedLinksMock };
      mount(<RelatedLinks {...mockedContent} />);
      cy.get('[data-testid=RelatedLinks]').should('exist');
      cy.get('[data-testid=RelatedLinks-title]').should('exist')
        .and('have.text', mockedContent.title);

      cy.get('[data-testid=RelatedLinks-item] a').each((link, index) => {
        cy.wrap(link)
          .should('have.attr', 'href', `/${mockedContent.links[index].href}`)
          .and('have.text', mockedContent.links[index].text)
      });
    });

    it('renders an RelatedLinks component with no unrequired fields provided', () => {
      mount(<RelatedLinks />);
      cy.get('[data-testid=RelatedLinks]').should('not.exist');
      cy.get('[data-testid=RelatedLinks-title]').should('not.exist');
      cy.get('[data-testid=RelatedLinks-item]').should('not.exist');
    });
  });
});
