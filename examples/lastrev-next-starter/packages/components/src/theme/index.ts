import { responsiveFontSizes, ThemeOptions, createTheme } from '@mui/material/styles';
import Hero from '../components/Hero/Hero.theme';
import Card from '../components/Card/Card.theme';
import Media from '../components/Media/Media.theme';
import Quote from '../components/Quote/Quote.theme';
import Header from '../components/Header/Header.theme';
import Section from '../components/Section/Section.theme';
import Link from '../components/Link/Link.theme';
import Text from '../components/Text/Text.theme';
import NavigationItem from '../components/NavigationItem/NavigationItem.theme';
import Collection from '../components/Collection/Collection.theme';
import merge from 'lodash/merge';
import camelCase from 'lodash/camelCase';

const baseTheme: ThemeOptions = {
  spacing: 8,
  shape: {
    borderRadius: 8
  },
  breakpoints: {
    // Add any custom breakpoints here
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  typography: {
    // Customize add and/or remove as necesary
    body1: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: 1.5
    },
    body2: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: 1.5
    },
    h1: {
      fontFamily: 'Open Sans',
      fontSize: '4rem',
      lineHeight: 1.25,
      fontWeight: 400,
      fontStyle: 'normal'
    },
    h2: {
      fontFamily: 'Open Sans',
      fontSize: '3rem',
      lineHeight: 1.25,
      fontWeight: 400,
      fontStyle: 'normal'
    },
    h3: {
      fontFamily: 'Open Sans',
      fontSize: '2rem',
      lineHeight: 1.375,
      fontWeight: 400,
      fontStyle: 'normal'
    },
    h4: {
      fontFamily: 'Open Sans',
      fontSize: '1.5rem',
      lineHeight: 1.5,
      fontWeight: 400,
      fontStyle: 'normal'
    },
    h5: {
      fontFamily: 'Open Sans',
      fontSize: '1.25rem',
      lineHeight: 1.2,
      fontWeight: 400,
      fontStyle: 'normal'
    },
    h6: {
      fontFamily: 'Open Sans',
      fontSize: '1.125rem',
      lineHeight: 1.3333,
      fontWeight: 600,
      fontStyle: 'normal'
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#9146ff',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#F9F871',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    text: {
      primary: '#00030B',
      secondary: '#E5E5E5',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    error: {
      main: '#ff1744',
      light: 'rgb(255, 69, 105)',
      dark: 'rgb(178, 16, 47)',
      contrastText: '#fff'
    },
    common: {
      black: '#00030B',
      white: '#FFFFFF'
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff'
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff'
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff'
    }
  }
};

const createSchemeTheme = (schemeKey?: string) => {
  const baseSchemeTheme = createTheme(baseTheme);

  const schemeTheme = createTheme(
    merge(
      { scheme: camelCase(schemeKey) },
      baseSchemeTheme,
      ...[
        Header(baseSchemeTheme),
        Text(baseSchemeTheme),
        Card(baseSchemeTheme),
        Quote(baseSchemeTheme),
        Media(baseSchemeTheme),
        Hero(baseSchemeTheme),
        NavigationItem(baseSchemeTheme),
        Link(baseSchemeTheme),
        Section(baseSchemeTheme),
        Collection(baseSchemeTheme)
      ],
      {
        createSchemeTheme,
        components: {
          // CollectionAccordionMedia:
          NavigationBar: {
            styleOverrides: {
              root: {
                '& .MuiLink-root': {
                  'textDecoration': 'none',
                  '&.MuiLink-selected': { fontWeight: 'bold' }
                }
              }
            }
          },
          MuiContainer: {
            defaultProps: {
              maxWidth: 'xl'
            },
            styleOverrides: {
              root: {
                [baseSchemeTheme.breakpoints.down('sm')]: {
                  'paddingLeft': baseSchemeTheme.spacing(5),
                  'paddingRight': baseSchemeTheme.spacing(5),
                  '&.MuiContainer-disableGutters': {
                    paddingLeft: 0,
                    paddingRight: 0
                  }
                },
                [baseSchemeTheme.breakpoints.up('sm')]: {
                  paddingLeft: baseSchemeTheme.spacing(10),
                  paddingRight: baseSchemeTheme.spacing(10)
                },
                '&.MuiContainer-disableGutters': {
                  paddingLeft: 0,
                  paddingRight: 0
                }
              }
            }
          }
        }
      }
    )
  );
  // console.log('CreateSchemeTheme', schemeTheme);
  return responsiveFontSizes(schemeTheme);
};

const theme = createSchemeTheme();
export default theme;
