import { createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import './theme.types';
import { Roboto } from 'next/font/google';
import themeComponents from './theme.components';
import merge from 'lodash/merge';

console.log(themeComponents);

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: pink[600]
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  },
  components: {
    // TODO: Dynamically import all the theme files from the components
  }
});
export const theme = merge(baseTheme, ...Object.values(themeComponents).map((t) => t(baseTheme)));
console.log('Theme', theme);
export default theme;
