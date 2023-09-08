import { Block_BaseFragmentFragment } from '@graphql-sdk/types';
import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from '@mui/material';

export enum BlockVariants {
  default = 'default',
  mediaAbove = 'mediaAbove',
  mediaOnRight = 'mediaOnRight',
  mediaOnLeft = 'mediaOnLeft',
  mediaBelow = 'mediaBelow',
  mediaCircleAbove = 'mediaCircleAbove',
  mediaCircleOnRight = 'mediaCircleOnRight',
  mediaCircleOnLeft = 'mediaCircleOnLeft',
  mediaCircleBelow = 'mediaCircleBelow'
}

export interface BlockProps extends Block_BaseFragmentFragment {}

export interface BlockClasses {
  root: string;
  introTextWrapper: string;
  introText: string;
  contentOuterWrapper: string;
  categoriesWrapper: string;
  contentWrapper: string;
  content: string;
  angledArrowIcon: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  mediaWrapper: string;
  mediaItems: string;
  actionsWrapper: string;
  action: string;
  common: string;
}

export declare type BlockClassKey = keyof BlockClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Block: BlockClassKey;
  }
  export interface ComponentsPropsList {
    Block: BlockProps;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    Block?: {
      defaultProps?: ComponentsProps['Block'];
      styleOverrides?: ComponentsOverrides<Theme>['Block'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Block'];
    };
  }
}
