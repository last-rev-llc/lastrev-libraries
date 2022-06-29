import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from '@mui/material';
import { CollectionProps } from '../Collection';
import { MediaProps } from '../Media';

export interface HeaderProps {
  variant?: 'elevation' | 'outlined' | undefined;
  color?: string;
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

// declare module '@mui/material/styles' {
//   export interface ComponentNameToClassKey {
//     Header: HeaderClassKey;
//   }
//   export interface ComponentsPropsList {
//     Header: HeaderProps;
//   }
// }
// declare module '@mui/material/styles' {
//   export interface Components {
//     Header?: {
//       defaultProps?: ComponentsProps['Header'];
//       styleOverrides?: ComponentsOverrides<Theme>['Header'];
//       /**
//        * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
//        */
//       variants?: ComponentsVariants['Header'];
//     };
//   }
// }
