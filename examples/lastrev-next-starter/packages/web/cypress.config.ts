import { defineConfig } from 'cypress';
import path from 'path';

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  videoUploadOnPasses: false,
  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // TODO: Enable after instrumenting the web production code
      // require('@cypress/code-coverage/task')(on, config);
      const nextPagesPath = path.resolve(__dirname, './.next/server/pages');
      const fixturePagesPath = path.resolve(__dirname, './cypress/fixtures');
      const integrationPath = path.resolve(__dirname, './cypress/e2e');

      require('@last-rev/testing-library/src/cypress/plugins/generatePages')({
        nextPagesPath,
        fixturePagesPath,
        integrationPath
      });
      return config;
    },
    baseUrl: 'http://localhost:3000'
  }
});
