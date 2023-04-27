// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const lrns = require('../../lastrev.json');

const knownErrors = ['Redirect', 'ChunkLoadError'];

const sharedSentrySetup = () => {
  Sentry.setTag('lrns_version', lrns.app.version);

  const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

  Sentry.init({
    dsn: SENTRY_DSN,
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
    beforeSend(event, hint) {
      let returnedEvent = event;
      if (
        (hint?.originalException?.message && knownErrors.includes(hint.originalException.message)) ||
        (event?.exception?.values?.[0]?.type && event.exception.values[0].type === 'ChunkLoadError')
      ) {
        console.log(`Handle ${hint.originalException.message} error on path ${event?.request?.url}`);
        returnedEvent = null;
      }
      return returnedEvent;
    }
  });
};

export default sharedSentrySetup;
