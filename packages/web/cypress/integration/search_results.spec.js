describe(`Performing a search returns some resuls`, () => {
  // only run tests on helpcenter site, since prc is behind auth flow
  if (Cypress.env('SITE') !== 'RESOURCE') {
    it(`ensures the results page has results`, () => {
      cy.visit('/');
      cy.get('[data-testid="AutocompleteBox"] input').type('ias');
      expect(cy.get('#autocomplete-0-item-0')).to.exist;
    });
  }
});
