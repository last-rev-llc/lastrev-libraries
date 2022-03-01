import * as React from 'react';

import PageTopic, { PageTopicProps } from './PageTopic';
import { pageTopicMock } from './PageTopic.mock';
import mount from '../../../cypress/mount';

const parseNode = (node: { nodeType: string; value: any; content: any[] }) => {
  return node.nodeType === 'text' ? node.value : node.content.map((c: any) => parseNode(c)).join('');
};

describe('PageTopic', () => {
  context('Renders correctly', () => {
    it('Renders an PageTopic with all fields provided', () => {
      const mockedContent: PageTopicProps = { ...pageTopicMock };
      mount(<PageTopic {...(mockedContent as any)} />);
      cy.get('[data-testid=Header]').should('not.exist');
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=TopicNav]').should('exist');
      cy.get('[data-testid=BackToTop]').should('exist');
      cy.get('[data-testid=Footer]').should('not.exist');
    });
  });
});
