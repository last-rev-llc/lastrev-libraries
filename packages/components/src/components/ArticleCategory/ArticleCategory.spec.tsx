import * as React from 'react';
import dayjs from 'dayjs';

import ArticleCategory, { ArticleCategoryProps } from './ArticleCategory';
import { articleCategoryWithSubCategoriesMock } from './ArticleCategory.mock';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import mount from '../../../cypress/mount';

const parseNode = (node: { nodeType: string; value: any; content: any[] }) => {
  return node.nodeType === 'text' ? node.value : node.content.map((c: any) => parseNode(c)).join('');
};

describe('ArticleCategory', () => {
  context('renders correctly', () => {
    it('renders a Category with subCategories', () => {
      const mockedContent: ArticleCategoryProps = { ...articleCategoryWithSubCategoriesMock };
      mount(<ArticleCategory {...mockedContent} />);

      cy.get('[data-testid=ArticleCategory-title]').should('exist').and('have.text', mockedContent.title);

      cy.get('[data-testid=ArticleCategory-expand-collapse-button]').should('exist');

      cy.get('[data-testid=ArticleCategory-SubCategory]')
        .its('length')
        .should('eq', mockedContent.subCategories.length);
      mockedContent.subCategories.forEach((subCategory) => {
        cy.get(
          `[data-testid=ArticleCategory-SubCategory] [data-testid=ArticleCategory-SubCategory-${subCategory.id}-title]`
        ).should('have.text', subCategory.title);

        subCategory.articles.forEach((article) => {
          cy.get(
            `[data-testid=ArticleCategory-SubCategory] [data-testid=ArticleCategory-SubCategory-Article-${article.id}-title`
          ).should('have.text', article.title);

          if (article.body.json) {
            cy.get(
              `[data-testid=ArticleCategory-SubCategory] [data-testid=ArticleCategory-SubCategory-Article-${article.id}-summary`
            ).should('have.text', documentToPlainTextString(article.body.json));
          }

          cy.get(
            `[data-testid=ArticleCategory-SubCategory] [data-testid=ArticleCategory-SubCategory-Article-${article.id}-pubdate`
          ).should('have.text', dayjs(article.pubDate).format('MMM D, YYYY'));
        });
      });
    });
  });
});
