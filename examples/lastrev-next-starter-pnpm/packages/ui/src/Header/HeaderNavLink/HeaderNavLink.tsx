import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../../ErrorBoundary';
import ContentModule from '../../ContentModule';

// import { getFirstOfArray } from '../../utils/getFirstOfArray';

import type { HeaderNavLinkProps, HeaderNavLinkOwnerState } from './HeaderNavLink.types';

const HeaderNavLink = (props: HeaderNavLinkProps) => {
  const ownerState = {
    ...props,
    numOfCols: props.subNavigation?.length || 1
  };

  const { navMedia, variant, subNavigation, sidekickLookup, onRequestClose, id: navItemId } = props;

  const onNavItemClick = (evt: any) => {
    if (subNavigation?.length) {
      evt.preventDefault();
      evt.stopPropagation();
      if (document.activeElement instanceof HTMLElement) {
        evt?.target?.blur();
      }
    } else {
      if (onRequestClose) onRequestClose();
    }
  };

  const onSubNavItemClick = () => {
    if (onRequestClose) onRequestClose();
  };

  return (
    <ErrorBoundary>
      {!!subNavigation?.length ? (
        <Root data-testid="HeaderNavLink" ownerState={ownerState}>
          <NavItemLink
            {...props}
            variant={variant}
            {...sidekick(sidekickLookup)}
            onClick={onNavItemClick}
            icon="chevron"
            __typename="Link"
            subNavigation={undefined}
            ownerState={ownerState}
          />

          <NavItemSubMenu key={`${navItemId}-nav-item-submenu`} ownerState={ownerState}>
            {subNavigation?.map((subNavItem: any, index: number) => (
              <NavItemSubMenuItem key={`${navItemId}-nav-item-${subNavItem.id}-${index}`} ownerState={ownerState}>
                <NavItemGroup
                  {...subNavItem}
                  variant="group"
                  __typename="NavigationItem"
                  onClick={onSubNavItemClick}
                  onRequestClose={onRequestClose}
                  ownerState={ownerState}
                />
              </NavItemSubMenuItem>
            ))}
          </NavItemSubMenu>
        </Root>
      ) : (
        <NavItemLink
          {...props}
          variant={variant}
          {...sidekick(sidekickLookup)}
          onClick={onNavItemClick}
          __typename="Link"
          ownerState={ownerState}
          data-testid="HeaderNavLink"
        />
      )}
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'HeaderNavLink',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ open?: boolean; ownerState: HeaderNavLinkOwnerState }>``;

const NavItemSubMenu = styled(List, {
  name: 'HeaderNavLink',
  slot: 'NavItemSubMenu',
  overridesResolver: (_, styles) => [styles.navItemSubMenu]
})<{ open?: boolean; ownerState: HeaderNavLinkOwnerState }>``;

const NavItemSubMenuItem = styled(ListItem, {
  name: 'HeaderNavLink',
  slot: 'NavItemSubMenuItem',
  overridesResolver: (_, styles) => [styles.navItemSubMenuItem]
})<{ ownerState: HeaderNavLinkOwnerState }>``;

const NavItemLink = styled(ContentModule, {
  name: 'HeaderNavLink',
  slot: 'NavItemLink',
  overridesResolver: (_, styles) => [styles.navItemLink]
})<{ open?: boolean; ownerState: HeaderNavLinkOwnerState }>``;

const NavItemGroup = styled(ContentModule, {
  name: 'HeaderNavLink',
  slot: 'NavItemGroup',
  overridesResolver: (_, styles) => [styles.navItemGroup]
})<{ ownerState: HeaderNavLinkOwnerState }>``;

export default HeaderNavLink;
