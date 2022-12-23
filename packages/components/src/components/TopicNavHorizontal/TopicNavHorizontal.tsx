import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import Link from '@last-rev/component-library/dist/components/Link';
import { NavigationItemProps } from '@last-rev/component-library/dist/components/NavigationItem';

export interface TopicNavHorizontalProps {
  navItems?: Array<NavigationItemProps>;
}

const TopicNavHorizontal = ({ navItems }: TopicNavHorizontalProps) => {
  if (!navItems) return null;
  const [topic, setTopic] = React.useState(navItems[0]?.text);
  const handleChange = (event: SelectChangeEvent | any) => {
    setTopic(event.target.value as string);
  };

  return (
    <ErrorBoundary>
      <Box
        px={2}
        py={{ xs: 1.345, md: 1.85 }}
        sx={{ backgroundColor: 'background.neutralGrey', position: 'relative', zIndex: 1000 }}
        data-testid="TopicNav-Horizontal">
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12}>
              <SelectMobile
                value={topic}
                label="topic"
                onChange={handleChange}
                variant="standard"
                IconComponent={KeyboardArrowDownIcon}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      'mt': 2,
                      'backgroundColor': 'common.white',
                      'boxShadow':
                        'rgba(0, 0, 0, 0.2) 0 2px 4px -1px, rgba(0, 0, 0, 0.14) 0 4px 5px 0, rgba(0, 0, 0, 0.12) 0 1px 10px 0',

                      '& .MuiMenuItem-root': {
                        'py': 1.5,
                        'px': 4,
                        'fontSize': 15,
                        'fontWeight': 500,
                        'lineHeight': '18px',

                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      },

                      '& [class*="MuiLink-root"]': {
                        width: '100%'
                      },

                      '& .Mui-selected': {
                        'backgroundColor': 'transparent',

                        '&.Mui-focusVisible': {
                          backgroundColor: 'transparent'
                        }
                      },

                      '@media (max-width: 600px)': {
                        'ml': -2,
                        'right': 0,
                        'maxWidth': '100%',

                        '& .MuiMenuItem-root': {
                          pl: 5
                        }
                      }
                    }
                  }
                }}>
                {navItems.map((navItem) => (
                  <MenuItem value={navItem.text} key={navItem.id as string}>
                    <Link href={navItem.href}>{navItem.text}</Link>
                  </MenuItem>
                ))}
              </SelectMobile>

              <NavList data-testid="TopicNav-Horizontal-List">
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
              </NavList>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ErrorBoundary>
  );
};

const SelectMobile = styled(Select, {
  name: 'Header',
  slot: 'SelectMobile'
})<{}>(({ theme }) => ({
  ...theme.typography.smallText,
  'fontWeight': 500,

  [theme.breakpoints.up('md')]: {
    display: 'none'
  },

  '&:before': {
    border: 0
  },

  '&:after': {
    border: 0
  },

  '&:hover:not(.Mui-disabled):before': {
    border: 0
  },

  '&.MuiSelect-root:hover': {
    border: 0
  },

  '& .MuiInput-input:focus': {
    backgroundColor: 'transparent'
  },

  '& svg': {
    right: -1,
    width: 20,
    marginTop: theme.spacing(-0.25),
    color: theme.palette.primary.main
  }
}));

const NavList = styled(List, {
  name: 'Header',
  slot: 'NavList'
})<{}>(({ theme }) => ({
  display: 'none',
  flexDirection: 'row',
  marginLeft: 'auto',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    display: 'inline-flex',
    padding: theme.spacing(1, 0)
  },

  [theme.breakpoints.down('xl')]: {
    '[class*="Header-navItem"]:first-child [class*=NavigationItem-menuRoot]': {
      'left': '0',
      'transform': 'none',

      '.MuiMenuItem-root:first-child::after': {
        left: '10%',
        transform: 'none'
      }
    }
  }
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
  'paddingBottom': 0.5,
  ...theme.typography.smallText,
  'fontWeight': 500,

  '[class*="NavigationItem-root"]:hover': {
    backgroundColor: 'transparent'
  },

  '.MuiLink-root': {
    'display': 'block',
    'padding': theme.spacing(1),
    'whiteSpace': 'nowrap',
    'borderBottom': '2px solid transparent',
    ...theme.typography.smallText,
    'textDecoration': 'none',

    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.background.integralOrange,
      textDecoration: 'none',
      transition: 'color 0.18s ease'
    },

    '&.active, &.sub-path-active': {
      cursor: 'default',
      borderBottom: '2px solid',
      borderBottomColor: theme.palette.background.integralOrange
    }
  },

  '.MuiList-root': {
    'zIndex': '10000',
    'display': 'none',
    'marginTop': theme.spacing(2),
    'left': '50%',
    'right': 'unset',
    'padding': 0,
    'overflow': 'visible',
    'backgroundColor': 'transparent',
    'boxShadow': `0px ${theme.spacing(0.25)} ${theme.spacing(1)} ${alpha(theme.palette.common.black, 0.25)}`,
    'transform': 'translateX(-50%)',

    '&::before': {
      content: "''",
      position: 'absolute',
      top: -20,
      left: 0,
      width: '100%',
      height: 20,
      backgroundColor: 'transparent'
    }
  },

  [theme.breakpoints.up('md')]: {
    '&:hover': {
      '&, & [class*="NavigationItem"]:hover': {
        '.MuiList-root': {
          display: 'block',
          maxHeight: 400
        }
      }
    }
  },

  '.MuiMenuItem-root': {
    'backgroundColor': theme.palette.common.white,

    '&:first-child': {
      'position': 'relative',

      '&::after': {
        content: "''",
        zIndex: '10000',
        position: 'absolute',
        left: '50%',
        top: theme.spacing(-1.5),
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: theme.spacing(0, 1.5, 1.5, 1.5),
        borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
        transform: 'translateX(-50%)'
      },

      '&:hover:after': {
        borderColor: `transparent transparent ${theme.palette.midnight.A09} transparent`
      }
    },

    '&:hover': {
      backgroundColor: theme.palette.midnight.A09
    },

    '.MuiLink-root': {
      padding: theme.spacing(1.5, 2),
      color: theme.palette.text.primary,
      fontWeight: 500
    }
  }
}));

export default TopicNavHorizontal;
