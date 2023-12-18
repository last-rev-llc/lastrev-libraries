import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { LinkProps } from '../Link';

import type { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export enum NavigationLinkVariants {
  default = 'default',
  link = 'link',
  linkBolded = 'linkBolded',
  group = 'group',
  label = 'label',
  localeList = 'localeList',
  buttonOutlined = 'buttonOutlined',
  buttonContainer = 'button-container',
  featured = 'featured'
}

export interface NavigationItemProps extends Omit<NavigationItem_BaseFragmentFragment, 'variant'> {
  subNavigation?: Array<LinkProps | NavigationItemProps>;
  sidekickLookup?: any;
  onRequestClose?: any;
  variant?: NavigationLinkVariants;
}

export interface NavigationItemOwnerState extends NavigationItemProps {}

interface NavigationItemClasses {
  root: string;
  menuRoot: string;
  navItemSubMenu: string;
  navItemSubMenuItem: string;
}

export declare type NavigationItemClassKey = keyof NavigationItemClasses;
declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    NavigationItem: NavigationItemClassKey;
  }

  export interface ComponentsPropsList {
    NavigationItem: NavigationItemProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    NavigationItem?: {
      defaultProps?: ComponentsProps['NavigationItem'];
      styleOverrides?: ComponentsOverrides<Theme>['NavigationItem'];
      variants?: ComponentsVariants['NavigationItem'];
    };
  }
}
