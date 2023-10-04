import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import type { ContentModule_BaseFragmentFragment } from '@graphql-sdk/types';

// TODO Review
export enum BackgroundVariants {
  default = 'default',
  mediaOnRight = 'mediaOnRight',
  mediaOnRightFullBleed = 'mediaOnRightFullBleed',
  mediaOnLeft = 'mediaOnLeft',
  mediaOnLeftFullBleed = 'mediaOnLeftFullBleed',
  mediaBelow = 'mediaBelow',
  mediaAbove = 'mediaAbove'
}

export interface BackgroundProps {
  background?: ContentModule_BaseFragmentFragment;
  backgroundColor?: string;
}

export interface BackgroundOwnerState extends BackgroundProps {}
interface BackgroundClasses {
  root: string;
  backgroundGrid: string;
  contentGrid: string;
  content: string;
  background: string;
  overline: string;
  title: string;
  subtitle: string;
  body: string;
  mediaWrap: string;
  media: string;
  actionsWrapper: string;
  action: string;
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
