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
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the form element. */
  logo: string;
  /** Styles applied to the contentContainer element. */
  contentContainer: string;
}

export declare type HeaderClassKey = keyof HeaderClasses;
declare const accordionClasses: HeaderClasses;
export default accordionClasses;
