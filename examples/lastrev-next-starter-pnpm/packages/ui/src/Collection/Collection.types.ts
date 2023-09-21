import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Collection_BaseFragmentFragment } from '@graphql-sdk/types';

import { CardVariants } from '../Card/Card.types';

type CollectionVariants =
  | 'default'
  | 'onePerRow'
  | 'twoPerRow'
  | 'threePerRow'
  | 'fourPerRow'
  | 'fivePerRow'
  | undefined;

export interface CollectionProps extends Collection_BaseFragmentFragment {
  variant?: CollectionVariants;
  itemsVariant?: CardVariants;
}

export interface CollectionOwnerState extends CollectionProps {}
export interface CollectionClasses {
  root: string;
  contentContainer: string;
  introTextWrapper: string;
  introText: string;
  itemsGrid: string;
  item: string;
  actionsContainer: string;
  action: string;
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
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Collection'];
    };
  }
}
