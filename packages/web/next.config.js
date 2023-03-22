require('dotenv').config();
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@ias/components', '@last-rev/component-library']);
const { withSentryConfig } = require('@sentry/nextjs');

// Allow bundle analysis via ANALYZE_BUNDLE env variable
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!(process.env.ANALYZE_BUNDLE && process.env.ANALYZE_BUNDLE.toLowerCase() === 'true')
});

const nextConfig = {
  /**
   * @type {import('next').NextConfig}
   */
  i18n: {
    /**
     * Add new locales below
     * -- Also to the localeMapping obj in /components/src/utils/getLanguageByLocale
     */
    locales: [
      'en-US',
      'es-419',
      'fr-FR',
      'de-DE',
      'it-IT',
      'ja-JP',
      'pt-BR',
      'ko-KR',
      'id-ID',
      'zh-CN',
      'th-TH',
      'vi-VN'
    ],
    defaultLocale: 'en-US'
  },
  reactStrictMode: true,
  env: {
    CONTENTFUL_SETTINGS_ID: process.env.CONTENTFUL_SETTINGS_ID,
    GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
    CONTENTFUL_USE_PREVIEW: process.env.CONTENTFUL_USE_PREVIEW,
    SITE: process.env.SITE,
    SITE_SETTINGS: process.env.SITE_SETTINGS,
    DEFAULT_SITE_ID: process.env.DEFAULT_SITE_ID,
    SITE_ID: process.env.DEFAULT_SITE_ID,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
    CONTENTFUL_ENV: process.env.CONTENTFUL_ENV,
    OKTA_AUTH_DOMAIN: process.env.OKTA_AUTH_DOMAIN,
    USER_AUTH_DOMAIN: process.env.USER_AUTH_DOMAIN,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
    PROTECTED_PAGE_REQUIRED_ROLE: process.env.PROTECTED_PAGE_REQUIRED_ROLE
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  experimental: {
    workerThreads: false,
    cpus: 4
  },
  webpack: (config) => {
    // Important: return the modified config
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve(__dirname, '../../node_modules', 'react'),
      '@mui': path.resolve(__dirname, '../../node_modules/@mui')
    };
    return config;
  }
};

module.exports = withPlugins([[withTM], withBundleAnalyzer, [withSentryConfig]], nextConfig);
