import createAppTheme from '@last-rev/component-library/dist/theme/createTheme';
import createCardVariants from './variants/createCardVariants';
import createTextVariants from './variants/createTextVariants';
import createAutocompleteBoxVariants from './variants/createAutocompleteBoxVariants';
import { Mixins } from '@mui/material/styles/createMixins';
import merge from 'lodash/merge';
import camelCase from 'lodash/camelCase';

import createCollectionVariants from './variants/createCollectionVariants';
import createHeroVariants from './variants/createHeroVariants';
import createSectionVariants from './variants/createSectionVariants';

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    // declare any custom mixins here - Example Below
    // container: (theme: Theme, options?: any) => CSSProperties;
  }
}

declare module '@mui/material/styles/createPalette' {
  export interface TypeBackground {
    dark: string;
    yellow: string;
    neutralGrey: string;
    coolGrey: string;
    integralOrange: string;
    aquaPearl: string;
    greenishBlue: string;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    mixins: Mixins;
    scheme?: string;
    createScheme: (scheme: string) => Theme;
  }

  interface Palette {
    midnight: Palette['primary'];
    yellow: Palette['primary'];
    aqua: Palette['primary'];
    periwinkle: Palette['primary'];
    coolGrey: Palette['primary'];
  }

  interface PaletteColor {
    lighter?: string;
    A100?: string;
    A90?: string;
    A80?: string;
    A70?: string;
    A60?: string;
    A50?: string;
    A40?: string;
    A30?: string;
    A20?: string;
    A12?: string;
    A09?: string;
    A06?: string;
    A03?: string;
  }

  interface TypographyVariants {
    body3: React.CSSProperties;
    time: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    time: true;
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
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1440
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
    },
    body3: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '21px'
    },
    overline: {
      fontSize: 12,
      fontWeight: 600,
      lineHeight: '18px'
    },
    time: {
      color: '#335B6E',
      fontSize: 15,
      lineHeight: 1.2
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#FF574A',
      light: '#FF685C',
      dark: '#DC2D1F',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#00324A',
      secondary: '#335B6E',
      disabled: '#CCC'
    },
    common: {
      black: '#00030B',
      white: '#FFFFFF'
    },
    background: {
      default: '#FFFFFF',
      paper: '#EFF0F1',
      dark: '#00324A',
      yellow: '#FFD12B',
      neutralGrey: '#E0E6E9',
      coolGrey: '#E3F1F2',
      integralOrange: '#FF574A',
      aquaPearl: '#68ABDD',
      greenishBlue: '#1264A3'
    },
    midnight: {
      main: '#00324A',
      A100: '#00324A',
      A90: '#1A475C',
      A80: '#335B6E',
      A70: '#4D7080',
      A60: '#668492',
      A50: '#8099A5',
      A40: '#99ADB7',
      A30: '#B3C2C9',
      A20: '#CCD6DB',
      A12: '#E0E6E9',
      A09: '#E8EDEF',
      A06: '#F0F3F4',
      A03: '#F7F9FA',
      contrastText: '#FFFFFF'
    },
    yellow: {
      main: '#FFD12B',
      light: '#FFE173',
      contrastText: '#00030B',
    },
    aqua: {
      main: '#00D1C0',
      light: '#36E0D2',
      dark: '#00B7A9',
      contrastText: '#00030B'
    },
    periwinkle: {
      main: '#596FFF',
      light: '#8091FF',
      lighter: '#ACB7FF',
      dark: '#4E62E0',
      contrastText: '#FFFFFF',
    },
    coolGrey: {
      main: '#C3DCDE',
      light: '#D3EBED',
      lighter: '#E3F1F2',
      contrastText: '#00030B'
    }
  }
};

