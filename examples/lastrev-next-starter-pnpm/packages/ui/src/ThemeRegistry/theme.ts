import { DM_Sans } from 'next/font/google';
import {
  type Breakpoint,
  type ThemeOptions,
  experimental_extendTheme as extendTheme,
  CssVarsThemeOptions
} from '@mui/material/styles';
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
  sapphirePinkGradient: { main: 'linear-gradient(281deg, #E82163 0%, #3049C9 100%)', contrastText: '#FFF' },
  sapphire: { light: '#5368D2', main: '#3049C9', dark: '#22338D', contrastText: '#FFF' },
  sapphireLight: { light: '#EAEDFA', main: '#5368D2', dark: '#3049C9', contrastText: '#FFF' },
  blue: { lighter: '#ECF2FE', light: '#C4D6FB', main: '#407BF2', dark: '#264A91', contrastText: '#FFF' },
  blueLight: { light: '#ECF2FE', main: '#C4D6FB', dark: '#407BF2', contrastText: '#000' },
  green: { lighter: '#EAF2EE', light: '#88B19C', main: '#317955', dark: '#1E4A34', contrastText: '#FFF' },
  sunflower: { light: '#FEE8AD', main: '#FED872', dark: '#9B8446', contrastText: '#000' },
  sunflowerLight: { light: '#FFFBF1', main: '#FEE8AD', dark: '#FED872', contrastText: '#000' },
  fuchsia: { lighter: '#F6ECFF', light: '#C890FF', main: '#A040FF', dark: '#702DB3', contrastText: '#000' },
  mint: { lighter: '#F9FDFC', light: '#DDF2EB', main: '#C4E9DD', dark: '#788E87', contrastText: '#000' },
  orange: { lighter: '#FFF5E9', light: '#FFC37F', main: '#FF9823', dark: '#B36A19', contrastText: '#000' }
};

