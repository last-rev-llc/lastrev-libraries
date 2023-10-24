import { type Breakpoint, type Theme, createTheme } from '@mui/material/styles';
import deepmerge from '@mui/utils/deepmerge';
import './theme.types';
import createGridMixin from './mixins/createGridMixin';
import applyBackgroundColor from './mixins/applyBackgroundColor';
import applyBackgroundOverlay from './mixins/applyBackgroundOverlay';
import themeComponents from './theme.components';

import { Spectral } from 'next/font/google';
import localFont from 'next/font/local';
const realHeadPro = localFont({
  src: [
    {
      path: '../../fonts/font-real-head-pro.woff2'
    }
  ]
});
export const spectral = Spectral({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false
});

export const mainColors = [
  'navy',
  'burgandy',
  'crimson',
  'sanJuan',
  'cornflower',
  'bordeaux',
  'cucumber',
  'texasRose',
  'transparentLight',
  'transparentDark',
  'lightGray',
  'darkGray'
];

const defaultSpacing = 8;
const defaultBorderRadius = 4;

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
    mode: 'light',

    transparentLight: {
      lighter: 'rgba(0, 0, 0, 0)',
      light: 'rgba(0, 0, 0, 0)',
      main: 'rgba(0, 0, 0, 0)',
      dark: 'rgba(0, 0, 0, 0)',
      contrastText: '#000000'
    },
    transparentDark: {
      lighter: 'rgba(255, 255, 255, 0)',
      light: 'rgba(255, 255, 255, 0)',
      main: 'rgba(255, 255, 255, 0)',
      dark: 'rgba(255, 255, 255, 0)',
      contrastText: '#ffffff'
    },
    darkGray: {
      lighter: 'rgba(0, 0, 0, .3)',
      light: 'rgba(0, 0, 0, .3)',
      main: 'rgba(0, 0, 0, .3)',
      dark: 'rgba(0, 0, 0, .3)',
      contrastText: '#000000'
    },

    lightGray: {
      lighter: '#F8F8F8',
      light: '#F8F8F8',
      main: '#F8F8F8',
      dark: '#F8F8F8',
      contrastText: '#000000'
    },

    navy: { lighter: '#002339', light: '#002339', main: '#002339', dark: '#002339', contrastText: '#ffffff' },
    burgandy: { lighter: '#9D0031', light: '#9D0031', main: '#9D0031', dark: '#9D0031', contrastText: '#ffffff' },
    crimson: { lighter: '#EC1A3A', light: '#EC1A3A', main: '#EC1A3A', dark: '#EC1A3A', contrastText: '#ffffff' },
    sanJuan: { lighter: '#395B7E', light: '#395B7E', main: '#395B7E', dark: '#395B7E', contrastText: '#ffffff' },
    cornflower: { lighter: '#93BDE4', light: '#93BDE4', main: '#93BDE4', dark: '#93BDE4', contrastText: '#ffffff' },
    bordeaux: { lighter: '#5E001D', light: '#5E001D', main: '#5E001D', dark: '#5E001D', contrastText: '#ffffff' },
    cucumber: { lighter: '#83AE74', light: '#83AE74', main: '#83AE74', dark: '#83AE74', contrastText: '#ffffff' },
    texasRose: { lighter: '#FDBA4D', light: '#FDBA4D', main: '#FDBA4D', dark: '#FDBA4D', contrastText: '#ffffff' },

    // TODO: Get  shades
    offwhite: { lighter: '#f8f8f8', light: '#f8f8f8', main: '#f8f8f8', dark: '#f8f8f8', contrastText: '#000000' },

    background: {
      // default: '#FFFFFF',
      // paper: '#E3E3E3'
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
    },

    white: {
      main: '#FFF',
      contrastText: '#03263e'
    },
    black: {
      main: '#1F1F1F',
      contrastText: '#FFF'
    }
  }
});

