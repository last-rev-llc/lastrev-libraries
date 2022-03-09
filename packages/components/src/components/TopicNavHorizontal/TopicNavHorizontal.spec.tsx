import * as React from 'react';

import TopicNavHorizontal, { TopicNavHorizontalProps } from './TopicNavHorizontal';
import mockNavigationItem from '../NavigationItem/NavigationItem.mock';
import mount from '../../../cypress/mount';

const parseNode = (node: { nodeType: string; value: any; content: any[] }) => {
  return node.nodeType === 'text' ? node.value : node.content.map((c: any) => parseNode(c)).join('');
};

describe('TopicNavHorizontal', () => {
  context('renders correctly', () => {
    it('renders a TopicNavHorizontal with the provided categories', () => {
      const mockedContent: TopicNavHorizontalProps = {
        navItems: [mockNavigationItem(), mockNavigationItem(), mockNavigationItem()]
      };
      mount(<TopicNavHorizontal {...mockedContent} />);

      cy.get('[data-testid=TopicNav-Horizontal]').should('exist');
      cy.get('[data-testid=TopicNav-Horizontal-List').should('exist');

      mockedContent.navItems.forEach((navItem) => {
        if (navItem) {
          cy.get(`[data-testid="TopicNav-Horizontal-List"] [data-testid="TopicNav-Horizontal-List-Link-${navItem.id}"]`)
            .children('div')
            .first()
            .children('a')
            .first()
            .should('exist');

          cy.get(`[data-testid="TopicNav-Horizontal-List"] [data-testid="TopicNav-Horizontal-List-Link-${navItem.id}"]`)
            .children('div')
            .first()
            .children('a')
            .first()
            .should('have.text', navItem.text)
            .and('have.attr', 'href', navItem.href);
        }
      });
    });
  });
});
