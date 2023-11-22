import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { CollectionDynamic_BaseFragmentFragment } from '@graphql-sdk/types';

import { CardVariants } from '../Card/Card.types';

export enum CollectionDynamicVariants {
  default = 'default',
  onePerRow = 'onePerRow',
  twoPerRow = 'twoPerRow',
  threePerRow = 'threePerRow',
  fourPerRow = 'fourPerRow',
  fivePerRow = 'fivePerRow'
}

export interface CollectionDynamicProps
  extends Omit<CollectionDynamic_BaseFragmentFragment, 'variant' | 'itemsVariant'> {
  variant?: CollectionDynamicVariants;
  itemsVariant?: CardVariants;
  prevBgColor?: string;
  indexName?: string;
  useInfinite?: boolean;
}

export interface CollectionDynamicOwnerState extends CollectionDynamicProps {}

interface CollectionDynamicClasses {
  root: string;
  contentGrid: string;
  introTextWrap: string;
  introText: string;
  itemsGrid: string;
  item: string;
  actionsContainer: string;
  action: string;
  paginationWrap: string;
  filtersWrap: string;
  resultsWrap: string;
  searchBoxWrap: string;
  currentRefinementsWrap: string;
}

export declare type CollectionDynamicClassKey = keyof CollectionDynamicClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    CollectionDynamic: CollectionDynamicClassKey;
  }

  export interface ComponentsPropsList {
    CollectionDynamic: CollectionDynamicProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    CollectionDynamic?: {
      defaultProps?: ComponentsProps['CollectionDynamic'];
      styleOverrides?: ComponentsOverrides<Theme>['CollectionDynamic'];
      variants?: ComponentsVariants['CollectionDynamic'];
    };
  }
}
