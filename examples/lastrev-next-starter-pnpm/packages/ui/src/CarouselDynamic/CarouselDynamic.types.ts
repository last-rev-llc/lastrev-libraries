import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Collection_BaseFragmentFragment } from '@graphql-sdk/types';

import { CardVariants } from '../Card/Card.types';

export enum CarouselDynamicVariants {
  default = 'defaultCarouselDynamic',
  onePerRow = 'onePerRowCarouselDynamic',
  twoPerRow = 'twoPerRowCarouselDynamic',
  threePerRow = 'threePerRowCarouselDynamic',
  fourPerRow = 'fourPerRowCarouselDynamic',
  fivePerRow = 'fivePerRowCarouselDynamic'
}

export interface CarouselDynamicProps extends Omit<Collection_BaseFragmentFragment, 'variant' | 'itemsVariant'> {
  variant?: CarouselDynamicVariants;
  itemsVariant?: CardVariants;
  prevBgColor?: string;
}

export interface CarouselDynamicOwnerState extends CarouselDynamicProps {}

interface CarouselDynamicClasses {
  root: string;
  contentGrid: string;
  introTextWrap: string;
  introText: string;
  swiperWrap: string;
  swiperInnerWrap: string;
  item: string;
  actionsContainer: string;
  action: string;
}

export declare type CarouselDynamicClassKey = keyof CarouselDynamicClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    CarouselDynamic: CarouselDynamicClassKey;
  }

  export interface ComponentsPropsList {
    CarouselDynamic: CarouselDynamicProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    CarouselDynamic?: {
      defaultProps?: ComponentsProps['CarouselDynamic'];
      styleOverrides?: ComponentsOverrides<Theme>['CarouselDynamic'];
      variants?: ComponentsVariants['CarouselDynamic'];
    };
  }
}
