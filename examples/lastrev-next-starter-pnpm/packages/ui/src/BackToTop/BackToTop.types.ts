import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { FabProps as MuiFabProps } from '@mui/material';

export interface BackToTopProps {
  FabProps?: MuiFabProps;
  theme?: any;
  sidekickLookup?: any;
}

export interface BackToTopOwnerState extends BackToTopProps {}

interface BackToTopClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type BackToTopClassKey = keyof BackToTopClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    BackToTop: BackToTopClassKey;
  }

  export interface ComponentsPropsList {
    BackToTop: BackToTopProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    BackToTop?: {
      defaultProps?: ComponentsProps['BackToTop'];
      styleOverrides?: ComponentsOverrides<Theme>['BackToTop'];
      variants?: ComponentsVariants['BackToTop'];
    };
  }
}
