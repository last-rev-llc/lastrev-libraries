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
  /** Styles applied to the typography element. */
  typography: string;
  /** Styles applied to the hyperLink element. */
  hyperLink: string;
  /** Styles applied to the entryHyperLink element. */
  entryHyperLink: string;
  /** Styles applied to the assetHyperLink element. */
  assetHyperLink: string;
  /** Styles applied to the embeddedAsset element. */
  embeddedAsset: string;
  /** Styles applied to the embeddedEntry element. */
  embeddedEntry: string;
  /** Styles applied to the inlineEntry element. */
  inlineEntry: string;
  /** Styles applied to the embeddedRoot element. */
  embeddedRoot: string;
  /** Styles applied to the inlineRoot element. */
  inlineRoot: string;
  /** Styles applied to the tableRoot element. */
  tableRoot: string;
  /** Styles applied to the table element. */
  table: string;
  /** Styles applied to the tableHead element. */
  tableHead: string;
  /** Styles applied to the tableBody element. */
  tableBody: string;
  /** Styles applied to the tableHeaderCell element. */
  tableHeaderCell: string;
  /** Styles applied to the tableRow element. */
  tableRow: string;
  /** Styles applied to the tableCell element. */
  tableCell: string;
}

export declare type TextClassKey = keyof TextClasses;
declare const textClasses: TextClasses;
export default textClasses;
