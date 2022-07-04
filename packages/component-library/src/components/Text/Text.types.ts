import { Options } from '@contentful/rich-text-react-renderer';
import { MediaProps } from '../Media';

interface Content {
  __typename?: string;
  id: string;
}

export interface TextProps {
  __typename?: string;
  id?: string;
  styles?: {
    root?: any;
  };
  sx?: any;
  body?: RichText;
  sidekickLookup?: any;
  variant?: string;
  align?: 'left' | 'center' | 'right' | any;
  renderNode?: any;
  renderOptions?: Options;
}

export interface TextLinks {
  entries?: Array<Content>;
  assets?: Array<MediaProps>;
}
export interface RichText {
  json: any;
  links?: TextLinks;
}

export interface TextClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type TextClassKey = keyof TextClasses;
declare const accordionClasses: TextClasses;
export default accordionClasses;
