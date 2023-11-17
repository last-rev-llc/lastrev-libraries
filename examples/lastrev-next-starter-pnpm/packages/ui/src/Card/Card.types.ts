import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Card_BaseFragmentFragment } from '@graphql-sdk/types';

export enum CardVariants {
  default = 'default',
  hover = 'hover',
  icon = 'icon',
  logo = 'logo',
  media = 'media',
  pricing = 'pricing',
  person = 'person',
  quote = 'quote',
  news = 'news',
  timeline = 'timeline'
}

export enum CardAspectRatios {
  default = 'default',
  square = 'square',
  horizontal = 'horizontal',
  vertical = 'vertical'
}

export interface CardProps extends Omit<Card_BaseFragmentFragment, 'variant' | 'aspectRatio'> {
  loading?: boolean;
  variant?: CardVariants;
  ownerState?: any;
  aspectRatio?: CardAspectRatios;
}

export interface CardOwnerState extends CardProps {
  backgroundColor: string;
}

interface CardClasses {
  root: string;
  cardWrap: string;
  link: string;
  media: string;
  mediaFlip: string;
  mediaContainer: string;
  actionsWrap: string;
  action: string;
  contentWrap: string;
  overline: string;
  title: string;
  subtitle: string;
  body: string;
  bodyWrap: string;
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
      variants?: ComponentsVariants['Card'];
    };
  }
}
