import { LinkProps } from '../Link';
import { NavigationItemProps } from '../NavigationItem';

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
  /** Styles applied to the navigationBarRoot element. */
  navigationBarRoot: string;
  /** Styles applied to the navigationBarItemRoot element. */
  navigationBarItemRoot: string;
  /** Styles applied to the navigationBarItem (Content Module) element. */
  navigationBarItem: string;
}

export declare type NavigationBarClassKey = keyof NavigationBarClasses;
declare const accordionClasses: NavigationBarClasses;
export default accordionClasses;
