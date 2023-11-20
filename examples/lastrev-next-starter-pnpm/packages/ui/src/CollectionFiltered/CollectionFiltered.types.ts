import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { CollectionFiltered_BaseFragmentFragment } from '@graphql-sdk/types';

import { CardVariants } from '../Card/Card.types';

export enum CollectionFilteredVariants {
  default = 'default',
  onePerRow = 'onePerRow',
  twoPerRow = 'twoPerRow',
  threePerRow = 'threePerRow',
  fourPerRow = 'fourPerRow',
  fivePerRow = 'fivePerRow'
}

export interface CollectionFilteredProps
  extends Omit<CollectionFiltered_BaseFragmentFragment, 'variant' | 'itemsVariant'> {
  variant?: CollectionFilteredVariants;
  itemsVariant?: CardVariants;
}

export interface CollectionFilteredOwnerState extends CollectionFilteredProps {}

interface CollectionFilteredClasses {
  root: string;
  contentGrid: string;
  introTextWrap: string;
  introText: string;
  itemsGrid: string;
  item: string;
  actionsContainer: string;
  actionsWrap: string;
  action: string;
}

export declare type CollectionFilteredClassKey = keyof CollectionFilteredClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    CollectionFiltered: CollectionFilteredClassKey;
  }

  export interface ComponentsPropsList {
    CollectionFiltered: CollectionFilteredProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    CollectionFiltered?: {
      defaultProps?: ComponentsProps['CollectionFiltered'];
      styleOverrides?: ComponentsOverrides<Theme>['CollectionFiltered'];
      variants?: ComponentsVariants['CollectionFiltered'];
    };
  }
}
