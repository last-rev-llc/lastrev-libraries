// import { Block_BaseFragmentFragment } from '@graphql-sdk';

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

// export interface BlockProps extends Block_BaseFragmentFragment {}
export interface BlockProps {}

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
