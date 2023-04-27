import NextErrorComponent from 'next/error';
import * as Sentry from '@sentry/nextjs';

const MyError = ({ statusCode }: any) => {
  // If you're using a Nextjs version prior to 12.2.1, uncomment this to
  // compensate for https://github.com/vercel/next.js/issues/8592
  // Sentry.captureUnderscoreErrorException(props);

  return <NextErrorComponent statusCode={statusCode} />;
};

MyError.getInitialProps = async (contextData: any) => {
  const { res, err, asPath } = contextData;

  const statusCode = res?.statusCode ?? err?.statusCode;

  if (statusCode === 404) {
    console.log(`Handle 404 error on path ${asPath}`);
    return { statusCode };
  }

  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  return NextErrorComponent.getInitialProps(contextData);
};

export default MyError;
