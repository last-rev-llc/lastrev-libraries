import type { FabProps as MuiFabProps } from '@mui/material';

export interface BackToTopProps {
  FabProps?: MuiFabProps;
  theme?: any;
  sidekickLookup?: any;
}

export interface BackToTopClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type BackToTopClassKey = keyof BackToTopClasses;
declare const accordionClasses: BackToTopClasses;
export default accordionClasses;
