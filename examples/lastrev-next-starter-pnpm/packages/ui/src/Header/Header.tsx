import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import MuiIconButton from '@mui/material/IconButton';
import MuiMenuIcon from '@mui/icons-material/Menu';
import MuiCloseIcon from '@mui/icons-material/Close';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ContentModule from '../ContentModule';
import SiteMessage from '../SiteMessage';

import type { HeaderProps, HeaderOwnerState } from './Header.types';
import type { LinkProps } from '../Link';
import type { NavigationItemProps } from '../NavigationItem';

export const Header = (props: HeaderProps) => {
  const ownerState = { ...props };

  const {
    logo,
    logoUrl,
    navigationItems,
    sidekickLookup,
    ctaItems,
    siteMessageIcon,
    siteMessageText,
    siteMessageLink
  } = props;

  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 0
  // });

  // const menuBreakpoint: Breakpoint = theme?.components?.Header?.mobileMenuBreakpoint ?? 'sm';

  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <Root
      {...sidekick(sidekickLookup)}
      ownerState={ownerState}
      // elevation={trigger ? 2 : 0}
      menuVisible={menuVisible}
      // menuBreakpoint={menuBreakpoint}
    >
      {siteMessageText && (
        <SiteMessageWrap ownerState={ownerState}>
          <SiteMessage icon={siteMessageIcon} text={siteMessageText} link={siteMessageLink} />
        </SiteMessageWrap>
      )}
      <ContentOuterGrid ownerState={ownerState}>
        {logo ? (
          <LogoRoot {...logoUrl} aria-label={'Go to homepage'} ownerState={ownerState} text={undefined}>
            <Logo {...logo} __typename="Media" priority alt={logo?.title ?? 'Go to homepage'} ownerState={ownerState} />
          </LogoRoot>
        ) : null}

        <HeaderMobileNavWrap ownerState={ownerState} menuVisible={menuVisible}>
          {!!navigationItems?.length && (
            <HeaderMenuNav component="nav" ownerState={ownerState}>
              <HeaderMenuNavItems ownerState={ownerState}>
                {navigationItems.map((navItem: any, index: number) => (
                  <HeaderMenuNavItem key={`${navItem.id}-${index}`} ownerState={ownerState}>
                    <ContentModule
                      {...(navItem as NavigationItemProps)}
                      variant="link"
                      onRequestClose={() => {
                        setMenuVisible(false);
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                      }}
                      __typename="NavigationItem"
                      menuVisible={menuVisible}
                    />
                  </HeaderMenuNavItem>
                ))}
              </HeaderMenuNavItems>
            </HeaderMenuNav>
          )}

          <HeaderMenuCtas ownerState={ownerState}>
            {ctaItems?.map((ctaItem: any, index: number) => (
              <HeaderMenuCtaItem key={`${ctaItem.id}-${index}`} ownerState={ownerState}>
                <ContentModule {...ctaItem} size="small" />
              </HeaderMenuCtaItem>
            ))}
          </HeaderMenuCtas>
        </HeaderMobileNavWrap>

        <IconButtonWrap ownerState={ownerState}>
          <IconButton
            ownerState={ownerState}
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setMenuVisible(!menuVisible)}
            size="large">
            <MenuIcon ownerState={ownerState} sx={{ display: menuVisible ? 'none' : 'block' }} />
            <CloseIcon ownerState={ownerState} sx={{ display: !menuVisible ? 'none' : 'block' }} />
          </IconButton>
        </IconButtonWrap>
      </ContentOuterGrid>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'Header',
  slot: 'Root',
  shouldForwardProp: (prop: string) => prop !== 'menuVisible',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: HeaderOwnerState; menuVisible: boolean }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Header',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: HeaderOwnerState }>``;

const SiteMessageWrap = styled(Box, {
  name: 'Header',
  slot: 'SiteMessageWrap',
  overridesResolver: (_, styles) => [styles.siteMessageWrap]
})<{ ownerState: HeaderOwnerState }>``;

const LogoRoot = styled(ContentModule, {
  name: 'Header',
  slot: 'LogoRoot',
  overridesResolver: (_, styles) => [styles.logoRoot]
})<{ ownerState: HeaderOwnerState }>``;

const Logo = styled(ContentModule, {
  name: 'Header',
  slot: 'Logo',
  overridesResolver: (_, styles) => [styles.logo]
})<{ ownerState: HeaderOwnerState }>``;

const HeaderMenuCtas = styled(List, {
  name: 'Header',
  slot: 'HeaderMenuCtas',
  overridesResolver: (_, styles) => [styles.headerMenuCtas]
})<{ ownerState: HeaderOwnerState }>``;

const HeaderMenuCtaItem = styled(ListItem, {
  name: 'Header',
  slot: 'HeaderMenuCtaItem',
  overridesResolver: (_, styles) => [styles.headerMenuCtaItem]
})<{ ownerState: HeaderOwnerState }>``;

const HeaderMenuNav = styled(Box, {
  name: 'Header',
  slot: 'HeaderMenuNav',
  overridesResolver: (_, styles) => [styles.headerMenuNav]
})<{ ownerState: HeaderOwnerState; menuVisible?: boolean }>``;

const HeaderMobileNavWrap = styled(Box, {
  name: 'Header',
  slot: 'HeaderMobileNavWrap',
  overridesResolver: (_, styles) => [styles.headerMobileNavWrap]
})<{ ownerState: HeaderOwnerState; menuVisible?: boolean }>``;

const HeaderMenuNavItems = styled(List, {
  name: 'Header',
  slot: 'headerMenuNavItems',
  overridesResolver: (_, styles) => [styles.headerMenuNavItems]
})<{ ownerState: HeaderOwnerState; hasSiteMessage?: boolean }>``;

const HeaderMenuNavItem = styled(ListItem, {
  name: 'Header',
  slot: 'HeaderMenuNavItem',
  overridesResolver: (_, styles) => [styles.headerMenuNavItem]
})<{ ownerState: HeaderOwnerState }>``;

const MenuIcon = styled(MuiMenuIcon, {
  name: 'Header',
  slot: 'MenuIcon',
  overridesResolver: (_, styles) => [styles.menuIcon]
})<{ ownerState: HeaderOwnerState }>``;

const CloseIcon = styled(MuiCloseIcon, {
  name: 'Header',
  slot: 'CloseIcon',
  overridesResolver: (_, styles) => [styles.closeIcon]
})<{ ownerState: HeaderOwnerState }>``;

const IconButtonWrap = styled(Box, {
  name: 'Header',
  slot: 'IconButtonWrap',
  overridesResolver: (_, styles) => [styles.iconButtonWrap]
})<{ ownerState: HeaderOwnerState }>``;

const IconButton = styled(MuiIconButton, {
  name: 'Header',
  slot: 'IconButton',
  overridesResolver: (_, styles) => [styles.iconButton]
})<{ ownerState: HeaderOwnerState }>``;

const HeaderMenuMobileCtaItem = styled(ListItem, {
  name: 'Header',
  slot: 'HeaderMenuMobileCtaItem',
  overridesResolver: (_, styles) => [styles.headerMenuMobileCtaItem]
})<{ ownerState: HeaderOwnerState }>``;

const ContentContainer = styled(Toolbar, {
  name: 'Header',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{
  ownerState: HeaderOwnerState;
  variant?: string;
  menuVisible?: boolean;
  legacyBehavior?: boolean;
  isElevated?: boolean;
}>``;

export default Header;
