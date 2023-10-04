import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import type { Hero_BaseFragmentFragment } from '@graphql-sdk/types';

// TODO Review
export enum HeroVariants {
  default = 'default',
  mediaOnRight = 'mediaOnRight',
  mediaOnRightFullBleed = 'mediaOnRightFullBleed',
  mediaOnLeft = 'mediaOnLeft',
  mediaOnLeftFullBleed = 'mediaOnLeftFullBleed',
  mediaBelow = 'mediaBelow',
  mediaAbove = 'mediaAbove'
}

export interface HeroProps extends Hero_BaseFragmentFragment {}

export interface HeroOwnerState extends HeroProps {}
interface HeroClasses {
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

export declare type HeroClassKey = keyof HeroClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Hero: HeroClassKey;
  }

  export interface ComponentsPropsList {
    Hero: HeroProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Hero?: {
      defaultProps?: ComponentsProps['Hero'];
      styleOverrides?: ComponentsOverrides<Theme>['Hero'];
      variants?: ComponentsVariants['Hero'];
    };
  }
}
