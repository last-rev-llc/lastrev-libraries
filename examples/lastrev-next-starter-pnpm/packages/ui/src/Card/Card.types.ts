import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Card_BaseFragmentFragment } from '@graphql-sdk/types';

export enum CardVariants {
  default = 'default',
  icon = 'icon',
  logo = 'logo',
  media = 'media',
  pricing = 'pricing',
  person = 'person',
  quote = 'quote',
  blog = 'blog'
}

export interface CardProps extends Omit<Card_BaseFragmentFragment, 'variant'> {
  loading?: boolean;
  variant?: CardVariants;
  colorScheme?: string;
  position?: number;
  isFirst?: Boolean;
  isMultipleOfTwo?: Boolean;
  isMultipleOfThree?: Boolean;
}

export interface CardOwnerState extends CardProps {}

export interface CardClasses {
  root: string;
  link: string;
  media: string;
  mediaFlip: string;
  mediaContainer: string;
  actions: string;
  action: string;
  content: string;
  overline: string;
  title: string;
  subtitle: string;
  body: string;
}

export declare type CardClassKey = keyof CardClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Card: CardClassKey;
  }
  export interface ComponentsPropsList {
    Card: CardProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Card?: {
      defaultProps?: ComponentsProps['Card'];
      styleOverrides?: ComponentsOverrides<Theme>['Card'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Card'];
    };
  }
}
