import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

export const Section = ({
  ...props
}) => {
  return (
    <ErrorBoundary>
      <section {...props}>
        Section
      </section>
    </ErrorBoundary>
  );
};

export default Section;
