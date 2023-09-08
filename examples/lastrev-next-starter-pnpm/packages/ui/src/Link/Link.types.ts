import { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';
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

export interface LinkProps extends Link_BaseFragmentFragment {
  variant?: 'button-contained' | 'button-outlined' | 'button-text' | 'text' | any;
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
declare const accordionClasses: LinkClasses;
export default accordionClasses;
