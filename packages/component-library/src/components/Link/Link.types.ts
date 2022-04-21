import { LinkProps as NextLinkProps } from 'next/link';
// import { SxProps, Theme } from '@mui/material/styles';
export interface NextLinkComposedProps {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
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
  as?: NextLinkProps['as'];
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
  // root: string;
  /** Styles applied to the container element ONLY when icon is selected. */
  // buttonWrap: string;
}

export declare type LinkClassKey = keyof LinkClasses;
declare const accordionClasses: LinkClasses;
export default accordionClasses;
