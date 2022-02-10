import { responsiveFontSizes, createTheme, ThemeOptions } from '@mui/material/styles';
import createCardVariants from './variants/createCardVariants';
import createTextVariants from './variants/createTextVariants';
import merge from 'lodash/merge';
import camelCase from 'lodash/camelCase';

const baseTheme: ThemeOptions = {
  spacing: 8,
  shape: {
    borderRadius: 0
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
      main: '#FFFFFF',
      light: 'rgb(255, 255, 255)',
      dark: 'rgb(178, 178, 178)',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    secondary: {
      main: '#add8e6',
      light: '#add8e6',
      dark: 'rgb(121, 151, 161)',
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
    background: {
      default: '#E5E5E5',
      paper: '#E5E5E5'
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
    merge({ scheme: camelCase(schemeKey) }, baseSchemeTheme, {
      createSchemeTheme,
      components: {
        // Add any default props, styleoverrides, etc. below.
        // The below can be removed safely on project start, these are just examples
        Header: {
          height: 100,
          mobileMenuBreakpoint: 'md',
          styleOverrides: {
            contentContainer: {
              height: 100,
              [baseSchemeTheme.breakpoints.up('sm')]: {
                paddingLeft: baseSchemeTheme.spacing(10),
                paddingRight: baseSchemeTheme.spacing(10)
              }
            }
          }
        },
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
        Text: {
          variants: createTextVariants(baseSchemeTheme),
          styleOverrides: {
            root: {}
          }
        },
        Card: {
          variants: createCardVariants(baseSchemeTheme),
          styleOverrides: {
            root: {}
          }
        },
        Collection: {
          styleOverrides: {
            root: {
              'maxWidth': 1280,
              'margin': '0 auto',
              '[class*="Section-gridContainer"]': {
                'display': 'grid',
                'gridAutoRows': '1fr',
                '[class*="Box-content"]': {
                  display: 'block'
                }
              },
              '[class*="Section-gridItem"]': {
                display: 'flex',
                justifyContent: 'center',
                flexBasis: '100%',
                maxWidth: '100%',
                height: '100%',
                [baseSchemeTheme.breakpoints.up('md')]: {
                  flexBasis: '50%'
                },
                [baseSchemeTheme.breakpoints.up('lg')]: {
                  flexBasis: '33.333333%'
                }
              }
            }
          }
        },
        CollectionFiltered: {
          styleOverrides: {
            root: {}
          }
        },
        CollectionCarousel: {},
        CollectionAccordion: {},
        Hero: {
          styleOverrides: {
            root: {}
          }
        },
        Section: {
          styleOverrides: {
            contentContainer: {
              padding: baseSchemeTheme.spacing(3),
              paddingLeft: baseSchemeTheme.spacing(10),
              paddingRight: baseSchemeTheme.spacing(10),
              [baseSchemeTheme.breakpoints.down('sm')]: {
                paddingLeft: baseSchemeTheme.spacing(3),
                paddingRight: baseSchemeTheme.spacing(3)
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
                'paddingLeft': baseSchemeTheme.spacing(3),
                'paddingRight': baseSchemeTheme.spacing(3),
                '& .MuiContainer-disableGutters': {
                  paddingLeft: 0,
                  paddingRight: 0
                }
              },
              'paddingLeft': baseSchemeTheme.spacing(10),
              'paddingRight': baseSchemeTheme.spacing(10),
              '& .MuiContainer-disableGutters': {
                paddingLeft: 0,
                paddingRight: 0
              }
            }
          }
        }
      }
    })
  );

  return responsiveFontSizes(schemeTheme);
};

const theme = createSchemeTheme();
export default theme;
