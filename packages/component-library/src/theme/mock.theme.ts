import createCardVariants from './createCardVariants';
import createHeroVariants from './createHeroVariants';
import createSectionVariants from './createSectionVariants';
import createAppTheme from './createTheme';
import { red, grey } from '@material-ui/core/colors';

export const baseTheme = createAppTheme({
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 684,
      md: 768,
      lg: 1024,
      xl: 1440
    }
  },
  palette: {
    primary: {
      main: '#fee501'
    },
    secondary: {
      main: '#005C7A'
    },
    tertiary: {
      main: '#bdefeb'
    },
    quartiary: {
      main: '#005c7a'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fFFF'
    }
  }
});

const theme = createAppTheme(
  {
    components: {
      Card: {
        variants: createCardVariants(baseTheme)
      },
      Hero: {
        variants: createHeroVariants(baseTheme),
        styleOverrides: {
          root: {
            padding: baseTheme.spacing(5),

            '& .MuiGrid-container': {
              alignItems: 'center',
            },
            h1: {
              color: 'grey',
            },
            h2: {
              color: baseTheme.palette.secondary.main
            },
            img: {
              width: '100%',
            }
          },
        }
      },
      Section: {
        variants: createSectionVariants(baseTheme),
        styleOverrides: {
          root: {
            // display: 'flex',
            // alignItems: 'center',
            // padding: baseTheme.spacing(5)
          },
          gridContainer: {
            alignItems: 'center'
          },
          gridItem: {
            // TODO: Review if this makes sense as a default
            '& > img': {
              width: '100%',
              height: 'auto',
              display: 'block',
              margin: 'auto'
            }
          }
        },
        defaultProps: {
          spacing: baseTheme.spacing(4)
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            'display': 'flex',
            'flexDirection': 'column',
            'justifyContent': 'space-around',
            'alignItems': 'center',
            'width': 'auto',
            'height': 'auto',
            'borderRadius': 0,
            'boxShadow': 'none',
            'fontSize': 0,

            // Image wrap
            '& .MuiBox-root': {
              width: '100%',
              height: '100%',
            },
            '& img': {
              width: '100%',
              height: '100%',
            }
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            width: '100%',
            padding: 20,
            textAlign: 'center'
          }
        }
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            fontSize: 18
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            paddingBottom: 10,
            fontSize: 40,
            fontWeight: 'bold'
          },
          h2: {
            paddingBottom: 20,
            fontSize: 32,
            fontWeight: 'bold'
          },
          h3: {
            paddingBottom: 20,
            fontSize: 20,
            fontWeight: 'bold'
          },
          h4: {
            paddingBottom: 20,
            fontSize: 18,
          },
          body1: {
            fontSize: '1.125rem'
          },
          body2: {
            fontSize: '0.875rem'
          }
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            cursor: 'pointer',
            color: 'black',
          }
        }
      }
    }
  },
  baseTheme
);

export default theme;
