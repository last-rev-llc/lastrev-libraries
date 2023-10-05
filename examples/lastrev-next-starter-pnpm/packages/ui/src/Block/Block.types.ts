import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Block_BaseFragmentFragment } from '@graphql-sdk/types';

export enum BlockVariants {
  default = 'contentOnRight',
  contentOnRight = 'contentOnRight',
  contentOnRightFullBleed = 'contentOnRightFullBleed',
  contentOnLeft = 'contentOnLeft',
  contentOnLeftFullBleed = 'contentOnLeftFullBleed',
  contentBelow = 'contentBelow',
  contentAbove = 'contentAbove'
}

export interface BlockProps extends Omit<Block_BaseFragmentFragment, 'variant'> {
  variant: BlockVariants;
}

export interface BlockOwnerState extends BlockProps {}

interface BlockClasses {
  root: string;
  introTextGrid: string;
  introText: string;
  contentOuterGrid: string;
  mainContentWrap: string;
  sideContentWrap: string;
  content: string;
  background: string;
  overline: string;
  title: string;
  subtitle: string;
  body: string;
  mediaItems: string;
  actionsWrap: string;
  action: string;
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
      variants?: ComponentsVariants['Block'];
    };
  }
}
