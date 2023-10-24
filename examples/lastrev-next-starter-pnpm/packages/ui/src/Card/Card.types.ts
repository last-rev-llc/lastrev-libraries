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
  blog = 'blog',
  timeline = 'timeline'
}

export interface CardProps extends Omit<Card_BaseFragmentFragment, 'variant'> {
  loading?: boolean;
  variant?: CardVariants;
  ownerState?: any;
}

export interface CardOwnerState extends CardProps {
  backgroundColor: string;
}

interface CardClasses {
  root: string;
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
