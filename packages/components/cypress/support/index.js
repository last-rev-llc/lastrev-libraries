// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '@percy/cypress';
import '@cypress/code-coverage/support';
import * as NextRouter from 'next/router';

// Alternatively you can use CommonJS syntax:
// require('./commands')
crypto.randomUUID();

// Setup the Aloglia search keys
process.env.ALGOLIA_APP_ID = Cypress.env('algolia_app_id');
process.env.ALGOLIA_SEARCH_API_KEY = Cypress.env('algolia_search_api_key');

before(() => {
  cy.stub(NextRouter, 'useRouter').returns({
    prefetch: () => new Promise((resolve, reject) => {}),
    pathname: '',
    route: '',
    query: {},
    asPath: '',
    isFallback: false,
    basePath: '',
    events: { emit: cy.spy(), off: cy.spy(), on: cy.spy() },
    push: cy.spy(),
    replace: cy.spy(),
    reload: cy.spy(),
    back: cy.spy(),

    isReady: true,
    isPreview: false,
    isLocaleDomain: false,
    beforePopState: cy.spy()
  });
});
