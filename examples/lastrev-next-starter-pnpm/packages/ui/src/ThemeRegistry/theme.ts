import {
  type Breakpoint,
  experimental_extendTheme as extendTheme,
  CssVarsThemeOptions,
  createTheme
} from '@mui/material/styles';

import { deepmerge } from '@mui/utils';
import './theme.types';
import createGridMixin from './mixins/createGridMixin';
import applyColorScheme from './mixins/applyColorScheme';
import applyColorSchemeOverlay from './mixins/applyColorSchemeOverlay';
import themeComponents from './theme.components';

import { Inter_Tight } from 'next/font/google';

export const interTight = Inter_Tight({
  weight: ['200', '300', '400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  // fallback: ['Courier'],
  adjustFontFallback: false
});

const defaultSpacing = 8;
const defaultBorderRadius = 4;

const commonColors = {
  black: '#000000',
  navy: '#03263C',
  red: '#eb183d',
  white: '#ffffff',
  gray1: '#f8f8f8',
  gray2: '#E5E6E8',
  gray3: '#BBC5CB',
  gray4: '#7D909B',
  gray5: '#3C586A',
  transparentLight: 'rgba(0, 0, 0, 0)',
  transparentDark: 'rgba(255, 255, 255, 0)'
};

const schemes = {
  transparentLight: {
    primary: { main: commonColors.transparentLight, contrastText: commonColors.navy },
    secondary: { main: commonColors.red, contrastText: commonColors.white },
    linkColor: commonColors.navy,
    headerColor: commonColors.black,
    text: commonColors.navy,
    overlay: commonColors.navy,
    overlayText: commonColors.white
  },
  transparentDark: {
    primary: { main: commonColors.transparentDark, contrastText: commonColors.white },
    secondary: { main: commonColors.red, contrastText: commonColors.white },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.white,
    overlay: commonColors.gray2,
    overlayText: commonColors.black
  },
  lightGray: {
    primary: { main: commonColors.gray1, contrastText: commonColors.gray5 },
    secondary: { main: commonColors.red, contrastText: commonColors.white },
    linkColor: commonColors.gray5,
    headerColor: commonColors.gray5,
    text: commonColors.gray5,
    overlay: commonColors.gray1,
    overlayText: commonColors.gray5
  },
  navy: {
    primary: { main: commonColors.navy, contrastText: commonColors.gray2 },
    secondary: { main: commonColors.red, contrastText: commonColors.white },
    linkColor: commonColors.gray2,
    headerColor: commonColors.white,
    text: commonColors.gray2,
    overlay: commonColors.navy,
    overlayText: commonColors.white
  },
  white: {
    primary: { main: commonColors.white, contrastText: commonColors.gray5 },
    secondary: { main: commonColors.red, contrastText: commonColors.white },
    linkColor: commonColors.gray5,
    headerColor: commonColors.black,
    text: commonColors.gray5,
    overlay: commonColors.navy,
    overlayText: commonColors.white
  }
};

const paletteTheme = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    xxl: 3840
  },
  colorSchemes: {
    light: {
      palette: {
        schemes: schemes,
        ...schemes['white']
      }
    },
    dark: {
      palette: {
        schemes: schemes,
        ...schemes['navy']
      }
    }
  }
};

