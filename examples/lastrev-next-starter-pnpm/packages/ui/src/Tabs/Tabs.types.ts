import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { CollectionExpandable } from '@graphql-sdk/types';

type TabsVariants =
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

export interface TabsProps extends CollectionExpandable {
  variant?: TabsVariants;
}

export interface TabsClasses {
  root: string;
  contentContainer: string;
  introTextWrapper: string;
  introText: string;
  itemsContainer: string;
  item: string;
  actionsContainer: string;
  action: string;
}

export declare type TabsClassKey = keyof TabsClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Tabs: TabsClassKey;
  }
  export interface ComponentsPropsList {
    Tabs: TabsProps;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    Tabs?: {
      defaultProps?: ComponentsProps['Tabs'];
      styleOverrides?: ComponentsOverrides<Theme>['Tabs'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Tabs'];
    };
  }
}
