import createAppTheme from './createTheme';
import { CardProps, CardOverrides } from './../components/Card';
import { HeroProps } from './../components/Hero';
import { SectionProps } from './../components/Section';
import mockTheme from './mock.theme';

declare module '@material-ui/core/styles' {
  // eslint-disable-next-line
  interface Palette {
    'tertiary': Palette['primary'];
    'quartiary': Palette['secondary'];
    'gradient-primary': Palette['secondary'];
  }
  interface PaletteOptions {
    'tertiary': PaletteOptions['primary'];
    'quartiary': PaletteOptions['secondary'];
    'gradient-primary': PaletteOptions['secondary'];
  }
  // interface Theme {
  //   appDrawer?: {
  //     width: React.CSSProperties['width'];
  //   };
  // }
  // // eslint-disable-next-line
  // interface ThemeOptions {
  //   appDrawer?: {
  //     width: React.CSSProperties['width'];
  //   };
  // }
}

declare module '@material-ui/core/styles/components' {
  interface ComponentsProps {
    Section: SectionProps;
    Text: SectionProps;
    Card: CardProps;
    Hero: HeroProps;
    Text: {};
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
    Text?: {
      root?: {};
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
    Text?: {
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
    Text?: {};
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
    Text?: {
      defaultProps?: ComponentsProps['Text'];
      overrides?: ComponentElementOverrides['Text'];
      styleOverrides?: ComponentsOverrides['Text'];
      variants?: ComponentsVariants['Text'];
    };
  }
}

export default mockTheme;
