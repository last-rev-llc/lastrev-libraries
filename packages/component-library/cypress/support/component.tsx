// ***********************************************************
// This example support/component.ts is processed and
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
import '@percy/cypress';

import faker from 'faker';
import '../../src/styles.scss';
import mount from '../mount';

// TODO: Enable code-coverage when https://github.com/cypress-io/code-coverage/issues/580 is fixed
// import '@cypress/code-coverage/support';

// import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

faker.seed(123);

Cypress.Commands.add('mount', mount);

// Example use:
// cy.mount(<MyComponent />)