const coreTheme = createTheme({
  ...paletteTheme,
  palette: {
    ...paletteTheme.palette,
    primary: paletteTheme.palette.offwhite,
    secondary: paletteTheme.palette.blueGray
  },
  spacing: defaultSpacing,
  shape: {
    borderRadius: defaultBorderRadius
  },
  mixins: {
    gridContainer: createGridMixin,
    applyBackgroundColor,
    applyBackgroundOverlay
  },
  typography: {
    fontFamily: realHeadPro.style.fontFamily,
    navLink: {
      fontWeight: 600,
      lineHeight: 1.17,
      letterSpacing: '1px',
      textTransform: 'uppercase',

      fontSize: 'var(--bodySmall-font-size)'
    },
    bodySpectral: {
      fontFamily: `${spectral.style.fontFamily}, Georgia, Arial`
    },
    body1: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--body1-font-weight)',
      fontSize: 'var(--body1-font-size)',
      lineHeight: 'var(--body1-line-height)',
      margin: 'var(--body1-margin)',
      color: 'inherit'
    },
    body2: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--body2-font-weight)',
      fontSize: 'var(--body2-font-size)',
      lineHeight: 'var(--body2-line-height)',
      margin: 'var(--body2-margin)',
      color: 'inherit'
    },
    bodyXSmall: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--bodyXSmall-font-weight)',
      fontSize: 'var(--bodyXSmall-font-size)',
      lineHeight: 'var(--bodyXSmall-line-height)',
      margin: 'var(--bodyXSmall-margin)',
      color: 'inherit'
    },
    bodySmall: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--bodySmall-font-weight)',
      fontSize: 'var(--bodySmall-font-size)',
      lineHeight: 'var(--bodySmall-line-height)',
      margin: 'var(--bodySmall-margin)',
      color: 'inherit'
    },
    bodyLarge: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--bodyLarge-font-weight)',
      fontSize: 'var(--bodyLarge-font-size)',
      lineHeight: 'var(--bodyLarge-line-height)',
      margin: 'var(--bodyLarge-margin)',
      color: 'inherit'
    },
    display1: {
      display: 'block',
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--display1-font-weight)',
      fontSize: 'var(--display1-font-size)',
      lineHeight: 'var(--display1-line-height)',
      margin: 'var(--display1-margin)',
      color: paletteTheme?.palette?.tertiary?.main
    },
    display2: {
      display: 'block',
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--display2-font-weight)',
      fontSize: 'var(--display2-font-size)',
      lineHeight: 'var(--display2-line-height)',
      margin: 'var(--display2-margin)',
      color: paletteTheme?.palette?.tertiary?.main
    },
    h1: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--h1-font-weight)',
      fontSize: 'var(--h1-font-size)',
      lineHeight: 'var(--h1-line-height)',
      margin: 'var(--h1-margin)',
      fontStyle: 'normal'
    },
    h2: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--h2-font-weight)',
      fontSize: 'var(--h2-font-size)',
      lineHeight: 'var(--h2-line-height)',
      margin: 'var(--h2-margin)',
      fontStyle: 'normal'
    },
    h3: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--h3-font-weight)',
      fontSize: 'var(--h3-font-size)',
      lineHeight: 'var(--h3-line-height)',
      margin: 'var(--h3-margin)',
      fontStyle: 'normal'
    },
    h4: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--h4-font-weight)',
      fontSize: 'var(--h4-font-size)',
      lineHeight: 'var(--h4-line-height)',
      margin: 'var(--h4-margin)',
      fontStyle: 'normal'
    },
    h5: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--h5-font-weight)',
      fontSize: 'var(--h5-font-size)',
      lineHeight: 'var(--h5-line-height)',
      margin: 'var(--h5-margin)',
      fontStyle: 'normal'
    },
    h6: {
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--h6-font-weight)',
      fontSize: 'var(--h6-font-size)',
      lineHeight: 'var(--h6-line-height)',
      margin: 'var(--h6-margin)',
      color: '#000000'
    },
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    overline: {
      display: 'block',
      fontFamily: realHeadPro.style.fontFamily,
      fontWeight: 'var(--overline-font-weight)',
      fontSize: 'var(--overline-font-size)',
      lineHeight: 'var(--overline-line-height)',
      textTransform: 'uppercase',
      margin: 'var(--overline-margin)',
      color: 'inherit'
    },
    button: {},
    caption: {}
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

export const breakpoints = theme.breakpoints.values;

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
