import { Roboto } from 'next/font/google';
import { type Breakpoint, type ThemeOptions, type Theme, createTheme } from '@mui/material/styles';
import deepmerge from '@mui/utils/deepmerge';
import './theme.types';
import createGridMixin from './mixins/createGridMixin';
import applyBackgroundColor from './mixins/applyBackgroundColor';
import themeComponents from './theme.components';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const mainColors = ['primary', 'secondary', 'tertiary'];

const defaultSpacing = 8;
const defaultBorderRadius = 10;

const muiTheme = createTheme();
const paletteTheme = createTheme({
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    xxl: 3840
  },
  palette: {
    mode: 'dark',
    ...{
      white: {
        main: '#FFF',
        contrastText: 'rgba(0, 0, 0, 0.87)'
      },
      black: {
        main: '#000',
        contrastText: '#FFF'
      }
    },
    primary: muiTheme.palette.augmentColor({
      color: {
        main: '#fba62d'
      },
      name: 'primary'
    }),
    secondary: muiTheme.palette.augmentColor({
      color: {
        main: '#00fff2'
      },
      name: 'secondary'
    }),

    // text: {
    //   primary: '#ffffff',
    //   secondary: '#E5E5E5',
    //   disabled: 'rgba(0, 0, 0, 0.38)'
    // },
    background: {
      // default: '#121212',
      // paper: '#1E1E1E'
      // contrastText: '#FFF'
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
});

const coreTheme = createTheme({
  ...paletteTheme,
  spacing: defaultSpacing,
  shape: {
    borderRadius: defaultBorderRadius
  },
  mixins: {
    gridContainer: createGridMixin,
    applyBackgroundColor
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    // TODO: Add Responsive font sizing
    body1: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.625
    },
    body2: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5
    },
    bodySmall: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 400,
      fontSize: '.875rem',
      lineHeight: 1.25
    },
    bodyLarge: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.625
    },

    h1: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '4.5rem',
      lineHeight: 1.375,
      fontWeight: 700,
      fontStyle: 'normal'
    },
    h2: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '4rem',
      lineHeight: 1.25,
      fontWeight: 700,
      fontStyle: 'normal'
    },
    h3: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '3rem',
      lineHeight: 1.375,
      fontWeight: 700,
      fontStyle: 'normal'
    },
    h4: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '2.25rem',
      lineHeight: 1.5,
      fontWeight: 700,
      fontStyle: 'normal'
    },
    h5: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      fontWeight: 700,
      fontStyle: 'normal'
    },
    h6: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '1.125rem',
      lineHeight: 1.3333,
      fontWeight: 700,
      fontStyle: 'normal',
      color: '#000000'
    },
    display1: {
      display: 'block',
      fontFamily: roboto.style.fontFamily,
      fontWeight: 'var(--display1-font-weight)',
      fontSize: 'var(--display1-font-size)',
      lineHeight: 'var(--display1-line-height)',
      margin: 'var(--display1-margin)'
    },
    display2: {
      display: 'block',
      fontFamily: roboto.style.fontFamily,
      fontWeight: 'var(--display2-font-weight)',
      fontSize: 'var(--display2-font-size)',
      lineHeight: 'var(--display2-line-height)',
      margin: 'var(--display2-margin)'
    },
    display3: {
      display: 'block',
      fontFamily: roboto.style.fontFamily,
      fontWeight: 'var(--display3-font-weight)',
      fontSize: 'var(--display3-font-size)',
      lineHeight: 'var(--display3-line-height)',
      margin: 'var(--display3-margin)'
    },
    display4: {
      display: 'block',
      fontFamily: roboto.style.fontFamily,
      fontWeight: 'var(--display4-font-weight)',
      fontSize: 'var(--display4-font-size)',
      lineHeight: 'var(--display4-line-height)',
      margin: 'var(--display4-margin)'
    },
    display5: {
      display: 'block',
      fontFamily: roboto.style.fontFamily,
      fontWeight: 500,
      fontSize: 'var(--display5-font-size)',
      lineHeight: 'var(--display5-line-height)',
      margin: 'var(--display5-margin)'
    },
    display6: {
      display: 'block',
      fontFamily: roboto.style.fontFamily,
      fontWeight: 'var(--overline-font-weight)',
      fontSize: 'var(--display6-font-size)',
      lineHeight: 'var(--display6-line-height)',
      margin: 'var(--display6-margin)'
    },
    overline: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 'var(--overline-font-weight)',
      fontSize: 'var(--overline-font-size)',
      lineHeight: 'var(--overline-line-height)',
      textTransform: 'uppercase',
      margin: 'var(--overline-margin)'
    }
  },
  containerBreakpoints: {
    ...paletteTheme.breakpoints,
    up(key: number | Breakpoint) {
      return paletteTheme.breakpoints.up(key)?.replace('@media', '@container');
    },
    down(key: number | Breakpoint) {
      return paletteTheme.breakpoints.down(key)?.replace('@media', '@container');
    }
  }
});

export const theme: Theme = createTheme(
  deepmerge(coreTheme, {
    components: Object.values(themeComponents)
      .map((t) => t(coreTheme))
      .reduce((acc, current) => {
        return { ...acc, ...current.components };
      }, {})
  })
);

// export const theme = merge(coreTheme, ...Object.values(themeComponents).map((t) => t(coreTheme)), {
//   containerBreakpoints: {
//     up(key: any) {
//       return paletteTheme.breakpoints.up(key)?.replace('@media', '@container');
//     },
//     down(key: any) {
//       return paletteTheme.breakpoints.down(key)?.replace('@media', '@container');
//     }
//   }
// });
