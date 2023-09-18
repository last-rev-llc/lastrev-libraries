import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import './theme.types';
import { Roboto } from 'next/font/google';
import themeComponents from './theme.components';
import merge from 'lodash/merge';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const mainColors = ['primary', 'secondary', 'tertiary'];
const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: orange[600]
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  }
});
export const theme = merge(baseTheme, ...Object.values(themeComponents).map((t) => t(baseTheme)));

export default theme;
