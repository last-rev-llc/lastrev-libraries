import { Theme } from '@mui/material/styles';

export interface ContentThemeProviderProps {
  theme?: Array<Theme>;

  [key: string]: any;
}

export interface ContentModuleClasses {
  // /** Styles applied to the root element. */
  // root: string;
}

export declare type ContentModuleClassKey = keyof ContentModuleClasses;
declare const contentModuleClasses: ContentModuleClasses;
export default contentModuleClasses;
