import createAppTheme from './createTheme';
import { CardProps, CardOverrides } from './../components/Card';
import { HeroProps } from './../components/Hero';
import { SectionProps } from './../components/Section';
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
    Section: SectionProps;
    Card: CardProps;
    Hero: HeroProps;
    RichText: {};
  }
  interface ComponentElementOverrides {
    Section: {
      root?: {};
      sectionWrap?: {};
      imageWrap?: {};
      gridItem?: {};
      gridContainer?: {};
      backgroundImage?: {};
    };
    Card: CardOverrides;
    RichText?: {
      root?: {};
      sectionWrap?: {};
      imageWrap?: {};
      gridItem?: {};
      gridContainer?: {};
      backgroundImage?: {};
    };
  }
  interface ComponentsOverrides {
    Section?: {
      root?: {};
      sectionWrap?: {};
      imageWrap?: {};
      gridItem?: {};
      gridContainer?: {};
      backgroundImage?: {};
    };
    Card: CardOverrides;
    Hero?: {
      root?: {};
    };
    RichText?: {
      root?: {};
      sectionWrap?: {};
      imageWrap?: {};
      gridItem?: {};
      gridContainer?: {};
      backgroundImage?: {};
    };
  }
  interface ComponentsVariants {
    Section?: {};
    Card?: {};
    Hero?: {};
    RichText?: {};
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
    Hero?: {
      defaultProps?: ComponentsProps['Hero'];
      // overrides?: ComponentElementOverrides['Hero'];
      styleOverrides?: ComponentsOverrides['Hero'];
      variants?: ComponentsVariants['Hero'];
    };
    RichText?: {
      defaultProps?: ComponentsProps['RichText'];
      overrides?: ComponentElementOverrides['RichText'];
      styleOverrides?: ComponentsOverrides['RichText'];
      variants?: ComponentsVariants['RichText'];
    };
  }
}

export default mockTheme;
