import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Options } from '@contentful/rich-text-react-renderer';
import type { RichText_BaseFragmentFragment } from '@graphql-sdk/types';

export enum RichTextVariants {
  default = 'default',
  smallText = 'smallText',
  inline = 'inline',
  introText = 'introText'
}

// export interface RichText extends RichText_BaseFragmentFragment {}
export interface RichTextProps extends RichText_BaseFragmentFragment {
  renderNode?: any;
  renderMark?: any;
  renderOptions?: Options;
  sidekickLookup: any;
  variant: RichTextVariants;
  body: any;
}

export interface RichTextOwnerState extends RichTextProps {}

interface RichTextClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type RichTextClassKey = keyof RichTextClasses;
declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    RichText: RichTextClassKey;
  }

  export interface ComponentsPropsList {
    RichText: RichTextProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    RichText?: {
      defaultProps?: ComponentsProps['RichText'];
      styleOverrides?: ComponentsOverrides<Theme>['RichText'];
      variants?: ComponentsVariants['RichText'];
    };
  }
}
