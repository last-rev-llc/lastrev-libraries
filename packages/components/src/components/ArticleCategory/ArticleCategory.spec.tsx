import * as React from 'react';
import dayjs from 'dayjs';

import ArticleCategory, { ArticleCategoryProps } from './ArticleCategory';
import { articleCategoryWithArticlesMock, articleCategoryWithSubcategoriesMock } from './ArticleCategory.mock';
import mount from '../../../cypress/mount';

const parseNode = (node: { nodeType: string; value: any; content: any[]; }) => {
  return node.nodeType === 'text' ? node.value : node.content.map((c: any) => parseNode(c)).join('');
};

describe('ArticleCategory', () => {
  context('renders correctly', () => {
    it('renders a Category with articles', () => {
      const mockedContent: ArticleCategoryProps = { ...articleCategoryWithArticlesMock };
      mount(<ArticleCategory {...mockedContent} />);

      cy.get('[data-testid=ArticleCategory-name]').should('exist').and('have.text', mockedContent.name);

      cy.get('[data-testid=ArticleCategory-expand-collapse-button]').should('not.exist');

      cy.get('[data-testid=ArticleCategory-Article]').its('length').should('eq', mockedContent.articles.length);
      mockedContent.articles.forEach((article) => {
        cy.get(`[data-testid=ArticleCategory-Article] [data-testid=ArticleCategory-Article-${article.id}-title]`).should('have.text', article.title);
        cy.get(`[data-testid=ArticleCategory-Article] [data-testid=ArticleCategory-Article-${article.id}-summary]`).should('have.text', article.summary);
        cy.get(`[data-testid=ArticleCategory-Article] [data-testid=ArticleCategory-Article-${article.id}-pubdate]`).should('have.text', dayjs(article.pubDate).format('MMM D, YYYY'));
      });
    });

    it('renders a Category with subcategories', () => {
      const mockedContent: ArticleCategoryProps = { ...articleCategoryWithSubcategoriesMock };
      mount(<ArticleCategory {...mockedContent} />);

      cy.get('[data-testid=ArticleCategory-name]').should('exist').and('have.text', mockedContent.name);

      cy.get('[data-testid=ArticleCategory-expand-collapse-button]').should('exist');

      cy.get('[data-testid=ArticleCategory-Subcategory]').its('length').should('eq', mockedContent.subcategories.length);
      mockedContent.subcategories.forEach((subcategory) => {
        cy.get(`[data-testid=ArticleCategory-Subcategory] [data-testid=ArticleCategory-Subcategory-${subcategory.id}-name]`).should('have.text', subcategory.name);

        subcategory.articles.forEach((article) => {
          cy.get(`[data-testid=ArticleCategory-Subcategory] [data-testid=ArticleCategory-Subcategory-${subcategory.id}-Article-${article.id}-title`).should('have.text', article.title);
          cy.get(`[data-testid=ArticleCategory-Subcategory] [data-testid=ArticleCategory-Subcategory-${subcategory.id}-Article-${article.id}-summary`).should('have.text', article.summary);
          cy.get(`[data-testid=ArticleCategory-Subcategory] [data-testid=ArticleCategory-Subcategory-${subcategory.id}-Article-${article.id}-pubdate`).should('have.text', dayjs(article.pubDate).format('MMM D, YYYY'));
        });
      });
    });
  });
});
