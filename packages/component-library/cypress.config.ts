import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,

  fileServerFolder: 'public',
  videoUploadOnPasses: false,
  video: false,
  numTestsKeptInMemory: 1,
  component: {
    specPattern: 'src/**/*spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // TODO: Enable code-coverage when https://github.com/cypress-io/code-coverage/issues/580 is fixed
      // require('@cypress/code-coverage/task')(on, config);
      // Only run video recording in CI
      // if we have a Cypress project id
      if (!config.projectId) {
        config.projectId = process.env.CYPRESS_PROJECT_ID;
        config.video = !!process.env.CYPRESS_PROJECT_ID;
      }
      return config;
    },
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  }
});
