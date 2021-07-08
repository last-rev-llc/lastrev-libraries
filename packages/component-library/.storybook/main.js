module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-backgrounds',
    '@storybook/addon-storysource'
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          // "@emotion/core": toPath("node_modules/@emotion/react"),
          // "emotion-theming": toPath("node_modules/@emotion/react"),
          "@emotion/core": require.resolve('@emotion/react'),
          "emotion-theming": require.resolve('@emotion/react'),
          "@emotion/styled": require.resolve('@emotion/styled'),
        },
      },
    }
  },
};
