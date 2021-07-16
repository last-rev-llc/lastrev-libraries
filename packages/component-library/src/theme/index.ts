import createAppTheme from './createTheme';
import { CardProps, CardOverrides } from './../components/Card';
import mockTheme from './mock.theme';

declare module '@material-ui/core/styles' {
  // eslint-disable-next-line
  interface Palette {
    tertiary: Palette['primary'];
    quartiary: Palette['secondary'];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
    quartiary: PaletteOptions['secondary'];
  }
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width'];
    };
  }
  // eslint-disable-next-line
  interface ThemeOptions {
    appDrawer?: {
      width: React.CSSProperties['width'];
    };
  }
}
declare module '@material-ui/core/styles/components' {
  interface ComponentsProps {
    Section: {};
    Card: CardProps;
    RichText: {};
  }
  interface ComponentElementOverrides {
    Section: {
      root: {};
      gridItem: {};
      gridContainer: {};
      backgroundImage: {};
    };
    Card: CardOverrides;
    RichText: {
      root: {};
      gridItem: {};
      gridContainer: {};
      backgroundImage: {};
    };
  }
  interface ComponentsOverrides {
    Section: {
      root: {};
      gridItem: {};
      gridContainer: {};
      backgroundImage: {};
    };
    Card: CardOverrides;
    RichText: {
      root: {};
      gridItem: {};
      gridContainer: {};
      backgroundImage: {};
    };
  }
  interface ComponentsVariants {
    Section: {};
    Card: {};
    RichText: {};
  }
  interface Components {
    Section?: {
      defaultProps?: ComponentsProps['Section'];
      overrides?: ComponentElementOverrides['Section'];
      styleOverrides?: ComponentsOverrides['Section'];
      variants?: ComponentsVariants['Section'];
    };
    Card?: {
      defaultProps?: ComponentsProps['Card'];
      overrides?: ComponentElementOverrides['Card'];
      styleOverrides?: ComponentsOverrides['Card'];
      variants?: ComponentsVariants['Card'];
    };
    RichText: {
      defaultProps?: ComponentsProps['RichText'];
      overrides?: ComponentElementOverrides['RichText'];
      styleOverrides?: ComponentsOverrides['RichText'];
      variants?: ComponentsVariants['RichText'];
    };
  }
}

export default mockTheme;
