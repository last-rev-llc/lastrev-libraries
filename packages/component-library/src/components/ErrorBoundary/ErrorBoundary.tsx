import React from 'react';
import * as Sentry from '@sentry/react';

// export const ErrorBoundaryPropTypes = {
//   children: PropTypes.node.isRequired
// };

interface Props {
  children: React.ReactNode;
}

function FallbackComponent() {
  return <div>An error has occured</div>;
}
type Env = 'development' | 'production' | 'staging' | 'test' | string | undefined;
const NODE_ENV: Env = process.env.NODE_ENV;

export const ErrorBoundary = ({ children }: Props) => {
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog={NODE_ENV !== 'production'}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default ErrorBoundary;
