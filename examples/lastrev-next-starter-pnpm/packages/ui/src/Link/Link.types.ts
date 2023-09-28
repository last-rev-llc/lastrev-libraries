import React from 'react';

import type { LinkProps as NextLinkProps } from 'next/link';
import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Link_BaseFragmentFragment } from '@graphql-sdk/types';

export enum LinkVariants {
  default = 'default',
  buttonContained = 'button-contained',
  buttonOutlined = 'button-outlined',
  buttonText = 'button-text',
  text = 'text'
}

export interface NextLinkComposedProps {
  linkAs?: NextLinkProps['as'];
  to?: NextLinkProps['href'];
  text?: string;
  className?: string;
  replace?: boolean;
  scroll?: boolean;
  passHref?: boolean;
  shallow?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  children: React.ReactNode;
}

export interface LinkProps extends Link_BaseFragmentFragment {
  variant?: LinkVariants | any;
  activeClassName?: string;
  className?: string;
  as?: React.ElementType;
  noLinkStyle?: boolean;
  role?: React.AriaRole;
  children?: any;
  onClick?: any;
  type?: 'button' | 'submit' | 'reset';
  color?: any;
  target?: string;
  rel?: string;
  // sx?: SxProps<Theme>;
  sx?: any;
}

export interface LinkClasses {
  // TODO: Add root styled to Link for every variant
  /** Styles applied to the root element. */
  // root: string;
  /** Styles applied to the container element ONLY when icon is selected. */
  // buttonWrap: string;
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
