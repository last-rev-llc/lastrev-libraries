import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import type { ContentModule_BaseFragmentFragment } from '@graphql-sdk/types';

// TODO Review
export enum BackgroundVariants {
  default = 'default'
}

export interface BackgroundProps {
  background?: ContentModule_BaseFragmentFragment;
  backgroundColor?: string;
  overlap?: boolean;
  testId?: string;
  className?: string;
}

export interface BackgroundOwnerState extends BackgroundProps {}
interface BackgroundClasses {
  root: string;
  backgroundContent: string;
}

export declare type BackgroundClassKey = keyof BackgroundClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Background: BackgroundClassKey;
  }

  export interface ComponentsPropsList {
    Background: BackgroundProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Background?: {
      defaultProps?: ComponentsProps['Background'];
      styleOverrides?: ComponentsOverrides<Theme>['Background'];
      variants?: ComponentsVariants['Background'];
    };
  }
}
