import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Collection_BaseFragmentFragment } from '@graphql-sdk/types';

import { CardVariants } from '../Card/Card.types';

export enum CollectionVariants {
  default = 'default',
  onePerRow = 'onePerRow',
  twoPerRow = 'twoPerRow',
  threePerRow = 'threePerRow',
  fourPerRow = 'fourPerRow',
  fivePerRow = 'fivePerRow'
}

export interface CollectionProps extends Omit<Collection_BaseFragmentFragment, 'variant' | 'itemsVariant'> {
  variant?: CollectionVariants;
  itemsVariant?: CardVariants;
  prevBgColor?: string;
  indexName?: string;
  useInfinite?: boolean;
}

export interface CollectionOwnerState extends CollectionProps {}

interface CollectionClasses {
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
}

export declare type CollectionClassKey = keyof CollectionClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Collection: CollectionClassKey;
  }

  export interface ComponentsPropsList {
    Collection: CollectionProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Collection?: {
      defaultProps?: ComponentsProps['Collection'];
      styleOverrides?: ComponentsOverrides<Theme>['Collection'];
      variants?: ComponentsVariants['Collection'];
    };
  }
}
