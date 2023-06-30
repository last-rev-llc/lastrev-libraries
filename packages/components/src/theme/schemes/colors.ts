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
  light: '#EAEBEC',
  dark: '#000',
  black: '#00030B',
  primary: '#000',
  secondary: '#2D5E4A',
  lightBlue: '#add8e6',
  brightGreen: '#6EFF29',
  navy: '#000080'
};

// All of the defaults for the site
// TODO: These need changed to the new scheme format
export const baseScheme = {
  palette: {
    primary: defaultColors.primary,
    primaryLight: defaultColors.light,
    primaryDark: defaultColors.dark,
    primaryContrastText: defaultColors.white,
    secondary: defaultColors.brightGreen,
    secondaryLight: '#5C9877',
    secondaryDark: '#2D5E4A',
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
    backgroundDefault: defaultColors.white,
    backgroundLight: defaultColors.white,
    backgroundDark: defaultColors.white,
    backgroundPaper: defaultColors.white
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
    backgroundDefault: defaultColors.black
  }
};

const colorSchemes: { [key: string]: any } = {
  white,
  black
};

export default colorSchemes;
