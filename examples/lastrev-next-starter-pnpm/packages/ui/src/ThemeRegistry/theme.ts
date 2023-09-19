import { Roboto } from 'next/font/google';
import merge from 'lodash/merge';

import { ThemeOptions, createTheme } from '@mui/material/styles';

import createGridMixin from './mixins/createGridMixin';
import themeComponents from './theme.components';
import './theme.types';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const mainColors = ['primary', 'secondary', 'tertiary'];

const defaultSpacing = 8;
const defaultBorderRadius = 0;

const baseTheme: ThemeOptions = {
  spacing: defaultSpacing,
  shape: {
    borderRadius: defaultBorderRadius
  },
  breakpoints: {
    // Add any custom breakpoints here
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 3840
    }
  },
  mixins: {
    gridContainer: createGridMixin // this gives your mixin the name `gridContainer`
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
      fontStyle: 'normal',
      color: '#fba62d'
    },
    h2: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '4rem',
      lineHeight: 1.25,
      fontWeight: 700,
      fontStyle: 'normal',
      color: '#fba62d'
    },
    h3: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '3rem',
      lineHeight: 1.375,
      fontWeight: 700,
      fontStyle: 'normal',
      color: '#fba62d'
    },
    h4: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '2.25rem',
      lineHeight: 1.5,
      fontWeight: 700,
      fontStyle: 'normal',
      color: '#00fff2'
    },
    h5: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      fontWeight: 700,
      fontStyle: 'normal',
      color: '#00fff2'
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
      fontFamily: roboto.style.fontFamily,
      fontWeight: 500,
      fontSize: '2.5rem',
      display: 'block',
      marginBottom: ' .25em'
    },
    display2: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 500,
      fontSize: '2.25rem',
      display: 'block',
      marginBottom: ' .25em'
    },
    display3: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 500,
      fontSize: '2rem',
      display: 'block',
      marginBottom: ' .25em'
    },
    display4: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 500,
      fontSize: '1.75rem',
      display: 'block',
      marginBottom: ' .25em'
    },
    display5: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 500,
      fontSize: '1.5rem',
      display: 'block',
      marginBottom: ' .25em'
    },
    display6: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 500,
      fontSize: '1.25rem',
      display: 'block',
      marginBottom: ' .25em'
    },
    overline: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 900,
      fontSize: '.75rem',
      textTransform: 'uppercase',
      marginBottom: `${defaultSpacing}px` // TODO: Check on this approach
    }
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
    primary: {
      main: '#00fff2',
      contrastText: '#000000'
    },
    secondary: {
      main: '#EDF0FF',
      contrastText: '#000000'
    },
    text: {
      primary: '#ffffff',
      secondary: '#E5E5E5',
      disabled: 'rgba(0, 0, 0, 0.38)'
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
};

const coreTheme = createTheme(baseTheme);
export const theme = merge(coreTheme, ...Object.values(themeComponents).map((t) => t(coreTheme)));

export default theme;
