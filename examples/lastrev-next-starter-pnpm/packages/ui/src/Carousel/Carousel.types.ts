import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Collection_BaseFragmentFragment } from '@graphql-sdk/types';

import { CardVariants } from '../Card/Card.types';
import { SwiperProps } from 'swiper/react';

export enum CarouselVariants {
  default = 'defaultCarousel',
  onePerRow = 'onePerRowCarousel',
  twoPerRow = 'twoPerRowCarousel',
  threePerRow = 'threePerRowCarousel',
  fourPerRow = 'fourPerRowCarousel',
  fivePerRow = 'fivePerRowCarousel'
}

export interface CarouselProps extends Omit<Collection_BaseFragmentFragment, 'variant' | 'itemsVariant'> {
  variant?: CarouselVariants;
  itemsVariant?: CardVariants;
  SwiperProps?: SwiperProps;
}

export interface CarouselOwnerState extends CarouselProps {}

interface CarouselClasses {
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

export declare type CarouselClassKey = keyof CarouselClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Carousel: CarouselClassKey;
  }

  export interface ComponentsPropsList {
    Carousel: CarouselProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Carousel?: {
      defaultProps?: ComponentsProps['Carousel'];
      styleOverrides?: ComponentsOverrides<Theme>['Carousel'];
      variants?: ComponentsVariants['Carousel'];
    };
  }
}
