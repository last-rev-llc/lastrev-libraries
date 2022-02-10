const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          sassOptions: {
            modules: {
              globalModulePaths: [/src\/styles/],
              exportGlobals: true
            }
          }
        }
      }
    },
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-backgrounds',
    '@storybook/addon-storysource'
  ],
  webpackFinal: async (config) => {
    const plugin = config.plugins.find((plugin) => plugin ? plugin.definitions?.['process.env'] : null);
    if (plugin) {
      plugin.definitions['process.env.ALGOLIA_APP_ID'] = JSON.stringify(process.env.ALGOLIA_APP_ID);
      plugin.definitions['process.env.ALGOLIA_SEARCH_API_KEY'] = JSON.stringify(process.env.ALGOLIA_SEARCH_API_KEY);
    }
  
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/css': toPath('../../node_modules/@emotion/css'),
          '@emotion/core': toPath('../../node_modules/@emotion/react'),
          'emotion-theming': toPath('../../node_modules/@emotion/react')
        }
      }
    };
  }
};
