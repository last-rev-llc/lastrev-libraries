require('dotenv').config();
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@lrns/components', '@last-rev/component-library']);

// Allow bundle analysis via ANALYZE_BUNDLE env variable
const enableAnalyzer = !!(process.env.ANALYZE_BUNDLE && process.env.ANALYZE_BUNDLE.toLowerCase() === 'true');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: enableAnalyzer
});

const ContentSecurityPolicy = `
  default-src 'self'  *.sentry.io  *.facebook.com;
  style-src 'self' 'unsafe-inline'  *.sentry.io  fonts.googleapis.com;
  script-src 'self' 'unsafe-inline'  *.sentry.io  *.google-analytics.com *.googletagmanager.com;
  font-src 'self'  *.sentry.io  fonts.gstatic.com data:;
  img-src * data:;
  media-src * data:;
  object-src 'none';
`;

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

const nextConfig = {
  ...(process.env.NODE_ENV === 'production' && {
    async headers() {
      return [
        {
          // Apply these headers to all routes in your application.
          source: '/:path*',
          headers: securityHeaders
        }
      ];
    }
  }),
  /**
   * @type {import('next').NextConfig}
   */
  experimental: {
    images: {
      allowFutureImage: true
    }
  },
  i18n: {
    // TODO: generate these and read from that
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  reactStrictMode: true,
  env: {
    CONTENTFUL_SETTINGS_ID: process.env.CONTENTFUL_SETTINGS_ID,
    GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
    CONTENTFUL_USE_PREVIEW: process.env.CONTENTFUL_USE_PREVIEW,
    SITE: process.env.SITE,
    SITE_SETTINGS: process.env.SITE_SETTINGS,
    DEFAULT_SITE_ID: process.env.DEFAULT_SITE_ID || process.env.SITE_ID,
    SITE_ID: process.env.DEFAULT_SITE_ID || process.env.SITE_ID,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
    CONTENTFUL_ENV: process.env.CONTENTFUL_ENV,
    DEPLOY_URL: process.env.DEPLOY_URL
  },
  productionBrowserSourceMaps: enableAnalyzer,
  images: {
    domains: ['images.ctfassets.net'],
    // Disabled as it's timing out on Netlify
    // formats: ['image/avif', 'image/webp']
    formats: ['image/webp']
  },
  ...(!process.env.SENTRY_PROJECT && {
    sentry: {
      disableServerWebpackPlugin: true,
      disableClientWebpackPlugin: true
    }
  }),
  webpack: (config, { webpack }) => {
    // Important: return the modified config
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve(__dirname, '../../node_modules', 'react'),
      '@emotion/react': path.resolve(__dirname, '../../node_modules', '@emotion/react'),
      '@mui': path.resolve(__dirname, '../../node_modules/@mui')
    };
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false
      })
    );
    return config;
  }
};

module.exports = withPlugins([[withTM], withBundleAnalyzer], nextConfig);
