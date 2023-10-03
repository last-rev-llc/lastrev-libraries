import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export interface FooterNavigationItemProps extends NavigationItem_BaseFragmentFragment {}

export interface FooterNavigationItemOwnerState extends FooterNavigationItemProps {}

interface FooterNavigationItemClasses {
  root: string;
  rootLinkButton: string;
  rootLink: string;
}

export declare type FooterNavigationItemClassKey = keyof FooterNavigationItemClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    FooterNavigationItem: FooterNavigationItemClassKey;
  }

  export interface ComponentsPropsList {
    FooterNavigationItem: FooterNavigationItemProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    FooterNavigationItem?: {
      defaultProps?: ComponentsProps['FooterNavigationItem'];
      styleOverrides?: ComponentsOverrides<Theme>['FooterNavigationItem'];
      variants?: ComponentsVariants['FooterNavigationItem'];
    };
  }
}
