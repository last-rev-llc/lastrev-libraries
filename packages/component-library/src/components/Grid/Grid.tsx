import React from 'react';
import {
  Grid as MuiGrid,
  GridProps as MuiGridProps
} from '@material-ui/core';

interface GridProps extends MuiGridProps {}

export const Section = ({
  children,
  ...props
}: GridProps) => {
  return (
    <MuiGrid container {...props}>
      {[0, 1, 2].map((k) => (
        <MuiGrid key={k} item>
          {children}
          Grid {k}
        </MuiGrid>
      ))}
    </MuiGrid>
  );
};

export default Section;
