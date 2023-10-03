import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Section_BaseFragmentFragment } from '@graphql-sdk/types';

import { Breakpoint } from '@mui/material';

import type { MediaProps } from '../Media/Media.types';
import type { TextProps } from '../Text/Text.types';

export interface SectionProps extends Section_BaseFragmentFragment {
  introText?: TextProps;
  contents?: Array<{ __typename?: string; id?: string; file?: any }>;
  background?: MediaProps;
  backgroundColor?: string;
  variant?: string;
  testId?: string;
  contentWidth?: false | Breakpoint | undefined;
  contentDirection?: 'row' | 'column' | undefined;
  contentSpacing?: number;
  // Enables exposing inner `sx` prop through content
  styles?: {
    root?: any;
    gridContainer?: any & { spacing: any };
    gridItem?: any & { xs: any; sm: any; md: any };
    gridItems?: Array<any & { xs: any; sm: any; md: any }>;
  };
  sidekickLookup?: any;
}

interface SectionClasses {
  root: string;
  contentContainer: string;
  backgroundImage: string;
  gridContainer: string;
  gridItem: string;
  introText: string;
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
