import React from 'react';
import Box from '@mui/material/Box';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import { NavigationItemProps } from '@last-rev/component-library/dist/components/NavigationItem/NavigationItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule/ContentModule';

import { styled, alpha } from '@mui/material/styles';
export interface TopicNavHorizontalProps {
  navItems?: Array<NavigationItemProps>;
}

const TopicNavHorizontal = ({ navItems }: TopicNavHorizontalProps) => {
  if (!navItems) return null;

  return (
    <ErrorBoundary>
      <Box p={2} sx={{ backgroundColor: 'background.neutralGrey' }} data-testid="TopicNav-Horizontal">
        <Container maxWidth={'xl'}>
          <Grid container>
            <Grid item xs={12}>
              <List
                data-testid="TopicNav-Horizontal-List"
                sx={{
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  flexDirection: 'row',
                  py: 2
                }}>
                {navItems.map((navItem) => (
                  <NavItem
                    data-testid={`TopicNav-Horizontal-List-Link-${navItem.id as string}`}
                    key={navItem.id as string}>
                    <ContentModule
                      {...navItem}
                      hideIcon
                      activeClassName="active"
                      subPathActiveClassName="sub-path-active"
                    />
                  </NavItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ErrorBoundary>
  );
};

const NavItem = styled(ListItem, {
  name: 'Header',
  slot: 'NavItem',
  overridesResolver: (_, styles) => [styles.root]
})<{}>(({ theme }) => ({
  'padding': theme.spacing(0, 1),
  'margin': 0,
  'height': '100%',
  'display': 'block',
  'fontSize': theme.typography.smallText.fontSize,
  'fontWeight': 500,
  'lineHeight': theme.typography.smallText.lineHeight,
  'paddingBottom': 0.5,

  '[class*="NavigationItem-root"]': {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },

  '.MuiLink-root': {
    'padding': theme.spacing(1),
    'display': 'block',
    ...theme.typography.smallText,
    'textDecoration': 'none',
    'whiteSpace': 'nowrap',

    '&:hover': {
      color: theme.palette.background.integralOrange,
      textDecoration: 'none',
      transition: 'color 0.18s ease',
      backgroundColor: 'transparent'
    },

    '&.active, &.sub-path-active': {
      cursor: 'default',
      borderBottom: '2px solid',
      borderBottomColor: theme.palette.background.integralOrange
    }
  },

  '.MuiList-root': {
    display: 'none',
    backgroundColor: 'transparent',
    left: 0,
    right: 'unset',
    zIndex: '10000'
  },

  '&:hover': {
    '&, & [class*="NavigationItem"]:hover': {
      '.MuiList-root': {
        'display': 'block',

        '&::after': {
          content: "''",
          position: 'absolute',
          left: theme.spacing(2),
          top: 0,
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: theme.spacing(0, 1, 1, 1),
          borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
          zIndex: '10000'
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

export default TopicNavHorizontal;
