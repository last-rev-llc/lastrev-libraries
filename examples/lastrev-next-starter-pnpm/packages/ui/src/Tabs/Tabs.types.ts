import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { CollectionExpandable_BaseFragmentFragment } from '@graphql-sdk/types';

export interface TabsProps extends CollectionExpandable_BaseFragmentFragment {}

export interface TabsOwnerState extends TabsProps {}

interface TabsClasses {
  root: string;
  contentGrid: string;
  introTextGrid: string;
  introText: string;
  itemsContainer: string;
  tabContext: string;
  tabListWrap: string;
  detailsWrap: string;
  details: string;
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
      variants?: ComponentsVariants['Tabs'];
    };
  }
}
