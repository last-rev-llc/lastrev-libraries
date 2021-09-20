import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab, { FabProps } from '@mui/material/Fab';
import styled from '@mui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import sidekick from '../../utils/sidekick';

export interface BackToTopProps {
  FabProps?: FabProps;
  theme?: any;
  sidekickLookup?: any;
}

export const BackToTop = ({ FabProps, sidekickLookup }: BackToTopProps) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <ErrorBoundary>
      <Root {...(FabProps as any)} onClick={handleClick} data-testid="BackToTop" {...sidekick(sidekickLookup)}>
        <KeyboardArrowUpIcon />
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Fab, {
  name: 'BackToTop',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<FabProps>`
  position: fixed;
  bottom: 16px;
  right: 16px;
`;

export default BackToTop;
