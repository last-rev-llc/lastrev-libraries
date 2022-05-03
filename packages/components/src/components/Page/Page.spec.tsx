import * as React from 'react';

import mount from '../../../cypress/mount';
import Page from './Page';
import { pageGeneralMock } from './Page.mock';

const parseNode = (node: { nodeType: string; value: any; content: any[] }) => {
  return node.nodeType === 'text' ? node.value : node.content.map((c: any) => parseNode(c)).join('');
};

describe('Page', () => {
  context('Renders correctly', () => {
    it('Renders an Page with all fields provided', () => {
      const mockedContent = { ...pageGeneralMock() };
      mount(<Page {...(mockedContent as any)} />);
      cy.get('[data-testid=Header]').should('not.exist');
      cy.get('[data-testid=Hero]').should('exist');
      mockedContent.contents.forEach((content) => {
        cy.get(`[data-testid=${content.__typename}]`).should('exist');
      });
      cy.get('[data-testid=Breadcrumbs]').should('exist');
      cy.get('[data-testid=BackToTop]').should('exist');
      cy.get('[data-testid=Footer]').should('not.exist');
    });
  });
});
