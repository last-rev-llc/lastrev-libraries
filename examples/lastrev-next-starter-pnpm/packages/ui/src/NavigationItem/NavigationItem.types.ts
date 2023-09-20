import { LinkProps } from '../Link';

export interface NavigationItemProps extends LinkProps {
  subNavigation?: Array<LinkProps | NavigationItemProps>;
  sidekickLookup?: any;
  onRequestClose?: any;
}

export interface NavigationItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the menuRoot element. */
  menuRoot: string;
}

export declare type NavigationItemClassKey = keyof NavigationItemClasses;
declare const accordionClasses: NavigationItemClasses;
export default accordionClasses;
