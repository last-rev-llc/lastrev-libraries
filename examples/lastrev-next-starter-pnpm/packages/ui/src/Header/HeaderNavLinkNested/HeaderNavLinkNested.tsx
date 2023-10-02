import React from 'react';

import { styled } from '@mui/material/styles';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../../ErrorBoundary';
import ContentModule from '../../ContentModule';

import type { HeaderNavLinkNestedProps, HeaderNavLinkNestedOwnerState } from './HeaderNavLinkNested.types';

const HeaderNavLinkNested = (props: HeaderNavLinkNestedProps) => {
  const ownerState = { ...props };

  const { sidekickLookup, onRequestClose, id: navItemId } = props;

  const onNavItemClick = () => {
    if (onRequestClose) onRequestClose();
  };

  return (
    <ErrorBoundary>
      <NavItemLink
        data-testid="HeaderNavLinkNested"
        {...props}
        {...sidekick(sidekickLookup)}
        icon="chevron"
        onClick={onNavItemClick}
        __typename="Link"
        ownerState={ownerState}
      />
    </ErrorBoundary>
  );
};

const NavItemLink = styled(ContentModule, {
  name: 'HeaderNavLinkNested',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.navItemLink]
})<{ ownerState: HeaderNavLinkNestedOwnerState }>``;

export default HeaderNavLinkNested;
