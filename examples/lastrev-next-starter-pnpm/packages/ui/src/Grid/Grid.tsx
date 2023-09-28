import React from 'react';

import { styled } from '@mui/material/styles';

import type { GridProps } from './Grid.types';

const Grid = ({ children, ...props }: GridProps) => {
  return <Root {...props}>{children}</Root>;
};

const Root = styled('div', {
  name: 'Grid',
  slot: 'Root',
  // shouldForwardProp: (prop) => shouldForwardProp(prop as string) && prop !== 'id',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; colorScheme?: string }>``;

export default Grid;
