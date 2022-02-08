import * as React from 'react';
import dayjs from 'dayjs';

import TopicNav, { TopicNavProps } from './TopicNav';
import { articleCategoriesMock } from './TopicNav.mock';
import mount from '../../../cypress/mount';

const parseNode = (node: { nodeType: string; value: any; content: any[]; }) => {
  return node.nodeType === 'text' ? node.value : node.content.map((c: any) => parseNode(c)).join('');
};

describe('TopicNav', () => {
  context('renders correctly', () => {
    it('renders a TopicNav with the provided categories', () => {
      const mockedContent: TopicNavProps = { categories: [...articleCategoriesMock] };
      mount(<TopicNav {...mockedContent} />);

      cy.get('[data-testid=TopicNav]').should('exist');
      cy.get('[data-testid=TopicNav-list]').should('exist');

      mockedContent.categories.forEach((category) => {
        if (category.articles) {
          cy.get(`[data-testid=TopicNav-list] [data-testid=TopicNav-categoryLink-${category.id}]`)
            .should('have.text', category.name)
            .and('have.attr', 'href', `/#${category.id}`);

          return;
        }

        if (category.subcategories) {
          cy.get(`[data-testid=TopicNav-list] [data-testid=TopicNav-categoryAccordion-${category.id}]`)
            .should('have.text', category.name);

          category.subcategories.forEach((subcategory) => {
            cy.get(`[data-testid=TopicNav-list] [data-testid=TopicNav-subcategoryLink-${subcategory.id}]`)
              .should('have.text', subcategory.name)
              .and('have.attr', 'href', `/#${subcategory.id}`);
          });
        }
      });
    });
  });
});
