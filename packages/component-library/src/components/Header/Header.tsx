import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Hidden from '@mui/material/Hidden';
import styled from '@mui/system/styled';
import { useTheme } from '@mui/system';

import ErrorBoundary from '../ErrorBoundary';
import Media from '../Media';

import ContentModule from '../ContentModule';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import sidekick from '@last-rev/contentful-sidekick-util';
import { HeaderProps } from './Header.types';
import useThemeProps from '../../utils/useThemeProps';

export const Header = (inProps: HeaderProps) => {
  const props = useThemeProps({
    name: 'Header',
    props: inProps
  });
  const { variant, logo, logoUrl, navigationItems, sidekickLookup } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });
  const theme = useTheme();
  const menuBreakpoint = theme?.components?.Header?.mobileMenuBreakpoint ?? 'sm';
  const [menuVisible, setMenuVisible] = React.useState(false);
  const handleClose = () => {
    setMenuVisible(false);
  };
  return (
    <ErrorBoundary>
      <>
        <Root
          {...sidekick(sidekickLookup)}
          variant={variant}
          elevation={trigger ? 4 : 0}
          menuVisible={menuVisible}
          menuBreakpoint={menuBreakpoint}
          {...props}>
          <ContentContainer>
            {logo ? (
              <LogoRoot href={logoUrl} sx={{ height: '100%', py: 3 }} {...sidekick(sidekickLookup?.logo)}>
                <Logo {...logo} priority disableInlineSVG alt={logo?.title ?? 'Go to homepage'} />
              </LogoRoot>
            ) : null}
            {navigationItems?.map((collection) => (
              <React.Fragment key={collection.id}>
                <NavigationDivider />
                <ContentModule
                  {...collection}
                  variant={'navigation-bar'}
                  onRequestClose={handleClose}
                  color={props?.color}
                />
              </React.Fragment>
            ))}
            <Hidden implementation="css" {...{ [`${menuBreakpoint}Up`]: true }}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setMenuVisible(!menuVisible)}
                size="large">
                {menuVisible ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Hidden>
          </ContentContainer>
        </Root>
        <ContentContainer />
      </>
    </ErrorBoundary>
  );
};
const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'menuVisible' &&
  prop !== 'menuBreakpoint' &&
  prop !== 'sidekickLookup' &&
  prop !== 'colorScheme' &&
  prop !== 'logoUrl' &&
  prop !== 'navigationItems';

const Root = styled(AppBar, {
  name: 'Header',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; menuVisible: boolean; menuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  ${({ theme, menuVisible, menuBreakpoint }) => `
    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    @media (max-width: ${theme.breakpoints.values[menuBreakpoint]}px) {
      [class$='NavigationBar-root'] {
        position: fixed;
        top: ${theme.components?.Header?.height}px;
        left: 0;
        z-index: -1;
        width: 100%;
        
        max-height: calc(100vh - 62px);
        overflow-y: auto;


        transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
        transform: ${menuVisible ? 'translateY(0)' : 'translateY(-130%)'};
        transition-delay: ${menuVisible ? 0 : 0.2}s;
        > * {
          transition: .2s;
          opacity: ${menuVisible ? 1 : 0};
          transition-delay: ${menuVisible ? 0.3 : 0}s;
        }

        > .MuiGrid-container {
          flex-direction: column;
          align-items: flex-start;
          margin: 0;
          width: 100%;
          .MuiGrid-item {
            padding: 0;
            width: 100%;
            justify-content: center;
            display: flex;
            flex-direction: column;
          }

          > .MuiGrid-item {
            padding: ${theme.spacing(2)};
          }
        }
        .MuiLink-root {
          display: block;
        }
      }
    }
    `}
`;

const LogoRoot = styled(Link, {
  name: 'Header',
  slot: 'LogoRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.logoRoot]
})(() => ({}));

const Logo = styled(Media, {
  name: 'Header',
  slot: 'Logo',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.logo]
})<{ variant?: string }>(() => ({
  height: '100%',
  width: 'auto'
}));

const NavigationDivider = styled(Box, {
  name: 'Header',
  slot: 'NavigationDivider',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.navigationDivider]
})`
  flex-grow: 1;
`;

const ContentContainer = styled(Toolbar, {
  name: 'Header',
  slot: 'ContentContainer',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>`
  height: 100%;
`;

export default Header;
