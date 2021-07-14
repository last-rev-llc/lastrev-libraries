import createAppTheme from './createTheme';
import { CardProps, CardOverrides } from './../components/Card';
import mockTheme from './mock.theme';

declare module '@material-ui/core/styles' {
  // eslint-disable-next-line
  interface Palette {
    thertiary: Palette['primary'];
    quartiary: Palette['secondary'];
  }
  interface PaletteOptions {
    thertiary: PaletteOptions['primary'];
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
  }
  interface ComponentElementOverrides {
    Section: {
      root: {};
      gridItem: {};
      gridContainer: {};
      backgroundImage: {};
    };
    Card: CardOverrides;
  }
  interface ComponentsOverrides {
    Section: {
      root: {};
      gridItem: {};
      gridContainer: {};
      backgroundImage: {};
    };
    Card: CardOverrides;
  }
  interface ComponentsVariants {
    Section: {};
    Card: {};
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
  }
}

export default mockTheme;
