import { CollectionProps } from '../Collection';
import { MediaProps } from '../Media';

export interface HeaderProps {
  variant?: 'elevation' | 'outlined' | undefined;
  color?: any;
  colorScheme?: string;
  logo?: MediaProps;
  logoUrl?: string;
  navigationItems?: CollectionProps[];
  sidekickLookup?: any;
}

export interface HeaderClasses {
  /** Styles applied to the Root element. */
  root: string;
  /** Styles applied to the contentContainer element. */
  contentContainer: string;
  /** Styles applied to the Logo Link element. */
  logoRoot: string;
  /** Styles applied to the Logo - Content Module element. */
  logo: string;
  /** Styles applied to the Navigation Divider element. */
  navigationDivider: string;
  /** Styles applied to the Content Module - Navigation Bar element. */
  contentModule: string;
  /** Styles applied to the Fragment that contains Navigation Divider and Navigation Bar element. */
  fragment: string;
  /** Styles applied to the Hidden element. */
  hidden: string;
  /** Styles applied to the IconButton Icon element. */
  iconButton: string;
  /** Styles applied to the Close Icon element. */
  closeIcon: string;
  /** Styles applied to the Menu Icon element. */
  menuIcon: string;
}

export declare type HeaderClassKey = keyof HeaderClasses;
declare const headerClasses: HeaderClasses;
export default headerClasses;
