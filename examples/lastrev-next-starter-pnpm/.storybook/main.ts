import { join, dirname, resolve } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions')
  ],

  framework: {
    name: getAbsolutePath('@storybook/nextjs')
  },
  async webpackFinal(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': getAbsolutePath('react'),
      '@emotion/react': getAbsolutePath('@emotion/react')
    };
    return config;
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;