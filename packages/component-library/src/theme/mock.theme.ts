import createCardVariants from './createCardVariants';
import createHeroVariants from './createHeroVariants';
import createLinkVariants from './createLinkVariants';
import createTextVariants from './createTextVariants';
import createSectionVariants from './createSectionVariants';
import createCollectionVariants from './createCollectionVariants';
import createCollectionCarouselVariants from './createCollectionCarouselVariants';
import createAppTheme from './createTheme';
import { red } from '@mui/material/colors';
import { ComponentsVariants } from '@mui/material';

export const baseTheme = createAppTheme({
  spacing: 8,
  shape: {
    borderRadius: 0
  },
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
      main: '#fee501',
      light: '#ffff55',
      dark: '#c6b300',
      contrastText: 'black'
    },
    'secondary': {
      main: '#005C7A',
      light: '#4689a9',
      dark: '#00334e',
      contrastText: 'white'
    },
    'tertiary': {
      main: '#30CEC2',
      light: '#72fff5',
      dark: '#009c92',
      contrastText: 'white'
    },
    'quartiary': {
      main: '#BDEFEB'
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
      Header: {
        styleOverrides: {
          contentContainer: {
            height: 100,
            padding: baseTheme.spacing(3),
            [baseTheme.breakpoints.up('sm')]: {
              paddingLeft: baseTheme.spacing(10),
              paddingRight: baseTheme.spacing(10)
            }
          }
        }
      },
      Text: {
        variants: createTextVariants(baseTheme)
      },
      Card: {
        variants: createCardVariants(baseTheme) as ComponentsVariants['Card']
      },
      Collection: {
        variants: createCollectionVariants(baseTheme) as ComponentsVariants['Collection'],
        styleOverrides: {
          root: {
            'maxWidth': 1280,
            'margin': '0 auto',
            'padding': baseTheme.spacing(4, 0),
            '[class*="Section-gridItem"]': {
              display: 'flex',
              justifyContent: 'center',
              flexBasis: '33.333333%',
              marginBottom: baseTheme.spacing(4)
            }
          }
        }
      },
      CollectionCarousel: {
        variants: createCollectionCarouselVariants(baseTheme)
      },
      CollectionAccordion: {
        //variants: createCollectionAccordionVariants(baseTheme),
        styleOverrides: {
          root: {
            '& .MuiPaper-accordion-standard': {
              background: baseTheme.palette.secondary.main
            },
            '& .MuiTypography-h4': {
              paddingBottom: 0,
              color: 'white',
              fontWeight: 'normal'
            },
            '& .MuiTypography-p': {
              color: baseTheme.palette.primary.main
            },
            '& .MuiCollapse-wrapper': {
              background: baseTheme.palette.background.paper
            },
            '& .MuiSvgIcon-root': {
              color: 'white'
            }
          }
        }
      },
      Hero: {
        variants: createHeroVariants(baseTheme),
        styleOverrides: {
          root: {
            'display': 'flex',
            '& .MuiGrid-container': {
              alignItems: 'center'
            },
            '& .MuiGrid-item': {
              width: '100%',
              [baseTheme.breakpoints.down('xl')]: {
                margin: '20px auto'
              }
            },

            // TODO: add more line spacing if <u> exists
            '& .MuiTypography-h1': {
              [baseTheme.breakpoints.down('lg')]: {
                fontSize: 36,
                lineHeight: '1.25'
              },
              u: {
                textUnderlinePosition: 'under',
                textDecorationThickness: 4,
                textDecorationColor: baseTheme.palette.tertiary?.main
              }
            },
            '& .MuiTypography-h2': {
              [baseTheme.breakpoints.down('lg')]: {
                fontSize: 28,
                lineHeight: '1.3'
              },
              u: {
                textUnderlinePosition: 'under',
                textDecorationThickness: 4,
                textDecorationColor: baseTheme.palette.tertiary?.main
              }
            },
            'img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover'
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
              display: 'block'
              // margin: 'auto'
            }
          },
          contentContainer: {
            padding: baseTheme.spacing(3),
            [baseTheme.breakpoints.up('sm')]: {
              paddingLeft: baseTheme.spacing(10),
              paddingRight: baseTheme.spacing(10)
            }
          }
        },
        defaultProps: {
          contentSpacing: 10
        }
      },

      //MUI
      MuiIcon: {
        styleOverrides: {
          root: {
            overflow: 'visible'
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            paddingBottom: baseTheme.spacing(2),
            fontSize: 40,
            fontWeight: 'bold',
            [baseTheme.breakpoints.up('lg')]: {
              paddingBottom: baseTheme.spacing(3)
            }
          },
          h2: {
            paddingBottom: baseTheme.spacing(2),
            fontSize: 32,
            fontWeight: 'bold',
            [baseTheme.breakpoints.up('lg')]: {
              paddingBottom: baseTheme.spacing(3)
            }
          },
          h3: {
            'paddingBottom': baseTheme.spacing(3),
            'fontSize': 32,
            'fontWeight': 'bold',
            'color': baseTheme.palette.secondary.main,
            '& u': {
              textDecorationColor: baseTheme.palette.tertiary?.main
            }
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
            fontSize: '1rem',
            [baseTheme.breakpoints.up('lg')]: {
              fontSize: '1.125rem'
            }
          },
          body2: {
            fontSize: '0.875rem'
          }
        }
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0
        },
        styleOverrides: {
          root: {
            backgroundColor: baseTheme.palette.background.default
          }
        }
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl'
        },
        styleOverrides: {
          root: {
            // [baseTheme.breakpoints.down('sm')]: {
            //   'paddingLeft': baseTheme.spacing(3),
            //   'paddingRight': baseTheme.spacing(3),
            //   '& .MuiContainer-disableGutters': {
            //     paddingLeft: 0,
            //     paddingRight: 0
            //   }
            // },
            'paddingLeft': baseTheme.spacing(10),
            'paddingRight': baseTheme.spacing(10),
            '& .MuiContainer-disableGutters': {
              paddingLeft: 0,
              paddingRight: 0
            }
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          color: 'secondary'
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
            'maxWidth': baseTheme.breakpoints.values.md,
            'borderRadius': 0,
            'boxShadow': 'none',
            'fontSize': 0,

            // Image wrap
            '& .MuiCardMedia-root': {
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
            'padding': 0,
            'paddingTop': baseTheme.spacing(2),
            'fontSize': 18,

            // Both can be Card CTAs
            '& .MuiButton-root': {
              margin: '0 auto'
            },
            '& .MuiLink-root': {
              margin: '0 auto'
            }
          }
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            'cursor': 'pointer',
            'color': 'black',
            '& .MuiIcon-root': {
              verticalAlign: 'middle'
            }
          }
        }
      },
      MuiButton: {
        variants: [
          {
            props: {
              variant: 'text'
            },
            style: {
              textTransform: 'none'
            }
          },
          {
            props: {
              variant: 'text',
              color: 'primary'
            },
            style: {
              color: baseTheme.palette.secondary.main
            }
          }
        ],
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            'fontWeight': 'bold',
            'padding': baseTheme.spacing(2, 3),
            '& .MuiButton-startIcon': {
              display: 'inline'
            },
            '& .MuiButton-endIcon': {
              display: 'inline'
            }
          },
          outlinedPrimary: {
            color: baseTheme.palette.text.primary,
            borderColor: baseTheme.palette.secondary.main,
            borderRadius: baseTheme.spacing(2)
          }
        }
      }
    }
  },
  baseTheme
);

export default theme;
