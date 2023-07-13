import React from 'react';
import { useRouter } from 'next/router';
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
import { styled } from '@mui/material/styles';

import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import Media, { MediaProps } from '@last-rev/component-library/dist/components/Media';
import { LinkProps } from '@last-rev/component-library/dist/components/Link';
import { NavigationItemProps } from '@last-rev/component-library/dist/components/NavigationItem';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import AutocompleteBox from '../AutocompleteBox';
import sidekick from '@last-rev/contentful-sidekick-util';

import { useLocalizationContext } from '../LocalizationContext';

export interface HeaderProps {
  variant?: 'elevation' | 'outlined' | undefined;
  logo?: MediaProps;
  logoUrl?: string;
  leftNav?: NavigationItemProps[];
  rightNav?: NavigationItemProps[];
  actions?: LinkProps[];
  indexName?: string;
  sidekickLookup: any;
}

export const Header = ({
  variant = 'elevation',
  logo,
  logoUrl,
  leftNav,
  rightNav,
  actions,
  indexName,
  sidekickLookup
}: HeaderProps) => {
  const [open, setOpen] = React.useState(false);
  const localization = useLocalizationContext();
  const router = useRouter();
  const { locale } = router;

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const urlPath = global.location?.pathname;
  const isQuery = global.location?.search.includes('?query=');
  const showSearchForm =
    urlPath !== '/' &&
    urlPath !== '/search/' &&
    urlPath !== '/preview' &&
    !isQuery &&
    !(locale !== 'en-US' && urlPath === `/${locale}`);

  return (
    <ErrorBoundary>
      <Root
        id="header"
        position="sticky"
        {...sidekick({ contentId: sidekickLookup?.contentId, contentTypeId: sidekickLookup?.contentTypeId })}
        variant={variant}
        menuVisible={open}>
        <Toolbar
          sx={{
            width: '100%',
            paddingTop: { xs: 1, md: 2 },
            paddingBottom: { xs: 1, md: 2 }
          }}>
          {logo && (
            <IconButton
              data-testid="Header-Logo-Button"
              disableRipple
              href={logoUrl || '/'}
              sx={{ height: '100%', width: 'auto', padding: 0 }}>
              <Media
                {...logo}
                {...sidekick(sidekickLookup?.logo)}
                priority
                disableInlineSVG
                sx={{ height: '100%', width: 'auto', padding: 0 }}
              />
            </IconButton>
          )}

          {leftNav && (
            <NavItems
              sx={{
                'borderLeft': `solid 1px`,
                'borderLeftColor': 'common.white',
                'marginLeft': 2,

                '& .MuiList-root': {
                  padding: 0
                }
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

          <NavItems displayPrint="none" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {showSearchForm && (
              <Box
                sx={{
                  'width': '100%',
                  'marginLeft': 'auto',
                  'marginRight': 2,

                  '& .aa-Form': {
                    'height': 38,
                    'minHeight': 'auto',
                    'minWidth': 320,
                    'borderColor': 'transparent',
                    'borderRadius': 20,

                    '&:focus-within': {
                      borderColor: 'transparent',
                      boxShadow: 'none',
                      outline: 0
                    }
                  },

                  '& .aa-Input': {
                    'height': 38,

                    '&::placeholder': {
                      color: 'midnight.A60'
                    }
                  },

                  '& .aa-InputWrapperPrefix': {
                    height: 38
                  },

                  '& .aa-Label svg': {
                    color: 'midnight.main'
                  },

                  '& .aa-Autocomplete[aria-expanded=true]': {
                    '& .aa-Form': {
                      borderRadius: (theme) => `${theme.spacing(2.4)} ${theme.spacing(2.4)} 0 0`
                    }
                  }
                }}>
                <AutocompleteBox
                  settings={{
                    searchResultsUrl: '/search',
                    indexName
                  }}
                />
              </Box>
            )}

            {rightNav && (
              <RightNavItems data-testid="Header-RightNav-Desktop">
                {rightNav?.map((navigationItem) =>
                  navigationItem.variant === 'locale group label' ? (
                    <NavItemLocaleMenu key={navigationItem.id}>
                      <LocaleSwitcherIcon
                        sx={{
                          backgroundImage: `url(${localization['header.localeSwitcher.icon']?.image?.file?.url})`
                        }}
                      />
                      <ContentModule {...navigationItem} />
                    </NavItemLocaleMenu>
                  ) : (
                    <NavItem key={navigationItem.id}>
                      <ContentModule {...navigationItem} />
                    </NavItem>
                  )
                )}
              </RightNavItems>
            )}

            {actions && (
              <List data-testid="Header-Actions-Desktop" sx={{ padding: 0 }}>
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
            sx={{ marginLeft: 'auto', display: { xs: 'flex', md: 'none' }, displayPrint: 'none' }}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <Drawer
            anchor="top"
            sx={{ zIndex: 900, display: { xs: 'block', md: 'none' }, displayPrint: 'none' }}
            elevation={0}
            open={open}
            onClose={toggleDrawer(false)}>
            <Box sx={{ backgroundColor: 'background.dark', paddingTop: 2, paddingBottom: 4 }}>
              <Container>
                <MobileNavItems>
                  {rightNav?.map((navigationItem) => (
                    <NavItem
                      data-testid="Header-RightNav-Mobile"
                      key={`drawer-${navigationItem.id}`}
                      role="presentation"
                      onClick={toggleDrawer(true)}
                      onKeyDown={toggleDrawer(true)}>
                      <ContentModule {...navigationItem} />
                    </NavItem>
                  ))}
                  {actions?.map((action) => (
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
  'backgroundColor': theme.palette.background.dark,

  '@media print': {
    display: 'none'
  }
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

const NavItem = styled(ListItem, {
  name: 'Header',
  slot: 'NavItem',
  overridesResolver: (_, styles) => [styles.root]
})<{}>(({ theme }) => ({
  'display': 'block',
  'height': '100%',
  'margin': 0,
  'padding': theme.spacing(0, 1),

  [theme.breakpoints.up('md')]: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  '.MuiLink-root': {
    display: 'block',
    padding: theme.spacing(1),
    ...theme.typography.smallText,
    color: theme.palette.common.white,
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  },

  '.MuiList-root': {
    marginBottom: theme.spacing(3),
    backgroundColor: 'transparent',

    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },

  '&:hover': {
    '&, & [class*="NavigationItem"]:hover': {
      '.MuiList-root': {
        [theme.breakpoints.up('md')]: {
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
    }
  },

  '.MuiMenuItem-root': {
    [theme.breakpoints.up('md')]: {
      'marginLeft': theme.spacing(2),
      'backgroundColor': theme.palette.common.white,
      'borderBottom': '1px solid',
      'borderBottomColor': theme.palette.midnight.A12,
      'transition': 'background-color .15s linear',

      '&:hover': {
        backgroundColor: theme.palette.midnight.A12,
        transition: 'background-color .15s linear'
      }
    },

    '.MuiLink-root': {
      'padding': theme.spacing(1.5, 2),
      'color': theme.palette.common.white,

      [theme.breakpoints.down('md')]: {
        fontSize: 16,
        lineHeight: 1.5
      },

      [theme.breakpoints.up('md')]: {
        color: theme.palette.text.primary
      },

      '&:hover': {
        textDecoration: 'none'
      }
    }
  }
}));

const NavItemLocaleMenu = styled(NavItem, {
  name: 'Header',
  slot: 'NavItemLocaleMenu'
})(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 1),
  paddingTop: theme.spacing(0.5),

  [theme.breakpoints.up('md')]: {
    '& > div > div > a': {
      padding: theme.spacing(1, 4, 0, 0),
      position: 'absolute',
      width: 1,
      height: 1,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)',
      border: 0
    },

    '& svg': {
      marginLeft: theme.spacing(0.5)
    },

    '& [class*=menuRoot]': {
      right: theme.spacing(-0.5)
    }
  }
}));

const LocaleSwitcherIcon = styled(Box, {
  name: 'Header',
  slot: 'LocaleSwitcherIcon'
})(({ theme }) => ({
  display: 'none',
  width: theme.spacing(3),
  height: theme.spacing(3.25),
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 2px',

  [theme.breakpoints.up('md')]: {
    display: 'block'
  }
}));

const RightNavItems = styled(List, {
  name: 'Header',
  slot: 'RightNavItems'
})(() => ({
  display: 'flex',
  flexDirection: 'row',
  marginLeft: 'auto'
}));

const MobileNavItems = styled(List, {
  name: 'Header',
  slot: 'MobileNavItems',
  overridesResolver: (_, styles) => [styles.root]
})(({ theme }) => ({
  'padding': 0,
  'height': '100%',
  'width': '100%',
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column',
  'color': theme.palette.common.white,

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row'
  },

  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(8)
  },

  '.MuiListItem-root': {
    padding: theme.spacing(1, 0)
  },

  '.MuiButton-contained': {
    marginTop: theme.spacing(4)
  },

  '.MuiLink-root': {
    'width': '100%',
    'fontSize': 18,
    'lineHeight': 1.5,
    'textDecoration': 'none',

    '& + svg': {
      marginLeft: 'auto'
    }
  }
}));

export default Header;
