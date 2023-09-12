import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../../ErrorBoundary';
import ContentModule from '../../ContentModule';

import { HeaderNavGroupProps } from './HeaderNavGroup.types';

export const HeaderNavGroup = ({
  variant,
  subNavigation,
  sidekickLookup,
  onRequestClose,
  id: navItemId,
  ...props
}: HeaderNavGroupProps) => {
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
      <Root data-testid="HeaderNavGroup">
        <NavItemLink
          {...props}
          variant={variant}
          {...sidekick(sidekickLookup)}
          onKeyDown={onKeyDown}
          onClick={onNavItemClick}
          onRequestClose={onRequestClose}
          __typename="Link"
        />

        {subNavigation && !!subNavigation?.length ? (
          <NavItemSubMenuWrapper open={open}>
            <NavItemSubMenu>
              {subNavigation?.map((item: any, index: number) => (
                <NavItemSubMenuItem key={`${navItemId}-nav-item-${item.id}-${index}`}>
                  <NavItemGroup
                    {...item}
                    variant="headerLinkNested"
                    __typename="NavigationItem"
                    onClick={onSubNavItemClick}
                    onRequestClose={onRequestClose}
                  />
                </NavItemSubMenuItem>
              ))}
            </NavItemSubMenu>
          </NavItemSubMenuWrapper>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' && prop !== 'onRequestClose' && prop !== 'menuBreakpoint' && prop !== 'navMedia';

const Root = styled(Box, {
  name: 'HeaderNavGroup',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{}>``;

const NavItemSubMenuWrapper = styled(Box, {
  name: 'HeaderNavGroup',
  slot: 'NavItemSubMenuWrapper',
  overridesResolver: (_, styles) => [styles.navItemSubMenuWrapper]
})<{ open?: boolean }>``;

const NavItemSubMenu = styled(List, {
  name: 'HeaderNavGroup',
  slot: 'NavItemSubMenu',
  overridesResolver: (_, styles) => [styles.navItemSubMenu]
})<{}>``;

const NavItemLink = styled(ContentModule, {
  name: 'HeaderNavGroup',
  slot: 'NavItemLink',
  overridesResolver: (_, styles) => [styles.navItemLink]
})<{}>``;

const NavItemGroup = styled(ContentModule, {
  name: 'HeaderNavGroup',
  slot: 'NavItemGroup',
  overridesResolver: (_, styles) => [styles.navItemGroup]
})<{}>``;

const NavItemSubMenuItem = styled(ListItem, {
  name: 'HeaderNavGroup',
  slot: 'NavItemSubMenuItem',
  overridesResolver: (_, styles) => [styles.navItemSubMenuItem]
})<{}>``;

export default HeaderNavGroup;
