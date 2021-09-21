import { createTheme, ThemeOptions } from '@mui/material/styles';
// import createAppTheme from './createTheme';
import { CardProps, CardOverrides } from './../components/Card';
import { CollectionProps } from './../components/Collection';
import { HeroProps } from './../components/Hero';
import { MailchimpFormProps } from './../components/MailchimpForm';
import { LinkProps } from './../components/Link';
import { SectionProps } from './../components/Section';
import { PaletteOptions, Palette } from '@mui/material/styles';

interface CustomPalette {
  'tertiary': Palette['primary'];
  'quartiary': Palette['primary'];
  'gradient-primary'?: Palette['primary'];
}
interface CustomPaletteOptions {
  'tertiary': PaletteOptions['primary'];
  'quartiary': PaletteOptions['primary'];
  'gradient-primary'?: PaletteOptions['primary'];
}
declare module '@mui/material/styles' {
  // eslint-disable-next-line

  interface Palette extends CustomPalette {
    'tertiary': Palette['primary'];
    'quartiary': Palette['primary'];
    'gradient-primary'?: Palette['primary'];
  }

  interface PaletteOptions extends CustomPaletteOptions {
    'tertiary': PaletteOptions['primary'];
    'quartiary': PaletteOptions['primary'];
    'gradient-primary'?: PaletteOptions['primary'];
  }
  // eslint-disable-next-line
  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}

declare module '@mui/material/styles/components' {
  interface ComponentsProps {
    Section: SectionProps;
    Card: CardProps;
    Collection: CollectionProps;
    Hero: HeroProps;
    MailchimpForm: MailchimpFormProps;
    Link: LinkProps;
    Text: {};
    Header: {};
  }
  interface ComponentElementOverrides {
    Section: {
      'root'?: {};
      'sectionWrap'?: {};
      'imageWrap'?: {};
      'gridItem'?: {};
      'gridContainer'?: {};
      'contentContainer'?: {};
      'backgroundImage'?: {};
      'background_gradient-primary'?: {};
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
    Section?: ComponentElementOverrides['Section'];
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
    MailchimpForm?: {
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
    MailchimpForm?: {};
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
    Accordion?: {
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
    MailchimpForm?: {
      defaultProps?: ComponentsProps['MailchimpForm'];
      // overrides?: ComponentElementOverrides['MailchimpForm'];
      styleOverrides?: ComponentsOverrides['MailchimpForm'];
      variants?: ComponentsVariants['MailchimpForm'];
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
    CollectionCarousel?: {
      defaultProps?: ComponentsProps['Collection'];
      overrides?: ComponentElementOverrides['Collection'];
      styleOverrides?: ComponentsOverrides['Collection'];
      variants?: ComponentsVariants['Collection'];
    };
    CollectionAccordion?: {
      defaultProps?: ComponentsProps['Collection'];
      overrides?: ComponentElementOverrides['Collection'];
      styleOverrides?: ComponentsOverrides['Collection'];
      variants?: ComponentsVariants['Collection'];
    };
  }
}

export default function createAppTheme(options: ThemeOptions, ...args: object[]) {
  return createTheme(
    {
      ...options
    },
    ...args
  );
}
