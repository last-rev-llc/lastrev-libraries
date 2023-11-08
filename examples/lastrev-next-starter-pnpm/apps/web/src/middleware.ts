import { NextResponse } from 'next/server';

export function middleware() {
  const cspHeader = `
    default-src 'self'  *.sentry.io  *.facebook.com vitals.vercel-insights.com *.hubapi.com *.hsforms.com *.hs-scripts.com *.hsforms.net *.hscollectedforms.net;
    style-src 'self' 'unsafe-inline'  *.sentry.io  fonts.googleapis.com vitals.vercel-insights.com *.hs-scripts.com *.hsforms.net;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.sentry.io  *.google-analytics.com *.googletagmanager.com vitals.vercel-insights.com *.hs-analytics.net *.hs-banner.com *.hsadspixel.net *.hscollectedforms.net *.jquery.com *.hs-scripts.com *.hsforms.net;
    connect-src 'self' formspree.io;
    font-src 'self'  *.sentry.io  fonts.gstatic.com *.hs-scripts.com *.hsforms.net data:;
    frame-src  https://forms.hsforms.com;
    img-src * data:;
    media-src * data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors https://app.contentful.com https://lastrev.com https://lr-live-editor.netlify.app;
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

  const requestHeaders = new Headers();
  const securityHeaders = [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
      key: 'Content-Security-Policy',
      value: cspHeader.replace(/\s{2,}/g, ' ').trim()
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
  // Setting request headers
  securityHeaders.forEach(({ key, value }) => {
    requestHeaders.set(key, value);
  });

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
};
