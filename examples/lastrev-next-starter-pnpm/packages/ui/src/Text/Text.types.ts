import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Options } from '@contentful/rich-text-react-renderer';

import type { Text_BaseFragmentFragment } from '@graphql-sdk/types';

export interface TextProps extends Text_BaseFragmentFragment {
  styles?: {
    root?: any;
  };
  sx?: any;
  variant?: string;
  align?: 'left' | 'center' | 'right' | 'justified' | any;
  renderNode?: any;
  renderMark?: any;
  renderOptions?: Options;
}

interface TextClasses {
  /** Styles applied to the root element. */
  root: string;
  overline: string;
  title: string;
  subtitle: string;
}

export declare type TextClassKey = keyof TextClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Text: TextClassKey;
  }

  export interface ComponentsPropsList {
    Text: TextProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Text?: {
      defaultProps?: ComponentsProps['Text'];
      styleOverrides?: ComponentsOverrides<Theme>['Text'];
      variants?: ComponentsVariants['Text'];
    };
  }
}
