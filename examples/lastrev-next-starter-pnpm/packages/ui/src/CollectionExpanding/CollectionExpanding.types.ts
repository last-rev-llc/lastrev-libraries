import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { CollectionExpanding_BaseFragmentFragment } from '@graphql-sdk/types';

type CollectionExpandingVariants =
  | 'default'
  | 'defaultCircleImage'
  | 'onePerRow'
  | 'twoPerRow'
  | 'twoPerRowOffset'
  | 'threePerRow'
  | 'fourPerRow'
  | 'customerLogos'
  | 'contentGrid'
  | 'pricing'
  | undefined;

export interface CollectionExpandingProps extends CollectionExpanding_BaseFragmentFragment {
  variant?: CollectionExpandingVariants;
}

export interface CollectionExpandingClasses {
  root: string;
  contentContainer: string;
  introText: string;
  itemsContainer: string;
  item: string;
  actionsContainer: string;
  action: string;
}

export declare type CollectionExpandingClassKey = keyof CollectionExpandingClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    CollectionExpanding: CollectionExpandingClassKey;
  }
  export interface ComponentsPropsList {
    CollectionExpanding: CollectionExpandingProps;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    CollectionExpanding?: {
      defaultProps?: ComponentsProps['CollectionExpanding'];
      styleOverrides?: ComponentsOverrides<Theme>['CollectionExpanding'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['CollectionExpanding'];
    };
  }
}
