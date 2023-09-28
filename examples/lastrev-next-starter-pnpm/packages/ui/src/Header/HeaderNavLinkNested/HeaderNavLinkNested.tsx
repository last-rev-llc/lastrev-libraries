import React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../../ErrorBoundary';
import ContentModule from '../../ContentModule';

import { type HeaderNavLinkNestedProps } from './HeaderNavLinkNested.types';

export const HeaderNavLinkNested = ({
  variant,
  subNavigation,
  sidekickLookup,
  onRequestClose,
  id: navItemId,
  ...props
}: HeaderNavLinkNestedProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const onNavItemClick = () => {
    if (onRequestClose) onRequestClose();
  };

  const onKeyDown = (evt: any) => {
    if (evt.key === 'Tab' && !open) {
      setOpen(true);
    }
  };

  return (
    <ErrorBoundary>
      <Root data-testid="HeaderNavLinkNested">
        <NavItemLink
          {...props}
          {...sidekick(sidekickLookup)}
          icon="chevron"
          onKeyDown={onKeyDown}
          onClick={onNavItemClick}
          __typename="Link"
        />
      </Root>
    </ErrorBoundary>
  );
};

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' && prop !== 'onRequestClose' && prop !== 'menuBreakpoint';

const Root = styled(Box, {
  name: 'HeaderNavLinkNested',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{}>``;

const NavItemLink = styled(ContentModule, {
  name: 'HeaderNavLinkNested',
  slot: 'NavItemLink',
  overridesResolver: (_, styles) => [styles.navItemLink]
})<{}>``;

export default HeaderNavLinkNested;
