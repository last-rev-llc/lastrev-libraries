import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { CardPricing_BaseFragmentFragment } from '@graphql-sdk/types';

export enum CardPricingVariants {
  default = 'default',
  icon = 'icon',
  stat = 'stat',
  logo = 'logo',
  media = 'media',
  pricing = 'pricing',
  person = 'person',
  quote = 'quote',
  blog = 'blog'
}

export interface CardPricingProps extends Omit<CardPricing_BaseFragmentFragment, 'variant'> {
  loading?: boolean;
  variant?: CardPricingVariants;
  ownerState?: any;
}

export interface CardPricingOwnerState extends CardPricingProps {
  backgroundColor: string;
}

interface CardPricingClasses {
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

export declare type CardPricingClassKey = keyof CardPricingClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    CardPricing: CardPricingClassKey;
  }

  export interface ComponentsPropsList {
    CardPricing: CardPricingProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    CardPricing?: {
      defaultProps?: ComponentsProps['CardPricing'];
      styleOverrides?: ComponentsOverrides<Theme>['CardPricing'];
      variants?: ComponentsVariants['CardPricing'];
    };
  }
}
