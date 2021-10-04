// @ts-nocheck
import createTheme from '@last-rev/component-library/dist/theme/createTheme';

import { red } from '@mui/material/colors';
import { PaletteColor, PaletteOptions } from '@mui/material/styles';
import createCardVariants from './createCardVariants';
import createTextVariants from './createTextVariants';

declare module '@last-rev/component-library/dist/theme/createTheme' {
  interface CustomPalette {
    'custom-color': PaletteOptions['primary'];
  }

  interface CustomPaletteOptions {
    'custom-color': PaletteOptions['primary'];
  }
}

export const baseTheme: any = createTheme({
  typography: {
    body: {
      fontFamily: 'Open Sans',
      fontWeight: 400
    },
    heading: {
      fontFamily: 'Open Sans',
      fontWeight: 700
    }
  },
  palette: {
    primary: {
      main: '#9146ff',
      light: '#9146ff',
      dark: '#9146ff',
      contrastText: 'white'
    },
    secondary: {
      main: '#ffff55',
      light: '#ffff55',
      dark: '#c6b300',
      contrastText: 'white'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#FFF',
      light: '#F7F7F7'
    }
  }
});

const theme = createTheme(
  {
    components: {
      Header: {
        height: 100,
        mobileMenuBreakpoint: 'md',
        styleOverrides: {
          contentContainer: {
            height: 100,
            [baseTheme.breakpoints.up('sm')]: {
              paddingLeft: baseTheme.spacing(10),
              paddingRight: baseTheme.spacing(10)
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
        variants: createTextVariants(baseTheme),
        styleOverrides: {
          root: {}
        }
      },
      Card: {
        variants: createCardVariants(baseTheme),
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
              [baseTheme.breakpoints.up('md')]: {
                flexBasis: '50%'
              },
              [baseTheme.breakpoints.up('lg')]: {
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
            padding: baseTheme.spacing(3),
            paddingLeft: baseTheme.spacing(10),
            paddingRight: baseTheme.spacing(10),
            [baseTheme.breakpoints.down('sm')]: {
              paddingLeft: baseTheme.spacing(3),
              paddingRight: baseTheme.spacing(3)
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
            [baseTheme.breakpoints.down('sm')]: {
              'paddingLeft': baseTheme.spacing(3),
              'paddingRight': baseTheme.spacing(3),
              '& .MuiContainer-disableGutters': {
                paddingLeft: 0,
                paddingRight: 0
              }
            },
            'paddingLeft': baseTheme.spacing(10),
            'paddingRight': baseTheme.spacing(10),
            '& .MuiContainer-disableGutters': {
              paddingLeft: 0,
              paddingRight: 0
            }
          }
        }
      }
    }
  },
  baseTheme
);
export default theme;
