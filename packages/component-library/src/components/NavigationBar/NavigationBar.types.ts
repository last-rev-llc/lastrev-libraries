import { LinkProps } from '../Link';
import { NavigationItemProps } from '../NavigationItem';

export interface NavigationBarProps {
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
declare const accordionClasses: NavigationBarClasses;
export default accordionClasses;