const muiTheme = extendTheme(paletteTheme);
const baseTheme = {
  ...paletteTheme,
  spacing: defaultSpacing,
  shape: {
    borderRadius: defaultBorderRadius
  },
  mixins: {
    gridContainer: createGridMixin,
    applyColorScheme,
    applyColorSchemeOverlay
  },
  typography: {
    fontFamily: interTight.style.fontFamily,

    navLink: {
      fontWeight: 600,
      lineHeight: 'var(--bodyXSmall-line-height)',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontFamily: interTight.style.fontFamily,
      fontSize: 'var(--bodyXSmall-font-size)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },

    body1: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--body1-font-weight)',
      fontSize: 'var(--body1-font-size)',
      lineHeight: 'var(--body1-line-height)',
      margin: 'var(--body1-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    body2: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--body2-font-weight)',
      fontSize: 'var(--body2-font-size)',
      lineHeight: 'var(--body2-line-height)',
      margin: 'var(--body2-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodyXSmall: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--bodyXSmall-font-weight)',
      fontSize: 'var(--bodyXSmall-font-size)',
      lineHeight: 'var(--bodyXSmall-line-height)',
      margin: 'var(--bodyXSmall-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodySmall: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--bodySmall-font-weight)',
      fontSize: 'var(--bodySmall-font-size)',
      lineHeight: 'var(--bodySmall-line-height)',
      margin: 'var(--bodySmall-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodyLarge: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--bodyLarge-font-weight)',
      fontSize: 'var(--bodyLarge-font-size)',
      lineHeight: 'var(--bodyLarge-line-height)',
      margin: 'var(--bodyLarge-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    display1: {
      display: 'block',
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--display1-font-weight)',
      fontSize: 'var(--display1-font-size)',
      lineHeight: 'var(--display1-line-height)',
      margin: 'var(--display1-margin)',
      color: 'var(--mui-palette-text-primary-header, inherit)',
      letterSpacing: '1px'
    },
    display2: {
      display: 'block',
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--display2-font-weight)',
      fontSize: 'var(--display2-font-size)',
      lineHeight: 'var(--display2-line-height)',
      margin: 'var(--display2-margin)',
      letterSpacing: '1px',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h1: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--h1-font-weight)',
      fontSize: 'var(--h1-font-size)',
      lineHeight: 'var(--h1-line-height)',
      margin: 'var(--h1-margin)',
      fontStyle: 'normal',
      letterSpacing: '1px',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h2: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--h2-font-weight)',
      fontSize: 'var(--h2-font-size)',
      lineHeight: 'var(--h2-line-height)',
      margin: 'var(--h2-margin)',
      fontStyle: 'normal',
      letterSpacing: '1px',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h3: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--h3-font-weight)',
      fontSize: 'var(--h3-font-size)',
      lineHeight: 'var(--h3-line-height)',
      margin: 'var(--h3-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h4: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--h4-font-weight)',
      fontSize: 'var(--h4-font-size)',
      lineHeight: 'var(--h4-line-height)',
      margin: 'var(--h4-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h5: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--h5-font-weight)',
      fontSize: 'var(--h5-font-size)',
      lineHeight: 'var(--h5-line-height)',
      margin: 'var(--h5-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h6: {
      fontFamily: interTight.style.fontFamily,
      fontWeight: 'var(--h6-font-weight)',
      fontSize: 'var(--h6-font-size)',
      lineHeight: 'var(--h6-line-height)',
      margin: 'var(--h6-margin)',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    subtitle1: {},
    subtitle2: {},
    overline: {
      display: 'block',
      fontFamily: interTight.style.fontFamily,
      letterSpacing: '1px',
      fontWeight: 'var(--overline-font-weight)',
      fontSize: 'var(--overline-font-size)',
      lineHeight: 'var(--overline-line-height)',
      textTransform: 'uppercase',
      margin: 'var(--overline-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    button: {},
    caption: {}
  },
  containerBreakpoints: {
    ...muiTheme.breakpoints,
    up: (key: Breakpoint | number) => {
      return muiTheme.breakpoints.up(key)?.replace('@media', '@container');
    },
    down: (key: Breakpoint | number) => {
      return muiTheme.breakpoints.down(key)?.replace('@media', '@container');
    }
  }
};

const coreTheme = extendTheme(baseTheme);

export const theme = extendTheme(
  deepmerge(baseTheme, {
    components: Object.values(themeComponents)
      .map((t) => t(coreTheme))
      .reduce((acc, current) => {
        return { ...acc, ...current.components };
      }, {})
  })
);

export const breakpoints = theme.breakpoints.values;
