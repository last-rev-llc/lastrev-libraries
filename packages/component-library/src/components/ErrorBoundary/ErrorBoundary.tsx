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

// TODO only show dialog on staging
export const ErrorBoundary = ({ children }: Props) => {
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog={false}>
      {children}
    </Sentry.ErrorBoundary>
  );
}

export default ErrorBoundary;
