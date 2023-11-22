// TODO: Add CSP policies and security headers
// TODO: Add support for localization (i18n)
const { withSentryConfig } = require('@sentry/nextjs');
const { client } = require('graphql-sdk/dist/client');

const preview = process.env.CONTENTFUL_USE_PREVIEW === 'true';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE?.toLowerCase() === 'true'
});

const hasAllSentryVars = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

if (!hasAllSentryVars) {
  console.warn('Sentry is disabled.  Please check your environment variables.');
}

let config = {
  productionBrowserSourceMaps: true,
  typescript: {
    // !! WARN !!
    // TODO: Clean all typescript build errors
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  ...(hasAllSentryVars && {
    sentry: {
      disableServerWebpackPlugin: !hasAllSentryVars,
      disableClientWebpackPlugin: !hasAllSentryVars,
      hideSourceMaps: false,
      widenClientFileUpload: true
    }
  }),
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['ui', 'graphql-sdk', '@mui/material', '@mui/system', '@mui/icons-material'],
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}'
    }
  },
  images: {
    domains: ['images.ctfassets.net'],
    formats: ['image/avif', 'image/webp']
  },
  env: {
    CONTENTFUL_SETTINGS_ID: process.env.CONTENTFUL_SETTINGS_ID,
    GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
    CONTENTFUL_USE_PREVIEW: process.env.CONTENTFUL_USE_PREVIEW,
    SITE: process.env.SITE,
    SITE_SETTINGS: process.env.SITE_SETTINGS,
    DEFAULT_SITE_ID: process.env.DEFAULT_SITE_ID,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
    CONTENTFUL_ENV: process.env.CONTENTFUL_ENV,
    ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
    DEPLOY_URL: process.env.DEPLOY_URL
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc'
    };
    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        '@mui/styled-engine': '@mui/styled-engine-sc'
      }
    }
  },
  async redirects() {
    const { data } = await client.Redirects({ preview });
    return data?.redirects ?? [];
  },
  async rewrites() {
    const { data } = await client.Rewrites({ preview });
    return data?.rewrites ?? [];
  }
};

if (hasAllSentryVars) config = withSentryConfig(config);
config = withBundleAnalyzer(config);
module.exports = config;
