import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Card_BaseFragmentFragment } from '@graphql-sdk/types';

export type CardVariants = 'default' | 'icon' | 'logo' | 'media' | 'pricing' | 'person' | 'quote' | 'blog' | undefined;

export interface CardProps extends Card_BaseFragmentFragment {
  loading?: boolean;
  variant?: CardVariants;
  colorScheme?: string;
  position?: number;
  isFirst?: Boolean;
  isMultipleOfTwo?: Boolean;
  isMultipleOfThree?: Boolean;
}

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