import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import type { Hero_BaseFragmentFragment } from '@graphql-sdk/types';

// TODO Review
export enum HeroVariants {
  default = 'mediaOnRight',
  simpleCentered = 'simpleCentered',
  mediaOnRight = 'mediaOnRight',
  mediaOnRightFullBleed = 'mediaOnRightFullBleed',
  mediaOnLeft = 'mediaOnLeft',
  mediaOnLeftFullBleed = 'mediaOnLeftFullBleed',
  mediaBelow = 'mediaBelow',
  mediaAbove = 'mediaAbove'
}

export interface HeroProps extends Omit<Hero_BaseFragmentFragment, 'variant'> {
  variant: HeroVariants;
}

export interface HeroOwnerState extends HeroProps {}

interface HeroClasses {
  root: string;
  backgroundGrid: string;
  contentOuterGrid: string;
  mainContentWrap: string;
  sideContentWrap: string;
  content: string;
  background: string;
  overline: string;
  title: string;
  subtitle: string;
  body: string;
  mediaWrap: string;
  media: string;
  actionsWrap: string;
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
