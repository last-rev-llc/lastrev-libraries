import { CardProps, CardOverrides } from './../components/Card';
import { CollectionProps } from './../components/Collection';
import { HeroProps } from './../components/Hero';
import { MailchimpFormProps } from './../components/MailchimpForm';
import { LinkProps } from './../components/Link';
import { SectionProps } from './../components/Section';
import { FormMarketoEmbedProps } from './../components/FormMarketoEmbed';

declare module '@mui/material/styles' {
  interface Theme {
    scheme?: string;
    createSchemeTheme: (scheme: string) => Theme;
  }

  interface Palette {
    'tertiary'?: Palette['primary'];
    'quartiary'?: Palette['primary'];
    'gradient-primary'?: Palette['primary'];
  }

  interface PaletteOptions {
    'tertiary'?: PaletteOptions['primary'];
    'quartiary'?: PaletteOptions['primary'];
    'gradient-primary'?: PaletteOptions['primary'];
  }
  // interface ThemeOptions {
  //   palette?: PaletteOptions;
  // }
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
    FormMarketoEmbed: FormMarketoEmbedProps;
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
    FormMarketoEmbed?: {
      root?: {};
      form?: {};
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
    FormMarketoEmbed?: {
      root?: {};
      form?: {};
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
    FormMarketoEmbed?: {};
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
    FormMarketoEmbed?: {
      defaultProps?: ComponentsProps['FormMarketoEmbed'];
      overrides?: ComponentElementOverrides['FormMarketoEmbed'];
      styleOverrides?: ComponentsOverrides['FormMarketoEmbed'];
      variants?: ComponentsVariants['FormMarketoEmbed'];
    };
  }
}