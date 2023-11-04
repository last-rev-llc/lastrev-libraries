import React from 'react';

import { styled } from '@mui/material/styles';

import type { GridProps } from './Grid.types';

const Grid = ({ children, overrideNested, ...props }: GridProps) => {
  return (
    <Root overrideNested={overrideNested} {...props}>
      {children}
    </Root>
  );
};

const Root = styled('div', {
  name: 'Grid',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; colorScheme?: string; overrideNested?: boolean }>``;

export default Grid;
