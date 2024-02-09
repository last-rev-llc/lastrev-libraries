import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { CollectionExpandable_BaseFragmentFragment } from '@graphql-sdk/types';

export enum TabsVariants {
  default = 'default'
}

export interface TabsProps extends Omit<CollectionExpandable_BaseFragmentFragment, 'variant'> {
  variant: TabsVariants;
}

export interface TabsOwnerState extends TabsProps {}

import Background from '../Background';

interface TabsClasses {
  root: string;
  contentOuterGrid: string;
  introTextGrid: string;
  introText: string;
  tabsContext: string;
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
