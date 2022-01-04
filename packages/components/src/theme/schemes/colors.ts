import { red } from '@mui/material/colors';

export type ColorScheme = {
  buildOptions: {
    name: string;
    key: string;
    createPaletteAccent: any;
    createScheme: any;
  };
  palette: {
    [key: string]: string;
  };
};

// Add colors here for reference in schemes below
const defaultColors = {
  white: '#FFFFFF',
  light: '#E5E5E5',
  dark: '#091635',
  black: '#00030B',
  primary: '#091635',
  secondary: '#0000FF',
  lightBlue: '#add8e6',
  deepSkyBlue: '#00bfff',
  navy: '#000080'
};

// All of the defaults for the site
export const baseScheme = {
  palette: {
    primary: defaultColors.primary,
    primaryLight: defaultColors.light,
    primaryDark: defaultColors.dark,
    primaryContrastText: defaultColors.white,
    secondary: defaultColors.deepSkyBlue,
    secondaryLight: '#AB0074',
    secondaryDark: '#FF0000',//defaultColors.navy,
    secondaryContrastText: defaultColors.navy,
    grey100: '#091635',
    grey200: '#19294F',
    grey300: '#324367',
    grey400: '#6C7B9B',
    grey500: '#909FBF',
    grey600: '#E6E9F1',
    grey700: '#F5F7FB',
    primaryTextColor: defaultColors.dark,
    secondaryTextColor: defaultColors.light,
    errorColor: red.A400,
    commonBlack: defaultColors.black,
    commonWhite: defaultColors.white,
    backgroundDefault: defaultColors.white, // TODO: Explore if this auto uses contrast text
    backgroundLight: defaultColors.white, // TODO: Explore if this auto uses contrast text
    backgroundDark: defaultColors.white, // TODO: Explore if this auto uses contrast text
    backgroundPaper: defaultColors.white // TODO: Explore if this auto uses contrast text
  }
};

// Should match the themes passed to the components
const white = {
  buildOptions: {
    key: 'white',
    name: 'White',
    createScheme: true,
    createPaletteAccent: true
  },
  palette: {
    primary: defaultColors.white,
    primaryTextColor: defaultColors.black,
    secondary: defaultColors.lightBlue,
    secondaryLight: defaultColors.lightBlue,
    backgroundDefault: defaultColors.light
  }
};

const black = {
  buildOptions: {
    key: 'black',
    name: 'Black',
    createScheme: true,
    createPaletteAccent: false
  },
  palette: {
    primary: defaultColors.black,
    primaryTextColor: defaultColors.white,
    secondary: defaultColors.white,
    secondaryLight: defaultColors.lightBlue,
    backgroundDefault: defaultColors.black,
  }
};


const colorSchemes: { [key: string]: any; } = {
  white,
  black
};

export default colorSchemes;
