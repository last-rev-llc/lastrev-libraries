import { createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import './theme.types';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const theme = createTheme({
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

export default theme;
