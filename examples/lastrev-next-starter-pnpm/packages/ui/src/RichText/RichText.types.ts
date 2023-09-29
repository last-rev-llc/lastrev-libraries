import { Options } from '@contentful/rich-text-react-renderer';
import type { RichText_BaseFragmentFragment } from '@graphql-sdk/types';

export interface RichText extends RichText_BaseFragmentFragment {}

import type { MediaProps } from '../Media/Media.types';

interface Content {
  __typename?: string;
  id: string;
}

export interface RichTextProps {
  __typename?: string;
  id?: string;
  styles?: {
    root?: any;
  };
  sx?: any;
  body: RichText;
  sidekickLookup?: any;
  variant?: string;
  align?: 'left' | 'center' | 'right' | 'justified' | any;
  renderNode?: any;
  renderMark?: any;
  renderOptions?: Options;
}

export interface RichTextLinks {
  entries?: Array<Content>;
  assets?: Array<MediaProps>;
}

export interface RichText {
  json: any;
  links?: RichTextLinks;
}

interface RichTextClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type RichTextClassKey = keyof RichTextClasses;

declare const richTextClasses: RichTextClasses;

export default richTextClasses;
