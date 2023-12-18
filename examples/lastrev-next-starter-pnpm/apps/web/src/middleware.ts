import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const cspHeader = `
    default-src 'self'  *.contentful.com *.vercel.app localhost:8888 *.sentry.io  *.facebook.com vitals.vercel-insights.com *.hubapi.com *.hsforms.com *.hs-scripts.com *.hsforms.net *.hscollectedforms.net;
    style-src 'self' 'unsafe-inline'  *.sentry.io  ${process.env.NEXT_PUBLIC_MARKETO_BASE_URL} fonts.googleapis.com vitals.vercel-insights.com *.hs-scripts.com *.hsforms.net;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' ${process.env.NEXT_PUBLIC_MARKETO_BASE_URL}  *.gstatic.com *.google.com *.google-analytics.com *.googletagmanager.com vitals.vercel-insights.com *.hs-analytics.net *.hs-banner.com *.hsadspixel.net *.hscollectedforms.net *.jquery.com *.hs-scripts.com *.hsforms.net;
    font-src 'self'  *.sentry.io  fonts.gstatic.com *.hs-scripts.com *.hsforms.net data:;
    frame-src  https://forms.hsforms.com ${process.env.NEXT_PUBLIC_MARKETO_BASE_URL} *.google.com;
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

  requestHeaders.set('x-url', request.url);

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
