import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../../ErrorBoundary';
import ContentModule from '../../ContentModule';

import type { HeaderNavGroupProps, HeaderNavGroupOwnerState } from './HeaderNavGroup.types';

const HeaderNavGroup = (props: HeaderNavGroupProps) => {
  const ownerState = {
    ...props,
    numOfCols: props.subNavigation?.length || 1
  };

  const { variant, subNavigation, sidekickLookup, onRequestClose, id: navItemId } = props;

  const [open, setOpen] = React.useState<boolean>(false);

  const onNavItemClick = () => {
    if (subNavigation?.length) {
      setOpen(!open);
    }

    if (onRequestClose) onRequestClose();
  };

  const onSubNavItemClick = () => {
    setOpen(false);
    if (onRequestClose) onRequestClose();
  };

  const onKeyDown = (evt: any) => {
    if (evt.key === 'Tab' && !open && !!subNavigation?.length) {
      setOpen(true);
    }
  };

  return (
    <ErrorBoundary>
      {!!subNavigation?.length ? (
        <Root data-testid="HeaderNavGroup" ownerState={ownerState}>
          <NavItemLink
            {...props}
            variant={variant}
            {...sidekick(sidekickLookup)}
            onKeyDown={onKeyDown}
            onClick={onNavItemClick}
            onRequestClose={onRequestClose}
            __typename="Link"
            subNavigation={undefined}
            ownerState={ownerState}
          />
          <NavItemSubMenuWrapper open={open} ownerState={ownerState}>
            <NavItemSubMenu ownerState={ownerState}>
              {subNavigation?.map((subNavItem: any, index: number) => (
                <NavItemSubMenuItem key={`${navItemId}-nav-item-${subNavItem.id}-${index}`} ownerState={ownerState}>
                  <NavItemGroup
                    {...subNavItem}
                    variant="linkNested"
                    __typename="NavigationItem"
                    onClick={onSubNavItemClick}
                    onRequestClose={onRequestClose}
                    ownerState={ownerState}
                  />
                </NavItemSubMenuItem>
              ))}
            </NavItemSubMenu>
          </NavItemSubMenuWrapper>
        </Root>
      ) : (
        <NavItemLink
          {...props}
          variant={variant}
          {...sidekick(sidekickLookup)}
          onKeyDown={onKeyDown}
          onClick={onNavItemClick}
          onRequestClose={onRequestClose}
          __typename="Link"
          ownerState={ownerState}
        />
      )}
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'HeaderNavGroup',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: HeaderNavGroupOwnerState }>``;

const NavItemSubMenuWrapper = styled(Box, {
  name: 'HeaderNavGroup',
  slot: 'NavItemSubMenuWrapper',
  overridesResolver: (_, styles) => [styles.navItemSubMenuWrapper]
})<{ open?: boolean; ownerState: HeaderNavGroupOwnerState }>``;

const NavItemSubMenu = styled(List, {
  name: 'HeaderNavGroup',
  slot: 'NavItemSubMenu',
  overridesResolver: (_, styles) => [styles.navItemSubMenu]
})<{ ownerState: HeaderNavGroupOwnerState }>``;

const NavItemSubMenuItem = styled(ListItem, {
  name: 'HeaderNavGroup',
  slot: 'NavItemSubMenuItem',
  overridesResolver: (_, styles) => [styles.navItemSubMenuItem]
})<{ ownerState: HeaderNavGroupOwnerState }>``;

const NavItemLink = styled(ContentModule, {
  name: 'HeaderNavGroup',
  slot: 'NavItemLink',
  overridesResolver: (_, styles) => [styles.navItemLink]
})<{ ownerState: HeaderNavGroupOwnerState }>``;

const NavItemGroup = styled(ContentModule, {
  name: 'HeaderNavGroup',
  slot: 'NavItemGroup',
  overridesResolver: (_, styles) => [styles.navItemGroup]
})<{ ownerState: HeaderNavGroupOwnerState }>``;

export default HeaderNavGroup;
