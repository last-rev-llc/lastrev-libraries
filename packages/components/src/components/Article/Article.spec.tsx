import * as React from 'react';
import dayjs from 'dayjs';

import Article, { ArticleProps } from './Article';
import { articleMock } from './Article.mock';
import mount from '../../../cypress/mount';

const parseNode = (node: { nodeType: string; value: any; content: any[]; }) => {
  return node.nodeType === 'text' ? node.value : node.content.map((c: any) => parseNode(c)).join('');
};

describe('Article', () => {
  context('renders correctly', () => {
    it('renders an Article with all fields provided', () => {
      const mockedContent: ArticleProps = { ...articleMock };
      mount(<Article {...mockedContent} />);
      cy.get('[data-testid=Article]').should('exist');
      cy.get('[data-testid=Article-head] [data-testid=ArticleHead-title]').should('exist').and('have.text', mockedContent.title);
      cy.get('[data-testid=Article-head] [data-testid=ArticleHead-pubDate]').should('exist').and('have.text', dayjs(mockedContent.pubDate).format('MMM D, YYYY'));
      cy.get('[data-testid=Article-head] [data-testid=ArticleHead-summary]').should('exist').and('have.text', mockedContent.summary);

      cy.get('[data-testid=Article-body]').should('exist');
      // TODO: find out if this should work
      // cy.get('[data-testid=Article-body] [data-testid=Text-root]').should('exist').and('have.text', parseNode(mockedContent?.body?.json));

      cy.get('[data-testid=Article-relatedLinks]').should('exist');
      cy.get('[data-testid=Article-relatedLinks] a').each((link, index) => {
        cy.wrap(link)
          .should('have.attr', 'href', `/${mockedContent.relatedLinks[index].href}`)
          .and('have.text', mockedContent.relatedLinks[index].text)
      });

      cy.get('[data-testid=Article-categories]').should('exist');
      cy.get('[data-testid=Article-categories] a').each((link, index) => {
        cy.wrap(link)
          .should('have.attr', 'href', `/${mockedContent.categories[index].href}`)
          .and('have.text', mockedContent.categories[index].text)
      });

      cy.get('[data-testid=Article-footerItems-Section]').should('exist');
    });

    it('renders an Article with no unrequired fields provided', () => {
      const mockedContent: ArticleProps = { ...articleMock };
      mount(<Article slug={mockedContent?.slug} />);
      cy.get('[data-testid=Article]').should('exist');
      cy.get('[data-testid=Article-head] [data-testid=ArticleHead-title]').should('not.exist');
      cy.get('[data-testid=Article-head] [data-testid=ArticleHead-pubDate]').should('not.exist');
      cy.get('[data-testid=Article-head] [data-testid=ArticleHead-summary]').should('not.exist');
      cy.get('[data-testid=Article-featuredMedia]').should('not.exist');
      cy.get('[data-testid=Article-body] [data-testid=Text-root]').should('not.exist');
      cy.get('[data-testid=Article-relatedLinks]').should('not.exist');
      cy.get('[data-testid=Article-categories]').should('not.exist');
      cy.get('[data-testid=Article-footerItems-Section]').should('not.exist');
      cy.get('[data-testid=Article-sideNav]').should('not.exist');
    });

    /**
     * NOTE: `featuredMedia` and `slug` not visible on page,
     * however, are referenced in the LD+JSON schema data
     * rendered in the <Article/> component using Next <Head>
     * - That may be testable in the <PageArticle/> spec:
     * - https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-test-the-HTML-lt-head-gt-element
     */
    // it('looks in head <script> tag for ld+json schema data', () => {
    //   cy.get('head script[type="application/ld+json"]').should(
    //     'have.text',
    //     'content here...'
    //   )
    // })
  });
});