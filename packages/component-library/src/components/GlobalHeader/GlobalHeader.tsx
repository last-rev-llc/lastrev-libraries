import React from 'react';
import Grid from '../Grid'

interface HeaderProps {}

export const GlobalHeader = ({
  ...props
}: HeaderProps) => {

  return (
    <Grid {...props}>
      &nbsp; [ Placeholder ] &nbsp;
    </Grid>
  );
};

export default GlobalHeader;
