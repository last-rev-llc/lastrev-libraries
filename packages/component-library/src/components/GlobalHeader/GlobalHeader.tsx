import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import Grid from '../Grid';

interface HeaderProps {}

export const GlobalHeader = ({ ...props }: HeaderProps) => {
  return (
    <ErrorBoundary>
      <Grid {...props}>&nbsp; [ Placeholder ] &nbsp;</Grid>
    </ErrorBoundary>
  );
};

export default GlobalHeader;
