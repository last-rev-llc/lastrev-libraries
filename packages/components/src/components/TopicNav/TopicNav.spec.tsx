import * as React from 'react';

import TopicNav, { TopicNavProps } from './TopicNav';
import { topicNavMock } from './TopicNav.mock';
import mount from '../../../cypress/mount';

const parseNode = (node: { nodeType: string; value: any; content: any[]; }) => {
  return node.nodeType === 'text' ? node.value : node.content.map((c: any) => parseNode(c)).join('');
};

describe('TopicNav', () => {
  context('renders correctly', () => {
    it('renders a TopicNav with the provided categories', () => {
      const mockedContent: TopicNavProps = topicNavMock;
      mount(<TopicNav {...mockedContent} />);

      cy.get('[data-testid=TopicNav]').should('exist');
      cy.get('[data-testid=TopicNav-list]').should('exist');

      mockedContent.navItems.forEach((navItem) => {
        if (navItem.subNavigation) {
          cy.get(`[data-testid=TopicNav-list] [data-testid=TopicNav-categoryAccordion-${navItem.id}]`)
            .should('have.text', navItem.text);

            navItem.subNavigation.forEach((subNavItem) => {
            cy.get(`[data-testid=TopicNav-list] [data-testid=TopicNav-subCategoryLink-${subNavItem.id}]`)
              .should('have.text', subNavItem.text)
              .and('have.attr', 'href', subNavItem.href);
          });
        }
      });
    });
  });
});
