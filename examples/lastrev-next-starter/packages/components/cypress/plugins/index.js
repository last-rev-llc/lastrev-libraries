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
const toPath = (_path) => path.join(process.cwd(), _path);
const webpack = require('webpack');
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  require('@cypress/code-coverage/task')(on, config);
  if (config.testingType === 'component') {
    require('@cypress/react/plugins/babel')(on, config, {
      setWebpackConfig: (webpackConfig) => {
        webpackConfig.plugins = webpackConfig.plugins ?? [];
        webpackConfig.plugins.push(
          new webpack.ProvidePlugin({
            process: 'process/browser'
          })
        );

        webpackConfig.resolve.alias = {
          ...webpackConfig.resolve.alias,
          'react': toPath('../../node_modules/react'),
          '@emotion/core': toPath('../../node_modules/@emotion/react'),
          'emotion-theming': toPath('../../node_modules/@emotion/react')
        };
        webpackConfig.module.rules.push({
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        });

        return webpackConfig;
      }
    });
  }

  // Only run video recording in CI
  // if we have a Cypress project id
  if (!config.projectId) {
    config.projectId = process.env.CYPRESS_PROJECT_ID;
    config.video = !!process.env.CYPRESS_PROJECT_ID;
  }

  return config;
};
