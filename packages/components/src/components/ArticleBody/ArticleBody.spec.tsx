import * as React from 'react';

import ArticleBody, { ArticleBodyProps } from './ArticleBody';
import { articleBodyMock } from './ArticleBody.mock';
import mount from '../../../cypress/mount';

describe('ArticleBody', () => {
  context('renders correctly', () => {
    it('renders an ArticleBody component with all fields provided', () => {
      const mockedContent: ArticleBodyProps = { ...articleBodyMock };
      mount(<ArticleBody {...mockedContent} />);
      cy.get('[data-testid=ArticleBody]').should('exist');
    });

    it('renders an ArticleBody component with no unrequired fields provided', () => {
      mount(<ArticleBody />);
      cy.get('[data-testid=ArticleBody]').should('not.exist');
    });
  });
});
