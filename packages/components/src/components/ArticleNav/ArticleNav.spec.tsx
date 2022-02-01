import * as React from 'react';

import ArticleNav, { ArticleNavProps } from './ArticleNav';
import { articleNavMock } from './ArticleNav.mock';
import mount from '../../../cypress/mount';

describe('ArticleNav', () => {
  context('renders correctly', () => {
    it('renders an ArticleNav with links provided', () => {
      const mockedContent: ArticleNavProps = { ...articleNavMock };
      mount(<ArticleNav {...mockedContent} />);
      cy.get('[data-testid=ArticleNav]').should('exist');
      cy.get('[data-testid=ArticleNav-list]').should('exist');

      cy.get('[data-testid=ArticleNav-link] a').each((link, index) => {
        cy.wrap(link)
          .should('have.attr', 'href', mockedContent.sideNav[index].href)
          .and('have.text', mockedContent.sideNav[index].text)
      });
    });

    it('won\'t render an ArticleNav without links provided', () => {
      mount(<ArticleNav />);
      cy.get('[data-testid=ArticleNav]').should('not.exist');
      cy.get('[data-testid=ArticleNav-list]').should('not.exist');
      cy.get('[data-testid=ArticleNav-link]').should('not.exist');
    });
  });
});
