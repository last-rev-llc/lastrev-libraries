import { DM_Sans } from 'next/font/google';
import { type Breakpoint, type Theme, createTheme } from '@mui/material/styles';
import deepmerge from '@mui/utils/deepmerge';
import './theme.types';
import createGridMixin from './mixins/createGridMixin';
import applyBackgroundColor from './mixins/applyBackgroundColor';
import themeComponents from './theme.components';

export const dmSans = DM_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const mainColors = ['sapphire', 'blue', 'green'];

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

    sapphire: { lighter: '#EAEDFA', light: '#5368D2', main: '#3049C9', dark: '#22338D' },

    blue: { lighter: '#ECF2FE', light: '#C4D6FB', main: '#407BF2', dark: '#264A91' },

    green: { lighter: '#EAF2EE', light: '#88B19C', main: '#317955', dark: '#1E4A34' },

    sunflower: { lighter: '#FFFBF1', light: '#FEE8AD', main: '#FED872', dark: '#9B8446' },

    fuchsia: { lighter: '#F6ECFF', light: '#C890FF', main: '#A040FF', dark: '#702DB3' },

    mint: { lighter: '#F9FDFC', light: '#DDF2EB', main: '#C4E9DD', dark: '#788E87' },

    orange: { lighter: '#FFF5E9', light: '#FFC37F', main: '#FF9823', dark: '#B36A19' },

    background: {
      // default: '#FFFFFF',
      // paper: '#E3E3E3'
      // default: '#121212',
      // paper: '#1E1E1E'
      // contrastText: '#FFFFFF'
    },
    error: {
      main: '#ff1744',
      light: 'rgb(255, 69, 105)',
      dark: 'rgb(178, 16, 47)',
      contrastText: '#FFFFFF'
    },
    common: {
      black: '#00030B',
      white: '#FFFFFF'
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#FFFFFF'
    },

    white: {
      main: '#FFFFFF',
      contrastText: '#1F1F1F'
    },
    black: {
      main: '#1F1F1F',
      contrastText: '#FFFFFF'
    }
  }
});

const coreTheme = createTheme({
  ...paletteTheme,
  palette: {
    ...paletteTheme.palette,
    primary: paletteTheme.palette.sapphire,
    secondary: paletteTheme.palette.sunflower
  },
  spacing: defaultSpacing,
  shape: {
    borderRadius: defaultBorderRadius
  },
  mixins: {
    gridContainer: createGridMixin,
    applyBackgroundColor
  },
  typography: {
    fontFamily: dmSans.style.fontFamily,
    // body1: {
    //   fontFamily: dmSans.style.fontFamily,
    //   fontWeight: 'var(--body1-font-weight)',
    //   fontSize: 'var(--body1-font-size)',
    //   lineHeight: 'var(--body1-line-height)',
    //   margin: 'var(--body1-margin)',
    //   color: 'inherit'
    // },
    // body2: {
    //   fontFamily: dmSans.style.fontFamily,
    //   fontWeight: 'var(--body2-font-weight)',
    //   fontSize: 'var(--body2-font-size)',
    //   lineHeight: 'var(--body2-line-height)',
    //   margin: 'var(--body2-margin)',
    //   color: 'inherit'
    // },
    // bodySmall: {
    //   fontFamily: dmSans.style.fontFamily,
    //   fontWeight: 'var(--bodySmall-font-weight)',
    //   fontSize: 'var(--bodySmall-font-size)',
    //   lineHeight: 'var(--bodySmall-line-height)',
    //   margin: 'var(--bodySmall-margin)',
    //   color: 'inherit'
    // },
    // bodyLarge: {
    //   fontFamily: dmSans.style.fontFamily,
    //   fontWeight: 'var(--bodyLarge-font-weight)',
    //   fontSize: 'var(--bodyLarge-font-size)',
    //   lineHeight: 'var(--bodyLarge-line-height)',
    //   margin: 'var(--bodyLarge-margin)',
    //   color: 'inherit'
    // },
    display1: {
      display: 'block',
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--display1-font-weight)',
      fontSize: 'var(--display1-font-size)',
      lineHeight: 'var(--display1-line-height)',
      margin: 'var(--display1-margin)',
      color: paletteTheme?.palette?.tertiary?.main
    },
    display2: {
      display: 'block',
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--display2-font-weight)',
      fontSize: 'var(--display2-font-size)',
      lineHeight: 'var(--display2-line-height)',
      margin: 'var(--display2-margin)',
      color: paletteTheme?.palette?.tertiary?.main
    },
    h1: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--h1-font-weight)',
      fontSize: 'var(--h1-font-size)',
      lineHeight: 'var(--h1-line-height)',
      margin: 'var(--h1-margin)',
      fontStyle: 'normal'
    },
    h2: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--h2-font-weight)',
      fontSize: 'var(--h2-font-size)',
      lineHeight: 'var(--h2-line-height)',
      margin: 'var(--h2-margin)',
      fontStyle: 'normal'
    },
    h3: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--h3-font-weight)',
      fontSize: 'var(--h3-font-size)',
      lineHeight: 'var(--h3-line-height)',
      margin: 'var(--h3-margin)',
      fontStyle: 'normal'
    },
    h4: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--h4-font-weight)',
      fontSize: 'var(--h4-font-size)',
      lineHeight: 'var(--h4-line-height)',
      margin: 'var(--h4-margin)',
      fontStyle: 'normal'
    },
    h5: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--h5-font-weight)',
      fontSize: 'var(--h5-font-size)',
      lineHeight: 'var(--h5-line-height)',
      margin: 'var(--h5-margin)',
      fontStyle: 'normal'
    },
    h6: {
      fontFamily: dmSans.style.fontFamily,
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
      fontFamily: dmSans.style.fontFamily,
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
