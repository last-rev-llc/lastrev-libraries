import React from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Fab, { FabProps } from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
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
  const trigger = useScrollTrigger();

  return (
    <ErrorBoundary>
      <Box display={trigger ? 'none' : 'flex'}>
        <Root {...FabProps} onClick={handleClick} data-testid="BackToTop" {...sidekick(sidekickLookup)}>
          <KeyboardArrowUpIcon />
        </Root>
      </Box>
    </ErrorBoundary>
  );
};

const Root = styled(Fab, {
  name: 'BackToTop',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>`
  position: fixed;
  bottom: 16px;
  right: 16px;
`;

export default BackToTop;
