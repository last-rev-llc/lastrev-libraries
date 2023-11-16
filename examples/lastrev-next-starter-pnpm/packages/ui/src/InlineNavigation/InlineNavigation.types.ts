import React from 'react';

import type { ComponentsOverrides, ComponentsVariants, ComponentsProps, ButtonTypeMap } from '@mui/material';

import type { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export enum InlineNavigationVariants {
  inlineNavigation = 'inlineNavigation'
}

export interface InlineNavigationProps extends NavigationItem_BaseFragmentFragment {
  variant?: InlineNavigationVariants | any;
  activeClassName?: string;
  className?: string;
  role?: React.AriaRole;
  children?: any;
  onClick?: any;
  type?: ButtonTypeMap;
  color?: any;
  target?: string;
  rel?: string;
  sx?: any;
}

export interface InlineNavigationOwnerState extends InlineNavigationProps {}

interface InlineNavigationClasses {
  root: string;
  linksWrap: string;
}

export declare type InlineNavigationClassKey = keyof InlineNavigationClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    InlineNavigation: InlineNavigationClassKey;
  }

  export interface ComponentsPropsList {
    InlineNavigation: InlineNavigationProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    InlineNavigation?: {
      defaultProps?: ComponentsProps['InlineNavigation'];
      styleOverrides?: ComponentsOverrides<Theme>['InlineNavigation'];
      variants?: ComponentsVariants['InlineNavigation'];
    };
  }
}
