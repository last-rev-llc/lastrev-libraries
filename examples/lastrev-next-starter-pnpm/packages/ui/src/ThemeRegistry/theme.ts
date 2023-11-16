import { DM_Sans } from 'next/font/google';
import {
  type Breakpoint,
  type ThemeOptions,
  createTheme,
  experimental_extendTheme as extendTheme,
  CssVarsThemeOptions
} from '@mui/material/styles';
import deepmerge from '@mui/utils/deepmerge';
import './theme.types';
import createGridMixin from './mixins/createGridMixin';
import applyColorScheme from './mixins/applyColorScheme';
import applyGrid from './mixins/applyGrid';
import themeComponents from './theme.components';

export const dmSans = DM_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const mainColors = ['sapphire', 'blue', 'green'];

const muiTheme = createTheme({});
const defaultSpacing = 8;
const defaultBorderRadius = 8;

const colors = {
  // sapphireLight: '#5368D2',
  // sapphireMain: '#3049C9',
  // sapphireDark: '#22338D',
  // sunflowerLighter: '#FFFBF1',
  // sunflowerMain: '#FED872',
  // sunflowerLight: '#FEE8AD',
  // sunflowerDark: '#9B8446',
  // greenLighter: '#EAF2EE',
  // greenLight: '#88B19C',
  // greenMain: '#317955',
  // greenDark: '#1E4A34',
  // blueLighter: '#ECF2FE',
  // blueLight: '#C4D6FB',
  // blueMain: '#407BF2',
  // blueDark: '#264A91'
  sapphirePinkGradient: {
    main: 'linear-gradient(281deg, #E82163 0%, #3049C9 100%)',
    dark: 'linear-gradient(281deg, #E82163 0%, #3049C9 100%)',
    light: 'linear-gradient(281deg, #E82163 0%, #3049C9 100%)',
    contrastText: '#FFF'
  },
  sapphire: { light: '#5368D2', main: '#3049C9', dark: '#22338D', contrastText: '#FFF' },
  sapphireLight: { light: '#EAEDFA', main: '#EAEDFA', dark: '#5368D2', contrastText: '#1F1F1F' },
  blue: { lighter: '#ECF2FE', light: '#C4D6FB', main: '#407BF2', dark: '#264A91', contrastText: '#FFF' },
  blueLight: { light: '#ECF2FE', main: '#ECF2FE', dark: '#407BF2', contrastText: '#264A91' },
  green: { lighter: '#EAF2EE', light: '#88B19C', main: '#317955', dark: '#1E4A34', contrastText: '#FFF' },
  greenLight: { light: '#EAF2EE', main: '#88B19C', dark: '#317955', contrastText: '#FFF' },
  sunflower: { light: '#FEE8AD', main: '#FED872', dark: '#9B8446', contrastText: '#1F1F1F' },
  sunflowerLight: { light: '#FFFBF1', main: '#FEE8AD', dark: '#FED872', contrastText: '#1F1F1F' },
  fuchsia: { lighter: '#F6ECFF', light: '#C890FF', main: '#A040FF', dark: '#702DB3', contrastText: '#FFF' },
  mint: { lighter: '#F9FDFC', light: '#DDF2EB', main: '#C4E9DD', dark: '#788E87', contrastText: '#1F1F1F' },
  orange: { lighter: '#FFF5E9', light: '#FFC37F', main: '#FF9823', dark: '#B36A19', contrastText: '#1F1F1F' },
  white: { lighter: '#FFF', light: '#FFF', main: '#FFF', dark: '#FFF', contrastText: '#1F1F1F' },
  black: { lighter: '#1F1F1F', light: '#1F1F1F', main: '#1F1F1F', dark: '#1F1F1F', contrastText: '#FFF' }
};

