import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import createCardVariants from './variants/createCardVariants';
import createTextVariants from './variants/createTextVariants';
import { Mixins } from '@mui/material/styles/createMixins';
import merge from 'lodash/merge';
import camelCase from 'lodash/camelCase';
import { Theme } from '@mui/material/styles';

import { createSchemePalette } from './schemes/utils/paletteColors';
import { getPaletteAccents } from './schemes/utils/accentColors';
import colorSchemes from './schemes/colors';
declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    getSectionBreakpointSpacing: (theme: Theme, options?: any) => CSSProperties;
    sectionSpacing: (theme: Theme, options?: any) => CSSProperties;
    section: (theme: Theme, options?: any) => CSSProperties;
    introTextWrap: (theme: Theme, options?: any) => CSSProperties;
    containerWrap: (theme: Theme, options?: any) => CSSProperties;
    getContainerBreakpointSpacing: (theme: Theme, options?: any) => CSSProperties;
    containerSpacing: (theme: Theme, options?: any) => CSSProperties;
    responsiveContainerSpacing: (theme: Theme, options?: any) => CSSProperties;
    getResponsiveInnerContentPadding: (theme: Theme, options?: any) => CSSProperties;
    getInnerContentPadding: (theme: Theme, options?: any) => CSSProperties;
    container: (theme: Theme, options?: any) => CSSProperties;
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
    // Add any custom breakpoints here
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  mixins: {
    getSectionBreakpointSpacing: (
      theme: Theme,
      options: { noGutters?: boolean; inner?: boolean; breakpoint?: string } = {}
    ) => {
      if (options?.noGutters) return 0;

      switch (options.breakpoint) {
        case 'xs':
          return options?.inner ? theme.spacing(2) : theme.spacing(4);

        case 'sm':
          return options?.inner ? theme.spacing(4) : theme.spacing(8);

        case 'md':
          return options?.inner ? theme.spacing(4) : theme.spacing(8);

        case 'lg':
          return options?.inner ? theme.spacing(6) : theme.spacing(10);

        case 'xl':
          return options?.inner ? theme.spacing(6) : theme.spacing(10);

        default:
          return options?.inner ? theme.spacing(2) : theme.spacing(4);
      }
    },

    // Utility to help avoid unnecessary overrides so the spacing can be used at whatever breakpoint
    sectionSpacing: (theme: Theme, options: { inverse?: boolean } = {}) => ({
      ...(options.inverse
        ? {
            paddingTop: theme.mixins.getSectionBreakpointSpacing(theme, options),
            paddingBottom: theme.mixins.getSectionBreakpointSpacing(theme, options)
          }
        : {
            marginTop: theme.mixins.getSectionBreakpointSpacing(theme, options),
            marginBottom: theme.mixins.getSectionBreakpointSpacing(theme, options)
          })
    }),

    section: (theme: Theme, options = {}) => {
      const sectionBreakpoints: { [key: string]: any } = {};
      theme?.breakpoints?.keys.map(
        (breakpoint) =>
          (sectionBreakpoints[theme.breakpoints.up(breakpoint)] = theme.mixins.sectionSpacing(theme, {
            breakpoint,
            ...options
          }))
      );
      return sectionBreakpoints;
    },

    introTextWrap: (theme: Theme, options = {}) => ({
      ...theme.mixins.sectionSpacing(theme, { ...options })
    }),

    containerWrap: (theme: Theme, options: { maxWidth?: string } = {}) => {
      const maxBreakpintWidth: number = options.maxWidth && (theme.breakpoints.values as any)[options.maxWidth];
      const maxWidth: string = maxBreakpintWidth ? `${maxBreakpintWidth}px` : '100%';

      const containerWrapStyles: any = {
        maxWidth,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxSizing: 'border-box'
      };

      return containerWrapStyles;
    },

    getContainerBreakpointSpacing: (
      theme: Theme,
      options: { noGutters?: boolean; inner?: boolean; breakpoint?: string } = {}
    ) => {
      if (options?.noGutters) return 0;

      switch (options.breakpoint) {
        case 'xs':
          return options?.inner ? theme.spacing(2) : theme.spacing(4);

        case 'sm':
          return options?.inner ? theme.spacing(4) : theme.spacing(8);

        case 'md':
          return options?.inner ? theme.spacing(4) : theme.spacing(8);

        case 'lg':
          return options?.inner ? theme.spacing(8) : theme.spacing(10);

        case 'xl':
          return options?.inner ? theme.spacing(8) : theme.spacing(10);

        default:
          return options?.inner ? theme.spacing(2) : theme.spacing(4);
      }
    },

    // Utility to help avoid unnecessary overrides so the spacing can be used at whatever breakpoint
    containerSpacing: (theme: Theme, options: { inverse?: boolean; breakpoint?: string } = { breakpoint: 'sm' }) => ({
      ...(options.inverse
        ? {
            marginLeft: theme.mixins.getContainerBreakpointSpacing(theme, options),
            marginRight: theme.mixins.getContainerBreakpointSpacing(theme, options)
          }
        : {
            paddingLeft: theme.mixins.getContainerBreakpointSpacing(theme, options),
            paddingRight: theme.mixins.getContainerBreakpointSpacing(theme, options)
          })
    }),

    responsiveContainerSpacing: (theme: Theme, options = {}) => {
      const containerBreakpoints: { [key: string]: any } = {};
      theme?.breakpoints?.keys.map(
        (breakpoint) =>
          (containerBreakpoints[theme.breakpoints.up(breakpoint)] = theme.mixins.containerSpacing(theme, {
            breakpoint,
            ...options
          }))
      );

      return containerBreakpoints;
    },

    // Utility to help avoid unnecessary overrides so the spacing can be used at whatever breakpoint
    getInnerContentPadding: (
      theme: Theme,
      options: { inverse?: boolean; breakpoint?: string } = { breakpoint: 'sm' }
    ) => ({
      ...(options.inverse
        ? {
            margin: theme.mixins.getContainerBreakpointSpacing(theme, options)
          }
        : {
            padding: theme.mixins.getContainerBreakpointSpacing(theme, options)
          })
    }),

    getResponsiveInnerContentPadding: (theme: Theme, options = {}) => {
      const containerBreakpoints: { [key: string]: any } = {};
      theme?.breakpoints?.keys.map(
        (breakpoint) =>
          (containerBreakpoints[theme.breakpoints.up(breakpoint)] = theme.mixins.getInnerContentPadding(theme, {
            breakpoint,
            ...options
          }))
      );

      return containerBreakpoints;
    },

    container: (theme: Theme, options: { noGutters?: boolean; maxWidth?: string } = {}) => ({
      ...theme.mixins.containerWrap(theme, { maxWidth: options?.maxWidth }),

      ...theme.mixins.responsiveContainerSpacing(theme, { noGutters: options?.noGutters })
    })
  },
  typography: {
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
    },
    overline: {
      fontFamily: 'Open Sans',
      fontSize: '1rem',
      color: '#6C7B9B', // TODO Pull from colors grey400
      lineHeight: 1,
      fontWeight: 600,
      fontStyle: 'normal',
      textTransform: 'unset'
    }
  },
  palette: {
    ...getPaletteAccents()
  }
};

const createSchemeTheme = (schemeKey?: string) => {
  const scheme: any = createSchemePalette(colorSchemes[camelCase(schemeKey)]);
  const baseSchemeTheme = createTheme(merge({ scheme: schemeKey }, baseTheme, scheme));

  const schemeTheme = createTheme(
    merge({}, baseSchemeTheme, {
      createSchemeTheme,
      components: {
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
