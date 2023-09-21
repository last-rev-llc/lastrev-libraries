import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export interface FooterNavigationItemProps extends NavigationItem_BaseFragmentFragment {}

export interface FooterNavigationItemClasses {
  root: string;
  rootLinkButton: string;
  rootLink: string;
  tag: string;
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
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['FooterNavigationItem'];
    };
  }
}
