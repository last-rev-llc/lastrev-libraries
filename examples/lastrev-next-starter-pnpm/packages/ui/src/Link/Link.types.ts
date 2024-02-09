import React from 'react';

import type { ComponentsOverrides, ComponentsVariants, ComponentsProps, ButtonTypeMap } from '@mui/material';

import type { Link_BaseFragmentFragment } from '@graphql-sdk/types';

export enum LinkVariants {
  default = 'default',
  buttonContained = 'buttonContained',
  buttonOutlined = 'buttonOutlined',
  buttonText = 'buttonText',
  text = 'text'
}

export interface LinkProps extends Link_BaseFragmentFragment {
  variant?: LinkVariants | any;
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

export interface LinkOwnerState extends LinkProps {}

interface LinkClasses {
  root: string;
  rootButton: string;
  rootIconButton: string;
  rootLink: string;
  rootLinkChildren: string;
  rootLinkIcon: string;
  rootLinkText: string;
  noLinkStyleIcon: string;
}

export declare type LinkClassKey = keyof LinkClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Link: LinkClassKey;
  }

  export interface ComponentsPropsList {
    Link: LinkProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Link?: {
      defaultProps?: ComponentsProps['Link'];
      styleOverrides?: ComponentsOverrides<Theme>['Link'];
      variants?: ComponentsVariants['Link'];
    };
  }
}
