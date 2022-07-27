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
  /** Styles applied to the Root for the Header element. */
  root: string;
  /** Styles applied to the contentContainer for the Header element. */
  contentContainer: string;
  /** Styles applied to the Logo Link for the Header element. */
  logoRoot: string;
  /** Styles applied to the Logo - Content Module for the Header element. */
  logo: string;
  /** Styles applied to the Navigation Divider for the Header element. */
  navigationDivider: string;
  /** Styles applied to the Navigation Bar - Content Module for the Header element. */
  navigationBar: string;
  /** Styles applied to the Fragment that contains Navigation Divider and Navigation Bar for the Header element. */
  fragment: string;
  /** Styles applied to the Hidden for the Header element. */
  hidden: string;
  /** Styles applied to the IconButton Icon for the Header element. */
  iconButton: string;
}

export declare type HeaderClassKey = keyof HeaderClasses;
declare const accordionClasses: HeaderClasses;
export default accordionClasses;
