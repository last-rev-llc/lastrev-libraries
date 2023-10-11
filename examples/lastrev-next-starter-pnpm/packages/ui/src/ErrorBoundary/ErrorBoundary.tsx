import React from 'react';
import type { ErrorBoundaryProps } from './ErrorBoundary.types';

function FallbackComponent() {
  return <div>An error has occured</div>;
}
type Env = 'development' | 'production' | 'staging' | 'test' | string | undefined;
const NODE_ENV: Env = process.env.NODE_ENV;

class BaseErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: {
    hasError: boolean;
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return (
    <BaseErrorBoundary fallback={<FallbackComponent />} showDialog={NODE_ENV !== 'production'}>
      {children}
    </BaseErrorBoundary>
  );
};

export default ErrorBoundary;
