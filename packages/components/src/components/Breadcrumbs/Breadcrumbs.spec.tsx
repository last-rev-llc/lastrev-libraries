import * as React from 'react';

import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs';
import { breadcrumbsMock } from './Breadcrumbs.mock';
import mount from '../../../cypress/mount';

describe('Breadcrumbs', () => {
  context('renders correctly', () => {
    it('renders a Breadcrumbs component with fields provided', () => {
      const mockedContent: BreadcrumbsProps = { ...breadcrumbsMock };
      mount(<Breadcrumbs {...mockedContent} />);
      cy.get('[data-testid=Breadcrumbs]').should('exist');
      cy.get('[data-testid=Breadcrumbs-breadcrumbsRoot]').should('exist');
      cy.get('[data-testid=Breadcrumbs-link]').each((link, index) => {
        cy.wrap(link)
          .should('have.attr', 'href', `/${mockedContent.breadcrumbs[index].href}`)
          .and('have.text', mockedContent.breadcrumbs[index].text)
      });
    });

    it('won\'t render a Breadcrumbs component without fields provided', () => {
      mount(<Breadcrumbs />);
      cy.get('[data-testid=Breadcrumbs]').should('not.exist');
      cy.get('[data-testid=Breadcrumbs-breadcrumbsRoot]').should('not.exist');
      cy.get('[data-testid=Breadcrumbs-link]').should('not.exist');
    });
  });
});
