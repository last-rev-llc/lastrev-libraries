require('dotenv').config();
const path = require('path');

module.exports = {
  i18n: {
    // TODO: generate these and read from that
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    CONTENTFUL_SETTINGS_ID: process.env.CONTENTFUL_SETTINGS_ID,
    GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
    CONTENTFUL_USE_PREVIEW: process.env.CONTENTFUL_USE_PREVIEW,
    SITE: process.env.SITE
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve(__dirname, '../../node_modules', 'react'),
      '@mui': path.resolve(__dirname, '../../node_modules/@mui')
    };
    return config;
  }
};
