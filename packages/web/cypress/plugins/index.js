/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const path = require('path');
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  require('@cypress/code-coverage/task')(on, config);
  const nextPagesPath = path.resolve(__dirname, '../../.next/server/pages');
  const fixturePagesPath = path.resolve(__dirname, '../../cypress/fixtures');
  const integrationPath = path.resolve(__dirname, '../../cypress/integration');

  require('@last-rev/testing-library/src/cypress/plugins/generatePages')({
    nextPagesPath,
    fixturePagesPath,
    integrationPath
  });
  return config;
};