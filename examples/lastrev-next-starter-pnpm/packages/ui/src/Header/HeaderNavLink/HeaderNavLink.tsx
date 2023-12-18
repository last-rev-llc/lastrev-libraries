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
import Grid from '../../Grid';

const HeaderNavLink = (props: HeaderNavLinkProps) => {
  const ownerState = {
    ...props,
    numOfCols: props.subNavigation?.length || 1
  };

  const { variant, subNavigation, sidekickLookup, onRequestClose, id: navItemId, open, onClickNav } = props;

  const onNavItemClick = (evt: any) => {
    onClickNav(evt);
    // if (subNavigation?.length) {
    //   evt.preventDefault();
    //   evt.stopPropagation();
    //   if (document.activeElement instanceof HTMLElement) {
    //     evt?.target?.blur();
    //   }
    // } else {
    //   if (onRequestClose) onRequestClose();
    // }
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
          <NavItemSubMenuGrid ownerState={ownerState} overrideNested>
            <NavItemSubMenu key={`${navItemId}-nav-item-submenu`} ownerState={ownerState} disablePadding>
              {subNavigation?.map((subNavItem: any, index: number) => (
                <NavItemSubMenuItem
                  key={`${navItemId}-nav-item-${subNavItem.id}-${index}`}
                  ownerState={ownerState}
                  disablePadding>
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
          </NavItemSubMenuGrid>
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

const NavItemSubMenuGrid = styled(Grid, {
  name: 'HeaderNavLink',
  slot: 'NavItemSubMenuGrid',
  overridesResolver: (_, styles) => [styles.navItemSubMenuGrid]
})<{ ownerState: HeaderNavLinkOwnerState }>``;

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
  shouldForwardProp: (prop: string) => prop !== 'subNavigation' && prop !== 'menuVisible' && prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.navItemLink]
})<{ open?: boolean; ownerState: HeaderNavLinkOwnerState }>``;

const NavItemGroup = styled(ContentModule, {
  name: 'HeaderNavLink',
  slot: 'NavItemGroup',
  overridesResolver: (_, styles) => [styles.navItemGroup]
})<{ ownerState: HeaderNavLinkOwnerState }>``;

export default HeaderNavLink;
