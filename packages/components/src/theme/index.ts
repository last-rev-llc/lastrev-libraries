// import { responsiveFontSizes } from '@mui/material/styles';
import createAppTheme from '@last-rev/component-library/dist/theme/createTheme';
import createCardVariants from './variants/createCardVariants';
import createSectionVariants from './variants/createSectionVariants';
import createTextVariants from './variants/createTextVariants';
import { Mixins } from '@mui/material/styles/createMixins';
import merge from 'lodash/merge';
import camelCase from 'lodash/camelCase';
// import { ThemeOptions } from '@mui/material/styles';
// import { createSchemePalette } from './schemes/utils/paletteColors';
// import { getPaletteAccents } from './schemes/utils/accentColors';
// import colorSchemes from './schemes/colors';
declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    // declare any custom mixins here - Example Below
    // container: (theme: Theme, options?: any) => CSSProperties;
  }
}

declare module '@mui/material/styles' {
  // eslint-disable-next-line
  interface Theme {
    mixins: Mixins;
  }
}
declare module '@mui/material/styles' {
  // eslint-disable-next-line
  interface Theme {
    scheme?: string;
    createScheme: (scheme: string) => Theme;
  }
}

const baseTheme = {
  spacing: 8,
  shape: {
    borderRadius: 0
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  },
  mixins: {
    // Add any custom mixins here - Example Below
    // container: (theme: Theme, options: { noGutters?: boolean; maxWidth?: string } = {}) => ({
    //   ...theme.mixins.containerWrap(theme, { maxWidth: options?.maxWidth }),
    //   ...theme.mixins.responsiveContainerSpacing(theme, { noGutters: options?.noGutters })
    // })
  },
  typography: {
    fontSize: 16,
    fontFamily: "'Inter', 'sans-serif'",
    fontStyle: 'normal',
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600
    },
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      lineHeight: 1.25
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.25
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5555
    },
    body1: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.5555
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
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
      primary: '#00324A',
      secondary: '#000',
      disabled: '#CCC'
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
      default: '#FFFFFF',
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
  const baseSchemeTheme = createAppTheme(baseTheme as any);

  const schemeTheme = createAppTheme(
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
            root: {
              '& [class*="MuiTypography-body1"]': {
                marginBottom: baseSchemeTheme.spacing(1),
                fontSize: '1rem',
                lineHeight: 1.5
              },
              '& li::marker': {
                fontSize: '1rem'
              },
              '& [class*=Media-embedRoot]': {
                aspectRatio: '16/9'
              }
            }
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
          variants: createSectionVariants(baseSchemeTheme),
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
        // MUI
        MuiTypography: {
          styleOverrides: {
            h1: {
              [baseSchemeTheme.breakpoints.down('md')]: {
                fontSize: 36,
                lineHeight: '45px'
              }
            },
            h2: {
              [baseSchemeTheme.breakpoints.down('md')]: {
                fontSize: 30,
                lineHeight: '42px'
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
        },
        MuiLink: {
          styleOverrides: {
            root: {
              color: baseSchemeTheme.palette.text.primary
            }
          }
        },
        MuiChip: {
          styleOverrides: {
            root: {
              height: 'auto',
              marginBottom: baseSchemeTheme.spacing(1),
              // TODO: reference colors from theme once defined
              backgroundColor: '#D3EBED',
              borderRadius: '3px',
              color: baseSchemeTheme.palette.text.primary,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
              '&:hover': {
                // TODO: reference colors from theme once defined
                backgroundColor: '#C3DCDE',
                transition: 'background-color 0.18s ease'
              }
            },
            sizeSmall: {
              padding: baseSchemeTheme.spacing(0.5, 0)
            },
            labelSmall: {
              fontSize: 12,
              lineHeight: 1.3333,
            }
          }
        }
      }
    })
  );

  // return responsiveFontSizes(schemeTheme);
  return schemeTheme;
};

const theme = createSchemeTheme();

export default theme;