const createSchemeTheme = (schemeKey?: string) => {
  const baseSchemeTheme = createAppTheme(baseTheme as any);

  const schemeTheme = createAppTheme(
    merge({ scheme: camelCase(schemeKey) }, baseSchemeTheme, {
      createSchemeTheme,
      components: {
        Header: {
          height: 100,
          styleOverrides: {
            contentContainer: {
              height: 100,
            },
            root: {
              '& .MuiButton-contained': {
                padding: baseSchemeTheme.spacing(1.25, 2),
                fontSize: 15,
                lineHeight: 1.2,

                [baseSchemeTheme.breakpoints.up('md')]: {
                  marginLeft: baseSchemeTheme.spacing(1)
                }
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
              },

              // Removes extra <br> tag being added by Contentful
              '& > br:last-child': {
                display: 'none'
              },
            }
          }
        },
        Hero: {
          variants: createHeroVariants(baseSchemeTheme),
        },
        Card: {
          variants: createCardVariants(baseSchemeTheme),
          styleOverrides: {
            root: {
              backgroundColor: baseSchemeTheme.palette.background.default,

              '& [class*="MuiTypography-root"]': {
                color: baseSchemeTheme.palette.text.primary
              },

              '& [class*="MuiCardActions-root"] > :not(:first-of-type)': {
                marginLeft: baseSchemeTheme.spacing(2)
              }
            }
          }
        },
        Collection: {
          variants: createCollectionVariants(baseSchemeTheme),
          defaultProps: {
            maxWidth: 'xl'
          },
          styleOverrides: {
            root: {
              '[class*="Section-gridContainer"]': {
                display: 'grid',

                [baseSchemeTheme.breakpoints.up('md')]: {
                  gridAutoRows: '1fr'
                },

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
                },

                // For sets of `link list` cards on mobile
                // -- Doesn't affect other card sets
                [baseSchemeTheme.breakpoints.down('sm')]: {
                  '&:first-child > [class*="Card-root"]': {
                    paddingTop: 0,
                    borderTop: 0
                  }
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
        Section: {
          variants: createSectionVariants(baseSchemeTheme),
          styleOverrides: {
            root: {
              '& > [class*="Section-backgroundMedia"]': {
                zIndex: -1
              },
            },

            contentContainer: {
              padding: baseSchemeTheme.spacing(3, 10),

              [baseSchemeTheme.breakpoints.down('sm')]: {
                padding: baseSchemeTheme.spacing(3)
              }
            }
          }
        },
        AutocompleteBox: {
          variants: createAutocompleteBoxVariants(baseSchemeTheme),
          styleOverrides: {
            root: {}
          }
        },
        BackToTop: {
          styleOverrides: {
            root: {
              margin: baseSchemeTheme.spacing(0, 4, 4, 0),
              backgroundColor: baseSchemeTheme.palette.midnight.A09,
              color: baseSchemeTheme.palette.primary.dark,

              '&:hover': {
                backgroundColor: baseSchemeTheme.palette.midnight.A12
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
              padding: baseSchemeTheme.spacing(0, 3),

              [baseSchemeTheme.breakpoints.up('lg')]: {
                padding: baseSchemeTheme.spacing(0, 6),

                '& .MuiContainer-disableGutters': {
                  paddingLeft: 0,
                  paddingRight: 0
                }
              },

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
              color: baseSchemeTheme.palette.text.primary,
              textDecoration: 'none',
              textDecorationColor: 'currentColor',

              '&:hover': {
                textDecoration: 'underline'
              }
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              boxShadow: 'none',
              fontSize: 18,
              fontWeight: 600,
              lineHeight: 1.55,
              textTransform: 'none',

              '&:hover': {
                boxShadow: 'none'
              }
            },

            contained: {
              padding: baseSchemeTheme.spacing(2, 5),
              borderRadius: 50,
              color: baseSchemeTheme.palette.text.primary,

              '&:hover': {
                color: baseSchemeTheme.palette.common.white
              }
            },

            containedPrimary: {
              backgroundColor: baseSchemeTheme.palette.primary.light,

              '&:hover': {
                backgroundColor: baseSchemeTheme.palette.primary.dark
              }
            },

            containedSecondary: {
              backgroundColor: baseSchemeTheme.palette.common.white,
              color: baseSchemeTheme.palette.text.primary,

              '&:hover': {
                backgroundColor: baseSchemeTheme.palette.midnight.main,
                color: baseSchemeTheme.palette.common.white
              }
            },

            outlined: {
              padding: baseSchemeTheme.spacing(2, 5),
              borderRadius: 50,

              '&:hover': {
                color: baseSchemeTheme.palette.common.white
              }
            },

            outlinedPrimary: {
              borderColor: baseSchemeTheme.palette.primary.light,
              color: baseSchemeTheme.palette.primary.dark,

              '&:hover': {
                backgroundColor: baseSchemeTheme.palette.primary.dark,
                borderColor: baseSchemeTheme.palette.primary.dark
              }
            },

            outlinedSecondary: {
              borderColor: baseSchemeTheme.palette.midnight.main,
              color: baseSchemeTheme.palette.text.primary,

              '&:hover': {
                backgroundColor: baseSchemeTheme.palette.midnight.main,
                borderColor: baseSchemeTheme.palette.midnight.main
              }
            },

            text: {
              padding: 0,
              fontWeight: 600
            },

            textPrimary: {
              color: baseSchemeTheme.palette.primary.dark,

              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            },

            textSecondary: {
              color: baseSchemeTheme.palette.text.primary,

              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }
          }
        },
        MuiChip: {
          styleOverrides: {
            root: {
              height: 'auto',
              marginBottom: baseSchemeTheme.spacing(1),
              backgroundColor: baseSchemeTheme.palette.coolGrey.light,
              borderRadius: '3px',
              color: baseSchemeTheme.palette.text.primary,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',

              '&:hover': {
                backgroundColor: baseSchemeTheme.palette.coolGrey.main,
                transition: 'background-color 0.18s ease'
              }
            },

            sizeSmall: {
              padding: baseSchemeTheme.spacing(0.5, 0)
            },

            labelSmall: {
              fontSize: 12,
              lineHeight: 1.3333
            }
          }
        },
        MuiTable: {
          styleOverrides: {
            root: {
              margin: baseSchemeTheme.spacing(2, 0, 4)
            }
          }
        },
        MuiTableHeader: {
          styleOverrides: {
            root: {
              paddingBottom: 0,
              borderBottomColor: baseSchemeTheme.palette.midnight.A20,
              borderBottomWidth: baseSchemeTheme.spacing(0.25)
            }
          }
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: baseSchemeTheme.spacing(1),
              borderBottomColor: baseSchemeTheme.palette.midnight.A20,

              '& [class*="MuiTypography-body1"]': {
                ...baseSchemeTheme.typography.body3,
                display: 'inline'
              },

              '&[class*="MuiTableCell-head"] [class*="MuiTypography-body1"]': {
                fontWeight: 600
              }
            }
          }
        },
        MuiPagination: {
          styleOverrides: {
            root: {
              marginTop: baseSchemeTheme.spacing(5)
            },

            outlined: {
              '& li:last-child': {
                borderRight: `1px solid ${baseSchemeTheme.palette.midnight.A12}`
              },

              '& .MuiPaginationItem-page': {
                fontSize: 12,
                fontWeight: 600
              },

              '& [class*="MuiPaginationItem-root"]': {
                width: 30,
                height: 30,
                minWidth: 30,
                minHeight: 30,
                margin: 0,
                backgroundColor: baseSchemeTheme.palette.common.white,
                borderColor: baseSchemeTheme.palette.midnight.A12,
                borderRight: 0,

                '&[class*="Mui-selected"]': {
                  backgroundColor: baseSchemeTheme.palette.midnight.A03,

                  '&:hover': {
                    backgroundColor: baseSchemeTheme.palette.midnight.A06,
                  }
                },

                '&.Mui-disabled': {
                  opacity: 1,

                  '& svg': {
                    opacity: 0.5
                  }
                }
              }
            }
          }
        }
      }
    })
  );

  return schemeTheme;
};

const theme = createSchemeTheme();

export default theme;
