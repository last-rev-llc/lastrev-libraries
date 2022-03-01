import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import { styled, alpha } from '@mui/material/styles';

import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Media, { MediaProps } from '@last-rev/component-library/dist/components/Media/Media';
import { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';
import { NavigationItemProps } from '@last-rev/component-library/dist/components/NavigationItem/NavigationItem';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule/ContentModule';
import { sidekick } from '../../utils/sidekick';

export interface HeaderProps {
  variant?: 'elevation' | 'outlined' | undefined;
  logo?: MediaProps;
  logoUrl?: string;
  leftNav?: NavigationItemProps[];
  rightNav?: NavigationItemProps[];
  actions?: LinkProps[];
  sidekickLookup: any;
}

export const Header = ({
  variant = 'elevation',
  logo,
  logoUrl,
  leftNav,
  rightNav,
  actions,
  sidekickLookup
}: HeaderProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <ErrorBoundary>
      <Root position="sticky" {...sidekick(sidekickLookup)} variant={variant} menuVisible={open}>
        <Toolbar
          sx={{
            width: '100%',
            paddingTop: { xs: 1, md: 4 },
            paddingBottom: { xs: 1, md: 4 }
          }}>
          {logo && (
            <IconButton
              data-testid="Header-Logo-Button"
              href={logoUrl || '/'}
              {...sidekick(sidekickLookup?.logo)}
              disableRipple
              sx={{ height: '100%', width: 'auto', padding: 0 }}>
              <Media {...logo} priority disableInlineSVG sx={{ height: '100%', width: 'auto', padding: 0 }} />
            </IconButton>
          )}

          {leftNav && (
            <NavItems
              sx={{
                borderLeft: `solid 1px`,
                borderLeftColor: 'common.white',
                marginLeft: 2
              }}>
              <List data-testid="Header-LeftNav" sx={{ marginRight: 'auto' }}>
                {leftNav?.map((navigationItem) => (
                  <NavItem key={navigationItem.id}>
                    <ContentModule {...navigationItem} />
                  </NavItem>
                ))}
              </List>
            </NavItems>
          )}

          <NavItems sx={{ display: { xs: 'none', md: 'flex' } }}>
            {rightNav && (
              <List
                data-testid="Header-RightNav-Desktop"
                sx={{
                  marginLeft: 'auto',
                  display: 'flex',
                  flexDirection: 'row'
                }}>
                {rightNav?.map((navigationItem) => (
                  <NavItem key={navigationItem.id}>
                    <ContentModule {...navigationItem} />
                  </NavItem>
                ))}
              </List>
            )}

            {actions && (
              <List data-testid="Header-Actions-Desktop">
                {actions?.map((action) => (
                  <NavItem key={action.id}>
                    <ContentModule {...action} />
                  </NavItem>
                ))}
              </List>
            )}
          </NavItems>

          <IconButton
            edge="end"
            color="inherit"
            size="large"
            aria-label="Top menu links"
            aria-controls="top-menu"
            aria-haspopup="true"
            disableRipple
            onClick={toggleDrawer(!open)}
            sx={{ marginLeft: 'auto', display: { xs: 'flex', md: 'none' } }}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <Drawer
            anchor="top"
            sx={{ zIndex: 900, display: { xs: 'block', md: 'none' } }}
            elevation={0}
            open={open}
            onClose={toggleDrawer(false)}>
            <Box sx={{ backgroundColor: 'background.dark', paddingTop: 2, paddingBottom: 4 }}>
              <Container>
                <MobileNavItems>
                  {rightNav &&
                    rightNav?.map((navigationItem) => (
                      <NavItem
                        data-testid="Header-RightNav-Mobile"
                        key={`drawer-${navigationItem.id}`}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}>
                        <ContentModule {...navigationItem} />
                      </NavItem>
                    ))}

                  {actions &&
                    actions?.map((action) => (
                      <NavItem
                        data-testid="Header-Actions-Mobile"
                        key={`drawer-${action.id}`}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}>
                        <ContentModule {...action} />
                      </NavItem>
                    ))}
                </MobileNavItems>
              </Container>
            </Box>
          </Drawer>
        </Toolbar>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(AppBar, {
  name: 'Header',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'menuVisible',
  overridesResolver: (_, styles) => [styles.root]
})<{ menuVisible: boolean }>(({ theme }) => ({
  backgroundColor: theme.palette.background.dark
}));

const NavItems = styled(Box, {
  name: 'Header',
  slot: 'NavItems',
  overridesResolver: (_, styles) => [styles.root]
})(({ theme }) => ({
  padding: 0,
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor: theme.palette.background.dark
}));

const MobileNavItems = styled(List, {
  name: 'Header',
  slot: 'MobileNavItems',
  overridesResolver: (_, styles) => [styles.root]
})(({ theme }) => ({
  padding: 0,
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.background.dark,

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row'
  },

  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(6)
  }
}));

const NavItem = styled(ListItem, {
  name: 'Header',
  slot: 'NavItem',
  overridesResolver: (_, styles) => [styles.root]
})<{}>(({ theme }) => ({
  'padding': theme.spacing(0, 1),
  'margin': 0,
  'height': '100%',
  'display': 'block',

  [theme.breakpoints.up('md')]: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  '.MuiLink-root': {
    padding: theme.spacing(1),
    display: 'block',
    ...theme.typography.smallText,
    textDecoration: 'none',
    color: theme.palette.common.white,
    whiteSpace: 'nowrap'
  },

  '.MuiList-root': {
    display: 'none',
    backgroundColor: 'transparent'
  },

  '&:hover': {
    '&, & [class*="NavigationItem"]:hover': {
      '.MuiList-root': {
        'display': 'block',

        '&::after': {
          content: "''",
          position: 'absolute',
          right: theme.spacing(2),
          top: 0,
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: theme.spacing(0, 1, 1, 1),
          borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
          zIndex: '9998'
        }
      }
    }
  },

  '.MuiMenuItem-root': {
    'marginLeft': theme.spacing(2),
    'backgroundColor': theme.palette.common.white,
    'boxShadow': `0px ${theme.spacing(0.25)} ${theme.spacing(1)} ${alpha(theme.palette.common.black, 0.25)}`,

    '&:hover': {
      backgroundColor: theme.palette.background.neutralGrey
    },

    '.MuiLink-root': {
      color: theme.palette.text.primary,
      padding: theme.spacing(1.5, 2)
    }
  }
}));

export default Header;
