const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  core: {
    builder: 'webpack5'
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (['id', '__typename', 'sidekickLookup'].includes(prop)) {
          return false;
        }
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
      }
    }
  },
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
    '@storybook/addon-storysource',
    'storybook-addon-react-docgen'
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      type: 'javascript/auto',
      test: /\.mjs$/,
      include: /node_modules/
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('../../node_modules/@emotion/react'),
          'emotion-theming': toPath('../../node_modules/@emotion/react')
        }
      }
    };
  }
};
