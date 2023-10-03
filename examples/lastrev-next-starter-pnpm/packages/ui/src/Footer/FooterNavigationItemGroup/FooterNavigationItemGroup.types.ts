import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export interface FooterNavigationItemGroupProps extends NavigationItem_BaseFragmentFragment {}

export interface FooterNavigationItemGroupOwnerState extends FooterNavigationItemGroupProps {}

interface FooterNavigationItemGroupClasses {
  root: string;
  navGroupItem: string;
  navigationItems: string;
  navigationItem: string;
}

export declare type FooterNavigationItemGroupClassKey = keyof FooterNavigationItemGroupClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    FooterNavigationItemGroup: FooterNavigationItemGroupClassKey;
  }

  export interface ComponentsPropsList {
    FooterNavigationItemGroup: FooterNavigationItemGroupProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    FooterNavigationItemGroup?: {
      defaultProps?: ComponentsProps['FooterNavigationItemGroup'];
      styleOverrides?: ComponentsOverrides<Theme>['FooterNavigationItemGroup'];
      variants?: ComponentsVariants['FooterNavigationItemGroup'];
    };
  }
}
