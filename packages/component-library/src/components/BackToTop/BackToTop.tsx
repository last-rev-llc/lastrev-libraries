import React from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Fab, { FabProps } from '@material-ui/core/Fab';
import { styled } from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';
import sidekick from '../../utils/sidekick';

export interface BackToTopProps {
  FabProps?: FabProps;
  theme: any;
  sidekickLookup: any;
}

export const BackToTop = ({ FabProps, sidekickLookup }: BackToTopProps) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <ErrorBoundary>
      <Root {...FabProps} onClick={handleClick} data-testid="BackToTop" {...sidekick(sidekickLookup)}>
        <KeyboardArrowUpIcon />
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Fab, {
  name: 'BackToTop',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

export default BackToTop;
