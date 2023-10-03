import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

// TODO: Needed?
import type { NavigationBar_BaseFragmentFragment } from '@graphql-sdk/types';

import type { LinkProps } from '../Link/Link.types';
import type { NavigationItemProps } from '../NavigationItem/NavigationItem.types';

export interface NavigationBarProps {
  color?: string;
  items?: LinkProps[] | NavigationItemProps[];
  variant?: string;
  itemsVariant?: string;
  theme?: any;
  sidekickLookup: string;
  onRequestClose?: any;
}
interface NavigationBarClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type NavigationBarClassKey = keyof NavigationBarClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    NavigationBar: NavigationBarClassKey;
  }

  export interface ComponentsPropsList {
    NavigationBar: NavigationBarProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    NavigationBar?: {
      defaultProps?: ComponentsProps['NavigationBar'];
      styleOverrides?: ComponentsOverrides<Theme>['NavigationBar'];
      variants?: ComponentsVariants['NavigationBar'];
    };
  }
}