const schemes = {
  sapphire: {
    primary: colors.sapphire,
    secondary: colors.sunflower,
    highlightColor: colors.sunflower.main
  },
  sapphireLight: {
    primary: { main: colors.sapphireLight.light, contrastText: '#000' },
    secondary: colors.sapphire,
    highlightColor: colors.sapphire.main
  },
  blue: {
    primary: colors.blue,
    secondary: colors.sunflower,
    highlightColor: colors.sunflower.main
  },
  blueLight: {
    primary: { main: colors.blueLight.main },
    secondary: {
      light: colors.blueLight.light,
      main: colors.blue.main,
      dark: colors.blue.dark,
      contrastText: colors.blue.contrastText
    },
    highlightColor: colors.blue.main
  },
  green: {
    primary: colors.green,
    secondary: colors.sunflower,
    highlightColor: colors.sunflower.main
  },
  greenLight: {
    primary: { main: colors.green.light },
    secondary: colors.green,
    highlightColor: colors.green.main
  },
  sunflower: {
    primary: colors.sunflower,
    secondary: colors.green,
    highlightColor: colors.green.main
  },
  sunflowerLight: {
    primary: { main: colors.sunflower.light, contrastText: colors.sunflower.contrastText },
    secondary: colors.sunflower,
    highlightColor: colors.green.main,
    text: {
      primary: '#000',
      secondary: '#000'
    }
  },
  orange: {
    primary: colors.orange,
    secondary: colors.sunflower,
    highlightColor: colors.green.main
  },
  orangeLight: {
    primary: { main: colors.orange.light },
    secondary: colors.orange,
    highlightColor: colors.orange.main
  },
  fuchsia: {
    primary: colors.fuchsia,
    secondary: colors.sunflower,
    highlightColor: colors.sunflower.main
  },
  fuchsiaLight: {
    primary: { main: colors.fuchsia.light },
    secondary: colors.fuchsia,
    highlightColor: colors.fuchsia.main
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
        ...schemes['sapphire']
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

const muiTheme = extendTheme(paletteTheme);
const baseTheme = {
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
    fontFamily: dmSans.style.fontFamily,
    body1: {
      fontWeight: 'var(--body1-font-weight)',
      fontSize: 'var(--body1-font-size)',
      lineHeight: 'var(--body1-line-height)',
      margin: 'var(--body1-margin)',
      color: 'inherit'
    },
    body2: {
      fontWeight: 'var(--body2-font-weight)',
      fontSize: 'var(--body2-font-size)',
      lineHeight: 'var(--body2-line-height)',
      margin: 'var(--body2-margin)',
      color: 'inherit'
    },
    bodySmall: {
      fontWeight: 'var(--bodySmall-font-weight)',
      fontSize: 'var(--bodySmall-font-size)',
      lineHeight: 'var(--bodySmall-line-height)',
      margin: 'var(--bodySmall-margin)',
      color: 'inherit'
    },
    bodyLarge: {
      fontWeight: 'var(--bodyLarge-font-weight)',
      fontSize: 'var(--bodyLarge-font-size)',
      lineHeight: 'var(--bodyLarge-line-height)',
      margin: 'var(--bodyLarge-margin)',
      color: 'inherit'
    },

    h1: {
      fontWeight: 'var(--h1-font-weight)',
      fontSize: 'var(--h1-font-size)',
      lineHeight: 'var(--h1-line-height)',
      margin: 'var(--h1-margin)',
      fontStyle: 'normal'
    },
    h2: {
      fontWeight: 'var(--h2-font-weight)',
      fontSize: 'var(--h2-font-size)',
      lineHeight: 'var(--h2-line-height)',
      margin: 'var(--h2-margin)',
      fontStyle: 'normal'
    },
    h3: {
      fontWeight: 'var(--h3-font-weight)',
      fontSize: 'var(--h3-font-size)',
      lineHeight: 'var(--h3-line-height)',
      margin: 'var(--h3-margin)',
      fontStyle: 'normal'
    },
    h4: {
      fontWeight: 'var(--h4-font-weight)',
      fontSize: 'var(--h4-font-size)',
      lineHeight: 'var(--h4-line-height)',
      margin: 'var(--h4-margin)',
      fontStyle: 'normal'
    },
    h5: {
      fontWeight: 'var(--h5-font-weight)',
      fontSize: 'var(--h5-font-size)',
      lineHeight: 'var(--h5-line-height)',
      margin: 'var(--h5-margin)',
      fontStyle: 'normal'
    },
    h6: {
      fontWeight: 'var(--h6-font-weight)',
      fontSize: 'var(--h6-font-size)',
      lineHeight: 'var(--h6-line-height)',
      margin: 'var(--h6-margin)',
      color: '#000000'
    },
    display1: {
      display: 'block',
      fontWeight: 'var(--display1-font-weight)',
      fontSize: 'var(--display1-font-size)',
      lineHeight: 'var(--display1-line-height)',
      margin: 'var(--display1-margin)',
      color: muiTheme?.vars?.palette?.tertiary?.main
    },
    display2: {
      display: 'block',
      fontWeight: 'var(--display2-font-weight)',
      fontSize: 'var(--display2-font-size)',
      lineHeight: 'var(--display2-line-height)',
      margin: 'var(--display2-margin)',
      color: muiTheme?.vars?.palette?.tertiary?.main
    },
    display3: {
      display: 'block',
      fontWeight: 'var(--display3-font-weight)',
      fontSize: 'var(--display3-font-size)',
      lineHeight: 'var(--display3-line-height)',
      margin: 'var(--display3-margin)',
      color: muiTheme?.vars?.palette?.tertiary?.main
    },
    display4: {
      display: 'block',
      fontWeight: 'var(--display4-font-weight)',
      fontSize: 'var(--display4-font-size)',
      lineHeight: 'var(--display4-line-height)',
      margin: 'var(--display4-margin)',
      color: muiTheme?.vars?.palette?.tertiary?.main
    },
    display5: {
      display: 'block',
      fontWeight: 'var(--display5-font-weight)',
      fontSize: 'var(--display5-font-size)',
      lineHeight: 'var(--display5-line-height)',
      margin: 'var(--display5-margin)',
      color: muiTheme?.vars?.palette?.tertiary?.main
    },
    display6: {
      display: 'block',
      fontWeight: 'var(--display6-font-weight)',
      fontSize: 'var(--display6-font-size)',
      lineHeight: 'var(--display6-line-height)',
      margin: 'var(--display6-margin)',
      color: muiTheme?.vars?.palette?.tertiary?.main
    },
    overline: {
      display: 'block',
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
