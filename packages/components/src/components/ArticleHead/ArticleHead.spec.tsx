import * as React from 'react';
import dayjs from 'dayjs';

import ArticleHead, { ArticleHeadProps } from './ArticleHead';
import { articleHeadMock } from './ArticleHead.mock';
import mount from '../../../cypress/mount';

describe('ArticleHead', () => {
  context('renders correctly', () => {
    it('renders an ArticleHead component with all fields provided', () => {
      const mockedContent: ArticleHeadProps = { ...articleHeadMock };
      mount(<ArticleHead {...mockedContent} />);
      cy.get('[data-testid=ArticleHead-title]').should('exist').and('have.text', mockedContent.title);
      cy.get('[data-testid=ArticleHead-pubDate]').should('exist').and('have.text', dayjs(mockedContent.pubDate).format('MMM D, YYYY'));
      cy.get('[data-testid=ArticleHead-summary]').should('exist').and('have.text', mockedContent.summary);
    });

    it('renders an ArticleHead component with no unrequired fields provided', () => {
      mount(<ArticleHead />);
      cy.get('[data-testid=ArticleHead-title]').should('not.exist');
      cy.get('[data-testid=ArticleHead-pubDate]').should('not.exist');
      cy.get('[data-testid=ArticleHead-summary]').should('not.exist');
    });
  });
});
