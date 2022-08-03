import { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';
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

export type LinkProps = {
  variant?: 'button-contained' | 'button-outlined' | 'button-text' | 'text' | any;
  id?: string;
  __typename?: string;
  activeClassName?: string;
  className?: string;
  as?: React.ElementType;
  href?: NextLinkProps['href'];
  noLinkStyle?: boolean;
  role?: React.AriaRole;
  icon?: string;
  iconPosition?: string;
  children?: any;
  onClick?: any;
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  sidekickLookup?: any;
  color?: any;
  target?: string;
  rel?: string;
  // sx?: SxProps<Theme>;
  sx?: any;
};

export interface LinkClasses {
  // TODO: Add root styled to Link for every variant
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the Link element. */
  rootLink: string;
  /** Styles applied to the MuiLink element. */
  rootMuiLink: string;
  /** Styles applied to the Button element. */
  rootButton: string;
  /** Styles applied to the container element ONLY when icon is selected. */
  buttonWrap: string;
}

export declare type LinkClassKey = keyof LinkClasses;
declare const linkClasses: LinkClasses;
export default linkClasses;
