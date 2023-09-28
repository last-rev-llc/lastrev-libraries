import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

export enum GridVariants {
  default = 'default',
  contentOnRight = 'contentOnRight',
  contentOnRightFullBleed = 'contentOnRightFullBleed',
  contentOnLeft = 'contentOnLeft',
  contentOnLeftFullBleed = 'contentOnLeftFullBleed',
  contentBelow = 'contentBelow',
  contentAbove = 'contentAbove'
}

export interface GridProps {
  children: React.ReactNode;
}

export interface GridClasses {
  root: string;
  introTextWrapper: string;
  introText: string;
  contentOuterGrid: string;
  categoriesWrapper: string;
  mainContentWrapper: string;
  content: string;
  angledArrowIcon: string;
  overline: string;
  title: string;
  subtitle: string;
  body: string;
  sideContentWrapper: string;
  mediaItems: string;
  actionsWrapper: string;
  action: string;
  common: string;
}

export declare type GridClassKey = keyof GridClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Grid: GridClassKey;
  }

  export interface ComponentsPropsList {
    Grid: GridProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Grid?: {
      defaultProps?: ComponentsProps['Grid'];
      styleOverrides?: ComponentsOverrides<Theme>['Grid'];
      variants?: ComponentsVariants['Grid'];
    };
  }
}
