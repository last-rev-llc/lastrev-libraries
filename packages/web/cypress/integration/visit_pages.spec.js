import pages from '../fixtures/pages.json';
import generatedPages from '../fixtures/generated_pages.json';

// Pages are generated if the file doesn't exist, to re-generate just delete the generated_pages.json
// generated_pages can also be modified to remove pages from the list
// As long as the file is present it wont be overriden
// Extra pages can be added to the pages.json
describe(`Visit pages`, () => {
  [...pages, ...generatedPages].forEach((page) => {
    it(`${page} page renders correctly`, () => {
      cy.visit(page);

      // Percy
      cy.percySnapshot();
    });
  });
});
