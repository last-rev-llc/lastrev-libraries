import React from 'react';

import { LinkProps as NextLinkProps } from 'next/link';
import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Link_BaseFragmentFragment } from '@graphql-sdk/types';

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

export enum LinkVariants {
  'button-contained' = 'button-contained',
  'button-outlined' = 'button-outlined',
  'button-text' = 'button-text',
  text = 'text',
  default = 'default'
}
export interface LinkProps extends Omit<Link_BaseFragmentFragment, 'variant'> {
  variant: LinkVariants;
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
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Link'];
    };
  }
}
