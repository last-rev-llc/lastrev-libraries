import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export interface HeaderNavLinkNestedProps extends NavigationItem_BaseFragmentFragment {
  id?: string;
  sidekickLookup?: any;
  onRequestClose?: any;
  variant?: string;
}

export interface HeaderNavLinkNestedClasses {
  root: string;
  menuRoot: string;
  menuItem: string;
  navItemLink: string;
}

export declare type HeaderNavLinkNestedClassKey = keyof HeaderNavLinkNestedClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    HeaderNavLinkNested: HeaderNavLinkNestedClassKey;
  }

  export interface ComponentsPropsList {
    HeaderNavLinkNested: HeaderNavLinkNestedProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    HeaderNavLinkNested?: {
      defaultProps?: ComponentsProps['HeaderNavLinkNested'];
      styleOverrides?: ComponentsOverrides<Theme>['HeaderNavLinkNested'];
      variants?: ComponentsVariants['HeaderNavLinkNested'];
    };
  }
}
