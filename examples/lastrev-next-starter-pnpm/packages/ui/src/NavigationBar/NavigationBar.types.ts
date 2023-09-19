import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

// TODO: Needed?
import { NavigationBar_BaseFragmentFragment } from '@graphql-sdk/types';

import { LinkProps } from '../Link/Link.types';
import { NavigationItemProps } from '../NavigationItem/NavigationItem.types';

export interface NavigationBarProps {
  color?: string;
  items?: LinkProps[] | NavigationItemProps[];
  variant?: string;
  itemsVariant?: string;
  theme?: any;
  sidekickLookup: string;
  onRequestClose?: any;
}
export interface NavigationBarClasses {
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
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['NavigationBar'];
    };
  }
}
