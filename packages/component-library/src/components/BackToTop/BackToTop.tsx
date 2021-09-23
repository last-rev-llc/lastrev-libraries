import React from 'react';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab, { FabProps } from '@mui/material/Fab';
import styled from '@mui/system/styled';
import useScrollTrigger from '@mui/material/useScrollTrigger';
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
        {...sidekick(sidekickLookup)}>
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
})<{ variant?: string; visible?: boolean }>`
  position: fixed;
  bottom: 16px;
  right: 16px;
  transition: 0.3s ease-in-out;
  ${({ visible }) => `
  transform: translateY(${visible ? 0 : 100}px);
  `};
`;

export default BackToTop;
