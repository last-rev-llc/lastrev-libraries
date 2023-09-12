import { Options } from '@contentful/rich-text-react-renderer';

import { Text_BaseFragmentFragment } from '@graphql-sdk/types';

interface Content {
  __typename?: string;
  id: string;
}

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

export interface TextClasses {
  /** Styles applied to the root element. */
  root: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export declare type TextClassKey = keyof TextClasses;

declare const textClasses: TextClasses;

export default textClasses;
