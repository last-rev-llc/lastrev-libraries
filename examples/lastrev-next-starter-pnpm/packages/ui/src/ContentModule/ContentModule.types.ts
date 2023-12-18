import { Theme } from '@mui/material/styles';

export interface ContentModuleProps {
  __typename?: string | undefined;
  theme?: Array<Theme>;
  variant?: string;
  animation?: string;
  colorScheme?: string;
  // loading?: boolean;
  [key: string]: any;
}

interface ContentModuleClasses {
  // /** Styles applied to the root element. */
  // root: string;
}

export declare type ContentModuleClassKey = keyof ContentModuleClasses;
declare const accordionClasses: ContentModuleClasses;
export default accordionClasses;
