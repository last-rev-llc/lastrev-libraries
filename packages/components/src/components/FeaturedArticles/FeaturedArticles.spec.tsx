import * as React from 'react';

import FeaturedArticles, { FeaturedArticlesProps } from './FeaturedArticles';
import { articlesMock } from './FeaturedArticles.mock';
import mount from '../../../cypress/mount';

const parseNode = (node: { nodeType: string; value: any; content: any[] }) => {
  return node.nodeType === 'text' ? node.value : node.content.map((c: any) => parseNode(c)).join('');
};

describe('FeaturedArticles', () => {
  context('renders correctly', () => {
    it('renders a list of articles', () => {
      const mockedContent: FeaturedArticlesProps = { ...articlesMock };
      mount(<FeaturedArticles {...mockedContent} />);

      cy.get('[data-testid=FeaturedArticles-title]').should('exist');

      cy.get('[data-testid=FeaturedArticles-articleCard]').its('length').should('eq', mockedContent.articles.length);
      cy.get('[data-testid=FeaturedArticles-articleCard]').each((cardElement, index) => {
        cy.wrap(cardElement)
          .find('[data-testid=Card-media]')
          .should('exist')
          .and('have.attr', 'src', mockedContent.articles[index].media[0].file?.url);
        cy.wrap(cardElement)
          .find('[data-testid=Card-title]')
          .should('exist')
          .and('have.text', mockedContent.articles[index].title);
        cy.wrap(cardElement).find('[data-testid=Text-body1]').should('exist');
      });
    });
  });
});
