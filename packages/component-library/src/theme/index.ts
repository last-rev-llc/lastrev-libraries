// import createAppTheme from './createTheme';
import { CardProps, CardOverrides } from './../components/Card';
import { CollectionProps } from './../components/Collection';
import { HeroProps } from './../components/Hero';
import { LinkProps } from './../components/Link';
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
    Card: CardProps;
    Collection: CollectionProps;
    Hero: HeroProps;
    Link: LinkProps;
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
    Collection?: {
      root?: {};
    };
    Hero?: {
      root?: {};
    };
    Link?: {
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
    Collection?: {};
    Hero?: {};
    Link?: {};
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
    Collection?: {
      defaultProps?: ComponentsProps['Collection'];
      // overrides?: ComponentElementOverrides['Collection'];
      styleOverrides?: ComponentsOverrides['Collection'];
      variants?: ComponentsVariants['Collection'];
    };
    Hero?: {
      defaultProps?: ComponentsProps['Hero'];
      // overrides?: ComponentElementOverrides['Hero'];
      styleOverrides?: ComponentsOverrides['Hero'];
      variants?: ComponentsVariants['Hero'];
    };
    Link?: {
      defaultProps?: ComponentsProps['Link'];
      // overrides?: ComponentElementOverrides['Hero'];
      styleOverrides?: ComponentsOverrides['Link'];
      variants?: ComponentsVariants['Link'];
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
