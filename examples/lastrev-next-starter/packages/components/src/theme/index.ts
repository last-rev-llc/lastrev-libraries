// import createAppTheme from './createTheme';
import { CardProps, CardOverrides } from './../components/Card';
import { CollectionProps } from './../components/Collection';
import { HeroProps } from './../components/Hero';
import { LinkProps } from './../components/Link';
import { SectionProps } from './../components/Section';
// import mockTheme from './mock.theme';
import mockTheme from '@last-rev/component-library/dist/theme/mock.theme';

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
    Header: {};
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
    Collection?: {
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
    Header?: {
      root?: {};
      contentContainer?: {};
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
    Hero?: {};
    Link?: {};
    Header?: {};
    Text?: {};
    Collection?: {};
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
    Link?: {
      defaultProps?: ComponentsProps['Link'];
      // overrides?: ComponentElementOverrides['Hero'];
      styleOverrides?: ComponentsOverrides['Link'];
      variants?: ComponentsVariants['Link'];
    };
    Header?: {
      defaultProps?: ComponentsProps['Header'];
      // overrides?: ComponentElementOverrides['Header'];
      styleOverrides?: ComponentsOverrides['Header'];
      variants?: ComponentsVariants['Header'];
    };
    Text?: {
      defaultProps?: ComponentsProps['Text'];
      overrides?: ComponentElementOverrides['Text'];
      styleOverrides?: ComponentsOverrides['Text'];
      variants?: ComponentsVariants['Text'];
    };
    Collection?: {
      defaultProps?: ComponentsProps['Collection'];
      overrides?: ComponentElementOverrides['Collection'];
      styleOverrides?: ComponentsOverrides['Collection'];
      variants?: ComponentsVariants['Collection'];
    };
  }
}

export default mockTheme;
