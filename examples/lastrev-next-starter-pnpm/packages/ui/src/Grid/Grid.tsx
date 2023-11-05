import React from 'react';

import { styled } from '@mui/material/styles';

import type { GridProps, GridOwnerState } from './Grid.types';

const Grid = ({ children, overrideNested, ...props }: GridProps) => {
  const ownerState = { overrideNested };
  return (
    <Root ownerState={ownerState} {...props}>
      {children}
    </Root>
  );
};

const Root = styled('div', {
  name: 'Grid',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState?: GridOwnerState }>``;

export default Grid;