const schemes = {
  sapphire: {
    primary: colors.sapphire,
    secondary: colors.sunflower,
    highlightColor: colors.sunflower.main,
    overline: colors.sunflower.main
  },
  sapphireLight: {
    primary: colors.sapphireLight,
    secondary: colors.blue,
    highlightColor: colors.blue.main,
    overline: colors.blue.main
  },
  sapphireAccent: {
    primary: colors.white,
    secondary: { ...colors.sapphire, main: colors.sapphire.dark },

    highlightColor: colors.sapphire.main,
    overline: colors.sapphire.main
  },
  blueAccent: {
    primary: colors.white,
    secondary: colors.blue,
    highlightColor: colors.blue.main,
    overline: colors.blue.main
  },
  greenAccent: {
    primary: colors.white,
    secondary: colors.green,
    highlightColor: colors.green.main,
    overline: colors.green.main
  },
  sunflowerAccent: {
    primary: colors.white,
    secondary: { ...colors.sapphire, main: colors.sapphire.dark },

    highlightColor: colors.sunflower.dark,
    overline: colors.sunflower.dark
  },
  orangeAccent: {
    primary: colors.white,
    secondary: colors.orange,
    highlightColor: colors.orange.main,
    overline: colors.orange.main
  },
  mintAccent: {
    primary: colors.white,
    secondary: colors.mint,
    highlightColor: colors.mint.main,
    overline: colors.mint.main
  },
  fuchsiaAccent: {
    primary: colors.white,
    secondary: colors.fuchsia,
    highlightColor: colors.fuchsia.main,
    overline: colors.fuchsia.main
  },
  sapphirePinkGradient: {
    primary: colors.sapphirePinkGradient,
    secondary: colors.white,
    highlightColor: colors.blue.main,
    overline: colors.blue.main
  },
  blue: {
    primary: colors.blue,
    secondary: colors.sunflower,
    highlightColor: colors.sunflower.main,
    overline: colors.sunflower.main
  },
  blueDark: {
    primary: { ...colors.blue, main: colors.blue.dark },
    secondary: colors.white,
    highlightColor: colors.white.main,
    overline: colors.white.main
  },
  blueLight: {
    primary: colors.blueLight,
    secondary: {
      light: colors.blueLight.light,
      main: colors.blue.main,
      dark: colors.blue.dark,
      contrastText: colors.blue.contrastText
    },
    highlightColor: colors.blue.main,
    overline: colors.blue.main
  },
  green: {
    primary: colors.green,
    secondary: colors.sunflower,
    highlightColor: colors.sunflower.main,
    overline: colors.sunflower.light
  },
  greenLight: {
    primary: colors.greenLight,
    secondary: colors.green,
    highlightColor: colors.green.main,
    overline: colors.green.main
  },
  sunflower: {
    primary: colors.sunflower,
    secondary: colors.green,
    highlightColor: colors.green.main,
    overline: colors.green.main
  },
  sunflowerLight: {
    primary: colors.sunflowerLight,
    secondary: colors.sunflower,
    highlightColor: colors.green.main,
    overline: colors.green.main,
    text: {
      primary: '#1F1F1F',
      secondary: '#1F1F1F'
    }
  },
  orange: {
    primary: colors.orange,
    secondary: colors.sunflower,
    highlightColor: colors.green.dark,
    overline: colors.green.dark
  },
  orangeLight: {
    primary: { main: colors.orange.light },
    secondary: colors.orange,
    highlightColor: colors.orange.main,
    overline: colors.orange.main
  },
  fuchsia: {
    primary: colors.fuchsia,
    secondary: colors.sunflower,
    highlightColor: colors.sunflower.main,
    overline: colors.sunflower.main
  },
  fuchsiaLight: {
    primary: { main: colors.fuchsia.light },
    secondary: colors.fuchsia,
    highlightColor: colors.fuchsia.main,
    overline: colors.fuchsia.main
  },
  mint: {
    primary: colors.mint,
    secondary: colors.sunflower,
    highlightColor: colors.sunflower.main,
    overline: colors.sunflower.main
  },
  mintLight: {
    primary: { main: colors.mint.light },
    secondary: colors.mint,
    highlightColor: colors.mint.main,
    overline: colors.mint.main
  },
  black: {
    primary: colors.black,
    secondary: colors.sapphire,
    highlightColor: colors.sapphire.main,
    overline: colors.sapphire.main
  },
  white: {
    primary: colors.white,
    secondary: colors.sapphire,
    highlightColor: colors.sapphire.main,
    overline: colors.sapphire.main
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
        ...schemes['blueAccent'],
        white: colors.white,
        black: colors.black,
        text: {
          one: '#1F1F1F',
          two: '#A3A3A3',
          three: '#C7C9D9'
        },
        background: {
          // TODO: Avoid unnamed colors here
          tab: '#E3E3E3',
          lightOne: '#E3E3E3',
          lightTwo: '#F2F2F2',
          lightThree: '#F9F8F8'
        }
      }
    },
    dark: {
      palette: {
        schemes: schemes,
        ...schemes['sapphire']
      }
    }
  }
};

