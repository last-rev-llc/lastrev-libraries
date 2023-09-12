import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import { HeaderNavLinkProps } from './HeaderNavLink.types';
import ErrorBoundary from '../../ErrorBoundary';
import ContentModule from '../../ContentModule';
import getFirstOfArray from '../../utils/getFirstOfArray';

export const HeaderNavLink = ({
  title,
  actions,
  navMedia,
  variant,
  subNavigation,
  sidekickLookup,
  onRequestClose,
  id: navItemId,
  ...props
}: HeaderNavLinkProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const onNavItemClick = (evt: any) => {
    if (subNavigation?.length) {
      evt.preventDefault();
      evt.stopPropagation();
      if (document.activeElement instanceof HTMLElement) {
        evt?.target?.blur();
      }
      setOpen(!open);
    } else {
      if (onRequestClose) onRequestClose();
    }
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

  const image = getFirstOfArray(navMedia);
  const hasMegaNav = !!title || !!actions?.length || !!image;

  return (
    <ErrorBoundary>
      <Root data-testid="HeaderNavLink" open={open}>
        <NavItemLink
          {...props}
          variant={variant}
          {...sidekick(sidekickLookup)}
          onKeyDown={onKeyDown}
          onClick={onNavItemClick}
          icon={!!subNavigation?.length ? 'chevron' : null}
          open={open}
          __typename="Link"
        />

        {!!subNavigation?.length ? (
          <NavItemSubMenuWrapper open={open} numOfCols={subNavigation?.length} hasMegaNav={hasMegaNav}>
            <NavItemSubMenu numOfCols={subNavigation?.length}>
              {subNavigation?.map((item: any, index: number) => (
                <NavItemSubMenuItem key={`${navItemId}-nav-item-${item.id}-${index}`}>
                  <NavItemGroup
                    {...item}
                    variant="headerGroup"
                    __typename="NavigationItem"
                    onClick={onSubNavItemClick}
                    onRequestClose={onRequestClose}
                  />
                </NavItemSubMenuItem>
              ))}
              {hasMegaNav && (
                <MegaNavContainer>
                  <MegaNavContent>
                    {title && <MegaNavTitle variant="h4">{title}</MegaNavTitle>}
                    {!!actions?.length && (
                      <MegaNavActions>
                        {actions.map((action: any) => (
                          <MegaNavAction key={action.id} {...action} size="small" />
                        ))}
                      </MegaNavActions>
                    )}
                  </MegaNavContent>
                  {image && <MegaNavMedia {...image} />}
                </MegaNavContainer>
              )}
            </NavItemSubMenu>
          </NavItemSubMenuWrapper>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' && prop !== 'onRequestClose' && prop !== 'menuBreakpoint';

const Root = styled(Box, {
  name: 'HeaderNavLink',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ open?: boolean }>``;

const NavItemSubMenuWrapper = styled(Box, {
  name: 'HeaderNavLink',
  slot: 'NavItemSubMenuWrapper',
  shouldForwardProp: (prop: string) => prop !== 'numOfCols' && prop !== 'hasMegaNav',
  overridesResolver: (_, styles) => [styles.navItemSubMenuWrapper]
})<{ open?: boolean; numOfCols?: number; hasMegaNav?: boolean }>``;

const NavItemSubMenu = styled(List, {
  name: 'HeaderNavLink',
  slot: 'NavItemSubMenu',
  shouldForwardProp: (prop: string) => prop !== 'numOfCols',
  overridesResolver: (_, styles) => [styles.navItemSubMenu]
})<{ numOfCols?: number }>``;

const NavItemLink = styled(ContentModule, {
  name: 'HeaderNavLink',
  slot: 'NavItemLink',
  shouldForwardProp: (prop: string) => prop !== 'open',
  overridesResolver: (_, styles) => [styles.navItemLink]
})<{ open?: boolean }>``;

const NavItemGroup = styled(ContentModule, {
  name: 'HeaderNavLink',
  slot: 'NavItemGroup',
  overridesResolver: (_, styles) => [styles.navItemGroup]
})<{}>``;

const NavItemSubMenuItem = styled(ListItem, {
  name: 'HeaderNavLink',
  slot: 'NavItemSubMenuItem',
  overridesResolver: (_, styles) => [styles.navItemSubMenuItem]
})<{}>``;

const MegaNavContainer = styled(Box, {
  name: 'HeaderNavLink',
  slot: 'MegaNavContainer',
  overridesResolver: (_, styles) => [styles.megaNavContainer]
})<{}>``;

const MegaNavContent = styled(Box, {
  name: 'HeaderNavLink',
  slot: 'MegaNavContent',
  overridesResolver: (_, styles) => [styles.megaNavContent]
})<{}>``;

const MegaNavTitle = styled(Typography, {
  name: 'HeaderNavLink',
  slot: 'MegaNavTitle',
  overridesResolver: (_, styles) => [styles.megaNavTitle]
})<{}>``;

const MegaNavActions = styled(Box, {
  name: 'HeaderNavLink',
  slot: 'MegaNavActions',
  overridesResolver: (_, styles) => [styles.megaNavActions]
})<{}>``;

const MegaNavAction = styled(ContentModule, {
  name: 'HeaderNavLink',
  slot: 'MegaNavAction',
  overridesResolver: (_, styles) => [styles.megaNavAction]
})<{}>``;

const MegaNavMedia = styled(ContentModule, {
  name: 'HeaderNavLink',
  slot: 'MegaNavMedia',
  overridesResolver: (_, styles) => [styles.megaNavMedia]
})<{}>``;

export default HeaderNavLink;
