import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { type Options } from '@contentful/rich-text-react-renderer';

import type { Text_BaseFragmentFragment } from '@graphql-sdk/types';

export enum TextVariants {
  default = 'default',
  introText = 'introText',
  inline = 'inline',
  thin = 'thin'
}

export interface TextProps extends Omit<Text_BaseFragmentFragment, 'variant'> {
  styles?: {
    root?: any;
  };
  sx?: any;
  variant?: TextVariants;
  align?: 'left' | 'center' | 'right' | 'justified' | any;
  renderNode?: any;
  renderMark?: any;
  renderOptions?: Options;
}

export interface TextOwnerState extends TextProps {}

interface TextClasses {
  /** Styles applied to the root element. */
  root: string;
  overline: string;
  title: string;
  subtitle: string;
  bodyWrap: string;
  titleIcon: string;
  titleWrap: string;
  background: string;
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
