// TODO: Add CSP policies and security headers
// TODO: Add support for localization (i18n)
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE?.toLowerCase() === 'true'
});

const hasAllSentryVars = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

if (!hasAllSentryVars) {
  console.warn('Sentry is disabled.  Please check your environment variables.');
}

let config = {
  typescript: {
    // !! WARN !!
    // TODO: Clean all typescript build errors
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  sentry: {
    disableServerWebpackPlugin: !hasAllSentryVars,
    disableClientWebpackPlugin: !hasAllSentryVars,
    hideSourceMaps: true,
    widenClientFileUpload: true
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['ui', 'graphql-sdk'],
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
    DEPLOY_URL: process.env.DEPLOY_URL
  }
};

if (hasAllSentryVars) config = withSentryConfig(config);
config = withBundleAnalyzer(config);
module.exports = config;
