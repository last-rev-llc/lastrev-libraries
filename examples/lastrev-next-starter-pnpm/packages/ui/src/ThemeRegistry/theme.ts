import { Open_Sans } from 'next/font/google';
import { type Breakpoint, type ThemeOptions, type Theme, createTheme } from '@mui/material/styles';
import deepmerge from '@mui/utils/deepmerge';
import './theme.types';
import createGridMixin from './mixins/createGridMixin';
import applyBackgroundColor from './mixins/applyBackgroundColor';
import themeComponents from './theme.components';

export const openSans = Open_Sans({
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
        main: '#9146ff',
        contrastText: '#ffffff'
      },
      name: 'primary'
    }),
    secondary: muiTheme.palette.augmentColor({
      color: {
        main: '#ffff55',
        contrastText: '#000000'
      },
      name: 'secondary'
    }),

    tertiary: muiTheme.palette.augmentColor({
      color: {
        main: '#6530b2',
        contrastText: '#000000'
      },
      name: 'tertiary'
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
    fontFamily: openSans.style.fontFamily,
    body1: {
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--body1-font-weight)',
      fontSize: 'var(--body1-font-size)',
      lineHeight: 'var(--body1-line-height)',
      margin: 'var(--body1-margin)',
      color: 'inherit'
    },
    body2: {
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--body2-font-weight)',
      fontSize: 'var(--body2-font-size)',
      lineHeight: 'var(--body2-line-height)',
      margin: 'var(--body2-margin)',
      color: 'inherit'
    },
    bodySmall: {
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--bodySmall-font-weight)',
      fontSize: 'var(--bodySmall-font-size)',
      lineHeight: 'var(--bodySmall-line-height)',
      margin: 'var(--bodySmall-margin)',
      color: 'inherit'
    },
    bodyLarge: {
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--bodyLarge-font-weight)',
      fontSize: 'var(--bodyLarge-font-size)',
      lineHeight: 'var(--bodyLarge-line-height)',
      margin: 'var(--bodyLarge-margin)',
      color: 'inherit'
    },

    h1: {
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--h1-font-weight)',
      fontSize: 'var(--h1-font-size)',
      lineHeight: 'var(--h1-line-height)',
      margin: 'var(--h1-margin)',
      fontStyle: 'normal'
    },
    h2: {
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--h2-font-weight)',
      fontSize: 'var(--h2-font-size)',
      lineHeight: 'var(--h2-line-height)',
      margin: 'var(--h2-margin)',
      fontStyle: 'normal'
    },
    h3: {
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--h3-font-weight)',
      fontSize: 'var(--h3-font-size)',
      lineHeight: 'var(--h3-line-height)',
      margin: 'var(--h3-margin)',
      fontStyle: 'normal'
    },
    h4: {
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--h4-font-weight)',
      fontSize: 'var(--h4-font-size)',
      lineHeight: 'var(--h4-line-height)',
      margin: 'var(--h4-margin)',
      fontStyle: 'normal'
    },
    h5: {
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--h5-font-weight)',
      fontSize: 'var(--h5-font-size)',
      lineHeight: 'var(--h5-line-height)',
      margin: 'var(--h5-margin)',
      fontStyle: 'normal'
    },
    h6: {
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--h6-font-weight)',
      fontSize: 'var(--h6-font-size)',
      lineHeight: 'var(--h6-line-height)',
      margin: 'var(--h6-margin)',
      color: '#000000'
    },
    display1: {
      display: 'block',
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--display1-font-weight)',
      fontSize: 'var(--display1-font-size)',
      lineHeight: 'var(--display1-line-height)',
      margin: 'var(--display1-margin)',
      color: paletteTheme?.palette?.tertiary?.main
    },
    display2: {
      display: 'block',
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--display2-font-weight)',
      fontSize: 'var(--display2-font-size)',
      lineHeight: 'var(--display2-line-height)',
      margin: 'var(--display2-margin)',
      color: paletteTheme?.palette?.tertiary?.main
    },
    display3: {
      display: 'block',
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--display3-font-weight)',
      fontSize: 'var(--display3-font-size)',
      lineHeight: 'var(--display3-line-height)',
      margin: 'var(--display3-margin)',
      color: paletteTheme?.palette?.tertiary?.main
    },
    display4: {
      display: 'block',
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--display4-font-weight)',
      fontSize: 'var(--display4-font-size)',
      lineHeight: 'var(--display4-line-height)',
      margin: 'var(--display4-margin)',
      color: paletteTheme?.palette?.tertiary?.main
    },
    display5: {
      display: 'block',
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--display5-font-weight)',
      fontSize: 'var(--display5-font-size)',
      lineHeight: 'var(--display5-line-height)',
      margin: 'var(--display5-margin)',
      color: paletteTheme?.palette?.tertiary?.main
    },
    display6: {
      display: 'block',
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--display6-font-weight)',
      fontSize: 'var(--display6-font-size)',
      lineHeight: 'var(--display6-line-height)',
      margin: 'var(--display6-margin)',
      color: paletteTheme?.palette?.tertiary?.main
    },
    overline: {
      display: 'block',
      fontFamily: openSans.style.fontFamily,
      fontWeight: 'var(--overline-font-weight)',
      fontSize: 'var(--overline-font-size)',
      lineHeight: 'var(--overline-line-height)',
      textTransform: 'uppercase',
      margin: 'var(--overline-margin)',
      color: 'inherit'
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
