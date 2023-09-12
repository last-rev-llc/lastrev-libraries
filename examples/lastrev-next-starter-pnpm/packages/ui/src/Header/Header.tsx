import React from 'react';

import { styled } from '@mui/material/styles';

import { Breakpoint, useTheme } from '@mui/system';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import useScrollTrigger from '@mui/material/useScrollTrigger';

import sidekick from '@last-rev/contentful-sidekick-util';

import Link from '../Link';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import useThemeProps from '../utils/useThemeProps';

import { HeaderProps } from './Header.types';
import { LinkProps } from '../Link/Link.types';
import { NavigationItemProps } from '../NavigationItem/NavigationItem.types';

export const Header = (inProps: HeaderProps) => {
  const props = useThemeProps({
    name: 'Header',
    props: inProps
  });

  const {
    variant,
    logo,
    logoUrl,
    navigationItems,
    sidekickLookup,
    ctAs,
    mobileCtAs,
    supernavIcon,
    supernavText,
    supernavLink
  } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  const theme = useTheme();

  const menuBreakpoint: Breakpoint = theme?.components?.Header?.mobileMenuBreakpoint ?? 'sm';

  const [menuVisible, setMenuVisible] = React.useState(false);
  const hasSuperNav = !!supernavIcon || !!supernavText || !!supernavLink;

  const ownerState = {
    color: props.colorScheme
  };

  return (
    <ErrorBoundary>
      <>
        <Root
          {...sidekick(sidekickLookup)}
          ownerState={ownerState}
          variant={variant}
          elevation={trigger ? 2 : 0}
          menuVisible={menuVisible}
          menuBreakpoint={menuBreakpoint}
          {...props}>
          {hasSuperNav && (
            <SuperNav data-testid="Header-SuperNav" isElevated={trigger}>
              <SuperNavContainer>
                {supernavIcon && <SupernavIcon {...supernavIcon} />}
                {supernavLink && (
                  <SupernavLink
                    href={supernavLink.href}
                    __typename="Link"
                    text={supernavText}
                    variant="button-cta3"
                    icon="arrow-right"
                  />
                )}
              </SuperNavContainer>
            </SuperNav>
          )}
          <Container>
            <ContentContainer menuVisible={menuVisible} disableGutters isElevated={trigger}>
              {logo ? (
                <LogoRoot noLinkStyle {...(logoUrl as LinkProps)} __typename="Link" aria-label={'Go to homepage'}>
                  <Logo {...logo} priority alt={logo?.title ?? 'Go to homepage'} isElevated={trigger} />
                </LogoRoot>
              ) : null}

              {!!navigationItems?.length && (
                <HeaderMenuNav component="nav" menuVisible={menuVisible}>
                  <HeaderMenuNavItems hasSuperNav={hasSuperNav}>
                    {navigationItems.map((navItem: any, index: number) => (
                      <HeaderMenuNavItem key={`${navItem.id}-${index}`}>
                        <ContentModule
                          {...(navItem as NavigationItemProps)}
                          variant="headerLink"
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
                  {!!mobileCtAs?.length && (
                    <HeaderMenuMobileCtas>
                      {mobileCtAs?.map((navItem: any, index: number) => (
                        <HeaderMenuMobileCtaItem key={`${navItem.id}-${index}`}>
                          <ContentModule {...navItem} />
                        </HeaderMenuMobileCtaItem>
                      ))}
                    </HeaderMenuMobileCtas>
                  )}
                </HeaderMenuNav>
              )}

              <HeaderMenuCtas>
                {ctAs?.map((navItem: any, index: number) => (
                  <HeaderMenuCtaItem key={`${navItem.id}-${index}`}>
                    <ContentModule {...navItem} />
                  </HeaderMenuCtaItem>
                ))}

                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setMenuVisible(!menuVisible)}
                  sx={{ display: { xs: 'block', lg: 'none' }, padding: 0, marginRight: '-4px' }}
                  size="large">
                  <MenuIcon sx={{ display: menuVisible ? 'none' : 'block', fontSize: 42 }} />
                  <CloseIcon sx={{ display: !menuVisible ? 'none' : 'block', fontSize: 42 }} />
                </IconButton>
              </HeaderMenuCtas>
            </ContentContainer>
          </Container>
        </Root>
      </>
    </ErrorBoundary>
  );
};
const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'ownerState' &&
  prop !== 'menuVisible' &&
  prop !== 'menuBreakpoint' &&
  prop !== 'isElevated' &&
  prop !== 'sidekickLookup' &&
  prop !== 'supernavIcon' &&
  prop !== 'supernavText' &&
  prop !== 'supernavLink' &&
  prop !== 'colorScheme' &&
  prop !== 'logo' &&
  prop !== 'svgContent' &&
  prop !== 'logoUrl' &&
  prop !== 'navigationItems' &&
  prop !== 'ctAs' &&
  prop !== 'legacyBehavior' &&
  prop !== 'mobileCtAs' &&
  prop !== 'hasSuperNav';

const Root = styled(AppBar, {
  name: 'Header',
  slot: 'Root',
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop as string) &&
    prop !== 'id' &&
    prop !== 'supernavIcon' &&
    prop !== 'supernavText' &&
    prop !== 'supernavLink',
  overridesResolver: (_, styles) => [styles.root]
})<HeaderProps & { ownerState: any; menuVisible: boolean }>(() => ({}));

const SuperNav = styled(Box, {
  name: 'Header',
  slot: 'SuperNav',
  overridesResolver: (_, styles) => [styles.superNav]
})<{ isElevated?: boolean }>``;

const SuperNavContainer = styled(Container, {
  name: 'Header',
  slot: 'SuperNavContainer',
  overridesResolver: (_, styles) => [styles.superNavContainer]
})``;

const SupernavIcon = styled(ContentModule, {
  name: 'Header',
  slot: 'SupernavIcon',
  overridesResolver: (_, styles) => [styles.supernavIcon]
})(() => ({}));

const SupernavLink = styled(ContentModule, {
  name: 'Header',
  slot: 'SupernavLink',
  overridesResolver: (_, styles) => [styles.supernavLink]
})(() => ({}));

const LogoRoot = styled(Link, {
  name: 'Header',
  slot: 'LogoRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.logoRoot]
})(() => ({}));

const Logo = styled(ContentModule, {
  name: 'Header',
  slot: 'Logo',
  overridesResolver: (_, styles) => [styles.logo]
})<{ variant?: string }>(() => ({
  height: '100%',
  width: 'auto'
}));

const HeaderMenuCtas = styled(List, {
  name: 'Header',
  slot: 'HeaderMenuCtas',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuCtas]
})(() => ({}));

const HeaderMenuCtaItem = styled(ListItem, {
  name: 'Header',
  slot: 'HeaderMenuCtaItem',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuCtaItem]
})``;

const HeaderMenuNav = styled(Box, {
  name: 'Header',
  slot: 'HeaderMenuNav',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuNav]
})<{ menuVisible?: boolean }>``;

const HeaderMenuNavItems = styled(List, {
  name: 'Header',
  slot: 'headerMenuNavItems',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuNavItems]
})<{ hasSuperNav?: boolean }>``;

const HeaderMenuNavItem = styled(ListItem, {
  name: 'Header',
  slot: 'HeaderMenuNavItem',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuNavItem]
})``;

const HeaderMenuMobileCtas = styled(List, {
  name: 'Header',
  slot: 'HeaderMenuMobileCtas',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuMobileCtas]
})``;

const HeaderMenuMobileCtaItem = styled(ListItem, {
  name: 'Header',
  slot: 'HeaderMenuMobileCtaItem',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.headerMenuMobileCtaItem]
})``;

const ContentContainer = styled(Toolbar, {
  name: 'Header',
  slot: 'ContentContainer',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string; menuVisible?: boolean; legacyBehavior?: boolean; isElevated?: boolean }>``;

export default Header;
