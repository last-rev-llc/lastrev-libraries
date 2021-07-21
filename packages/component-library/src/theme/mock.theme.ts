import createCardVariants from './createCardVariants';
import createSectionVariants from './createSectionVariants';
import createAppTheme from './createTheme';
import { red } from '@material-ui/core/colors';

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
      Section: {
        variants: createSectionVariants(baseTheme),
        styleOverrides: {
          root: {
            // display: 'flex',
            // alignItems: 'center',
            // padding: baseTheme.spacing(5)
          },
          gridContainer: {
            // alignItems: 'center'
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
      MuiTypography: {
        styleOverrides: {
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
      MuiCardActions: {
        styleOverrides: {
          root: {
            fontSize: 18
          }
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: baseTheme.palette.primary.main,
            color: 'black',
            textDecoration: 'none'
          }
        }
      }
    }
  },
  baseTheme
);

export default theme;