const baseTheme = {
  ...paletteTheme,

  spacing: defaultSpacing,
  shape: {
    borderRadius: defaultBorderRadius
  },
  mixins: {
    gridContainer: createGridMixin,
    applyColorScheme,
    applyGrid
  },
  typography: {
    fontFamily: dmSans.style.fontFamily,

    body1: {
      'fontWeight': 'var(--body1-font-weight)',
      'fontSize': 'var(--body1-font-size)',
      'lineHeight': 'var(--body1-line-height)',
      '&:not(:last-child)': {
        margin: 'var(--body1-margin)'
      },
      'color': 'var(--mui-palette-text-primary)'
    },
    body2: {
      'fontWeight': 'var(--body2-font-weight)',
      'fontSize': 'var(--body2-font-size)',
      'lineHeight': 'var(--body2-line-height)',
      '&:not(:last-child)': {
        margin: 'var(--body2-margin)'
      },
      'color': 'var(--mui-palette-text-primary)'
    },
    bodySmall: {
      fontWeight: 'var(--bodySmall-font-weight)',
      fontSize: 'var(--bodySmall-font-size)',
      lineHeight: 'var(--bodySmall-line-height)',
      margin: 'var(--bodySmall-margin)',
      color: 'var(--mui-palette-text-primary)'
    },
    bodyLarge: {
      fontWeight: 'var(--bodyLarge-font-weight)',
      fontSize: 'var(--bodyLarge-font-size)',
      lineHeight: 'var(--bodyLarge-line-height)',
      color: 'var(--mui-palette-text-primary)'
    },
    h1: {
      fontWeight: 'var(--h1-font-weight)',
      fontSize: 'var(--h1-font-size)',
      lineHeight: 'var(--h1-line-height)',
      margin: 'var(--h1-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary)'
    },
    h2: {
      fontWeight: 'var(--h2-font-weight)',
      fontSize: 'var(--h2-font-size)',
      lineHeight: 'var(--h2-line-height)',
      margin: 'var(--h2-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary)'
    },
    h3: {
      fontWeight: 'var(--h3-font-weight)',
      fontSize: 'var(--h3-font-size)',
      lineHeight: 'var(--h3-line-height)',
      margin: 'var(--h3-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary)'
    },
    h4: {
      fontWeight: 'var(--h4-font-weight)',
      fontSize: 'var(--h4-font-size)',
      lineHeight: 'var(--h4-line-height)',
      margin: 'var(--h4-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary)'
    },
    h5: {
      fontWeight: 'var(--h5-font-weight)',
      fontSize: 'var(--h5-font-size)',
      lineHeight: 'var(--h5-line-height)',
      margin: 'var(--h5-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary)'
    },
    h6: {
      fontWeight: 'var(--h6-font-weight)',
      fontSize: 'var(--h6-font-size)',
      lineHeight: 'var(--h6-line-height)',
      margin: 'var(--h6-margin)',
      color: 'var(--mui-palette-text-primary)'
    },
    display1: {
      display: 'block',
      fontWeight: 'var(--display1-font-weight)',
      fontSize: 'var(--display1-font-size)',
      lineHeight: 'var(--display1-line-height)',
      margin: 'var(--display1-margin)',
      color: 'var(--mui-palette-text-primary)'
    },
    display2: {
      display: 'block',
      fontWeight: 'var(--display2-font-weight)',
      fontSize: 'var(--display2-font-size)',
      lineHeight: 'var(--display2-line-height)',

      margin: 'var(--display2-margin)',
      color: 'var(--mui-palette-text-primary)'
    },

    overline: {
      display: 'block',
      fontWeight: 'var(--overline-font-weight)',
      fontSize: 'var(--overline-font-size)',
      lineHeight: 'var(--overline-line-height)',
      textTransform: 'uppercase',
      margin: 'var(--overline-margin)',
      color: 'var(--mui-palette-text-primary)'
    },
    button: {},
    caption: {}
  },
  containerBreakpoints: {
    ...muiTheme.breakpoints,
    up(key: number | Breakpoint) {
      return muiTheme.breakpoints.up(key)?.replace('@media', '@container');
    },
    down(key: number | Breakpoint) {
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

console.log('Theme');
console.log(theme);
export const breakpoints = theme.breakpoints.values;

// export const theme = merge(coreTheme, ...Object.values(themeComponents).map((t) => t(coreTheme)), {
//   containerBreakpoints: {
//     up(key: any) {
//       return muiTheme.breakpoints.up(key)?.replace('@media', '@container');
//     },
//     down(key: any) {
//       return paletteTheme.breakpoints.down(key)?.replace('@media', '@container');
//     }
//   }
// });
