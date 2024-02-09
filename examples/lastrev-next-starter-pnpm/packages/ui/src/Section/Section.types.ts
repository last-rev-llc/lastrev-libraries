import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Section_BaseFragmentFragment } from '@graphql-sdk/types';

export enum SectionContentDirections {
  row = 'row',
  column = 'column'
}

export enum SectionVariants {
  default = 'default',
  onePerRow = 'onePerRow',
  twoPerRow = 'twoPerRow',
  threePerRow = 'threePerRow'
}

export interface SectionProps extends Omit<Section_BaseFragmentFragment, 'variant' | 'contentDirection'> {
  variant?: SectionVariants;
  contentDirection?: SectionContentDirections;
}

export interface SectionOwnerState extends SectionProps {}

interface SectionClasses {
  root: string;
  contentOuterGrid: string;
  contentWrap: string;
  contentInnerGrid: string;
  backgroundMediaWrap: string;
  backgroundMedia: string;
  introTextGrid: string;
  introText: string;
  itemsGrid: string;
  sectionItem: string;
}

export declare type SectionClassKey = keyof SectionClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Section: SectionClassKey;
  }

  export interface ComponentsPropsList {
    Section: SectionProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Section?: {
      defaultProps?: ComponentsProps['Section'];
      styleOverrides?: ComponentsOverrides<Theme>['Section'];
      variants?: ComponentsVariants['Section'];
    };
  }
}
