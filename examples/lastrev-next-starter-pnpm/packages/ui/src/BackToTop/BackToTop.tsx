import React from 'react';

import { styled } from '@mui/material/styles';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';

import type { BackToTopProps, BackToTopOwnerState } from './BackToTop.types';

const BackToTop = (props: BackToTopProps) => {
  const ownerState = { ...props };

  const { FabProps, sidekickLookup } = props;

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 500
  });

  return (
    <ErrorBoundary>
      <Root
        visible={trigger}
        {...(FabProps as any)}
        onClick={handleClick}
        data-testid="BackToTop"
        aria-label="Back to top"
        {...sidekick(sidekickLookup)}
        ownerState={ownerState}>
        <KeyboardArrowUpIcon />
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Fab, {
  name: 'BackToTop',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'visible',
  overridesResolver: (_, styles) => [styles.root]
})<{ visible?: boolean; ownerState: BackToTopOwnerState }>``;

export default BackToTop;
