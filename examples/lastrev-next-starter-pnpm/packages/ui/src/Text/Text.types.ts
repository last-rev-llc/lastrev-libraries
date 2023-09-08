import { Options } from '@contentful/rich-text-react-renderer';
import { MediaProps } from '../Media';
import { RichText_BaseFragmentFragment, Text_BaseFragmentFragment } from '../../../graphql-sdk/src/types';

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
  align?: 'left' | 'center' | 'right' | any;
  renderNode?: any;
  renderMark?: any;
  renderOptions?: Options;
}

export interface TextLinks {
  entries?: Array<Content>;
  assets?: Array<MediaProps>;
}
export interface RichText extends RichText_BaseFragmentFragment {}

export interface TextClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type TextClassKey = keyof TextClasses;
declare const accordionClasses: TextClasses;
export default accordionClasses;
