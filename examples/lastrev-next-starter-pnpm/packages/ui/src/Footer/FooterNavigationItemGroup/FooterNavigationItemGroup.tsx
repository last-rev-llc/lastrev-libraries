import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../../ErrorBoundary';
import ContentModule from '../../ContentModule';

import type {
  FooterNavigationItemGroupProps,
  FooterNavigationItemGroupOwnerState
} from './FooterNavigationItemGroup.types';

const FooterNavigationItemGroup = (props: FooterNavigationItemGroupProps) => {
  const ownerState = { ...props };

  const { variant, subNavigation, sidekickLookup, id: navItemId } = props;

  return (
    <ErrorBoundary>
      {!!subNavigation?.length ? (
        <Root data-testid="FooterNavGroup" ownerState={ownerState}>
          <NavItemLinkGroup
            {...props}
            variant={variant}
            {...sidekick(sidekickLookup)}
            __typename="Link"
            subNavigation={undefined}
            ownerState={ownerState}
          />
          <NavItemSubMenu key={`${navItemId}-nav-item-submenu`} ownerState={ownerState}>
            {subNavigation?.map((subNavItem: any, index: number) => (
              <NavItemSubMenuItem key={`${navItemId}-nav-item-${subNavItem.id}-${index}`} ownerState={ownerState}>
                <NavItemLink
                  {...props}
                  variant={variant}
                  {...sidekick(sidekickLookup)}
                  subNavigation={undefined}
                  __typename="Link"
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
          __typename="Link"
          ownerState={ownerState}
        />
      )}
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'FooterNavigationItemGroup',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: FooterNavigationItemGroupOwnerState }>``;

const NavItemSubMenu = styled(List, {
  name: 'FooterNavigationItemGroup',
  slot: 'NavItemSubMenu',
  overridesResolver: (_, styles) => [styles.navItemSubMenu]
})<{ ownerState: FooterNavigationItemGroupOwnerState }>``;

const NavItemSubMenuItem = styled(ListItem, {
  name: 'FooterNavigationItemGroup',
  slot: 'NavItemSubMenuItem',
  overridesResolver: (_, styles) => [styles.navItemSubMenuItem]
})<{ ownerState: FooterNavigationItemGroupOwnerState }>``;

const NavItemLink = styled(ContentModule, {
  name: 'FooterNavigationItemGroup',
  slot: 'NavItemLink',
  shouldForwardProp: (prop: string) => prop !== 'subNavigation' && prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.navItemLink]
})<{ ownerState: FooterNavigationItemGroupOwnerState }>``;

const NavItemLinkGroup = styled(ContentModule, {
  name: 'FooterNavigationItemGroup',
  slot: 'NavItemLinkGroup',
  shouldForwardProp: (prop: string) => prop !== 'subNavigation' && prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.navItemLinkGroup]
})<{ ownerState: FooterNavigationItemGroupOwnerState }>``;

export default FooterNavigationItemGroup;
