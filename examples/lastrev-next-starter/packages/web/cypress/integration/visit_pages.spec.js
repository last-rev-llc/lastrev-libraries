import pages from '../fixtures/pages.json';
// Pages are generated by running the following code snippet on the browser
// base=window.location.origin; new Set([...document.querySelectorAll('a')].map(a => a.href.replace(base, '')).filter(href => href[0]=='/' &&href[1]!=='#'))

describe(`Visit pages`, () => {
  pages.forEach((page) => {
    it(`${page} page renders correctly`, () => {
      cy.visit(page);

      // Percy
      cy.percySnapshot();
    });
  });
});