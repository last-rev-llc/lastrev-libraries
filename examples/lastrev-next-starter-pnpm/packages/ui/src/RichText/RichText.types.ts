import { Options } from '@contentful/rich-text-react-renderer';
import type { RichText_BaseFragmentFragment } from '@graphql-sdk/types';

// export interface RichText extends RichText_BaseFragmentFragment {}
export interface RichTextProps extends RichText_BaseFragmentFragment {
  renderNode?: any;
  renderMark?: any;
  renderOptions?: Options;
}

interface RichTextClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type RichTextClassKey = keyof RichTextClasses;

declare const richTextClasses: RichTextClasses;

export default richTextClasses;
