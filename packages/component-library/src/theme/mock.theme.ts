import createCardVariants from './createCardVariants';
import createHeroVariants from './createHeroVariants';
import createLinkVariants from './createLinkVariants';
import createTextVariants from './createTextVariants';
import createSectionVariants from './createSectionVariants';
import createCollectionVariants from './createCollectionVariants';
import createCollectionCarrouselVariants from './createCollectionCarrouselVariants';
import createAppTheme from './createTheme';
import { red } from '@material-ui/core/colors';
import CollectionCarrousel from '../components/Collection/Collection';

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
    'primary': {
      main: '#fee501'
    },
    'secondary': {
      main: '#005C7A'
    },
    'tertiary': {
      main: '#bdefeb'
    },
    'quartiary': {
      main: '#005c7a'
    },
    'error': {
      main: red.A400
    },
    'gradient-primary': {
      main: 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',
      contrastText: 'white'
    },
    'background': {
      default: '#fFFF'
    }
  }
});

const theme = createAppTheme(
  {
    typography: {
      fontSize: 16
    },
    components: {
      // LRCL
      Link: {
        variants: createLinkVariants(baseTheme)
      },
      Text: {
        variants: createTextVariants(baseTheme)
      },
      Card: {
        variants: createCardVariants(baseTheme)
      },
      Collection: {
        variants: createCollectionVariants(baseTheme),
        styleOverrides: {
          root: {
            maxWidth: 1280,
            margin: '0 auto',
            padding: baseTheme.spacing(4, 0),
            '[class*="Section-gridItem"]': {
              display: 'flex',
              justifyContent: 'center',
              flexBasis: '33.333333%',
              marginBottom: baseTheme.spacing(4),
            }
          },
        }
      },
      CollectionCarrousel: {
        variants: createCollectionCarrouselVariants(baseTheme),
        styleOverrides: {
          root: {
            'maxWidth': 1280,
            'margin': '0 auto',
            padding: baseTheme.spacing(4, 0),
            '[class*="Section-gridItem"]': {
              display: 'flex',
              justifyContent: 'center',
              flexBasis: '33.333333%',
              marginBottom: baseTheme.spacing(4),
            },
            '& .MuiStepper-root': {
              justifyContent: 'center'
            },
            '& .MuiStepConnector-root': {
              flex: 0
            },
            '& .MuiStepConnector-line': {
              display: 'none'
            },
            '& .MuiStepIcon-text': {
              display: 'none'
            },
            '& .MuiSvgIcon-root': {
              width: 15
            }
          },
        }
      },
      Hero: {
        variants: createHeroVariants(baseTheme),
        styleOverrides: {
          root: {
            '& .MuiGrid-container': {
              alignItems: 'center'
            },
            'img': {
              width: '100%'
            }
          }
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
              width: 'auto',
              height: '100%',
              display: 'block',
              margin: 'auto'
            }
          }
        },
        defaultProps: {
          contentSpacing: 10
        }
      },

      // MUI
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl'
        },
        styleOverrides: {
          root: {
            [baseTheme.breakpoints.up('sm')]: {
              paddingLeft: baseTheme.spacing(10),
              paddingRight: baseTheme.spacing(10)
            },
            paddingLeft: baseTheme.spacing(3),
            paddingRight: baseTheme.spacing(3)
          }
        }
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            padding: baseTheme.spacing(2)
          },
          outlinedPrimary: {
            color: baseTheme.palette.text.primary,
            borderColor: baseTheme.palette.quartiary.main
          }
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
              height: '100%'
            },
            '& img': {
              width: '100%',
              height: '100%'
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
            padding: 0,
            paddingTop: baseTheme.spacing(2),
            fontSize: 18,

            '& .MuiLink-root': {
              margin: '0 auto',
            }
          },
        }
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            color: 'grey',
            paddingBottom: 10,
            fontSize: 40,
            fontWeight: 'bold'
          },
          h2: {
            paddingBottom: 20,
            fontSize: 32,
            fontWeight: 'bold',
            color: baseTheme.palette.secondary.main
          },
          h3: {
            paddingBottom: 20,
            fontSize: 32,
            fontWeight: 'bold',
            color: baseTheme.palette.secondary.main
          },
          h4: {
            paddingBottom: 20,
            fontSize: 20
          },
          h5: {
            paddingBottom: 20,
            fontSize: 18
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
            color: 'black'
          }
        }
      }
    }
  },
  baseTheme
);

export default theme;
