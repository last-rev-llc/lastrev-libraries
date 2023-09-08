const ContentSecurityPolicy = `
  default-src 'self'  *.sentry.io  *.facebook.com;
  style-src 'self' 'unsafe-inline'  *.sentry.io  fonts.googleapis.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' *.sentry.io  *.google-analytics.com *.googletagmanager.com;
  font-src 'self'  *.sentry.io  fonts.gstatic.com data:;
  img-src * data:;
  media-src * data:;
  object-src 'none';
  frame-ancestors 'self' https://app.contentful.com
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
