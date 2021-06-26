import React from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';

interface GridProps extends MuiGridProps {}

export const Section = ({ children, ...props }: GridProps) => {
  return (
    <ErrorBoundary>
      <MuiGrid container {...props}>
        {[0, 1, 2].map((k) => (
          <MuiGrid key={k} item>
            {children}
            Grid {k}
          </MuiGrid>
        ))}
      </MuiGrid>
    </ErrorBoundary>
  );
};

export default Section;
