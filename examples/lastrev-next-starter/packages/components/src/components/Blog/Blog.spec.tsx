import * as React from 'react';
import mount from '../../../cypress/mount';
import Blog from './Blog';
import mockContent from './Blog.mock';

describe('Blog', () => {
  it('renders a Blog', () => {
    mount(<Blog {...mockContent} />);
    cy.get('[data-testid=Blog]').should('exist');
    cy.get('[data-testid=Blog-title]').should('exist');
  });
});
