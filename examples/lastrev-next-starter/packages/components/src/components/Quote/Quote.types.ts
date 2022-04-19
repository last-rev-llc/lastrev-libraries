import { Quote_BaseFragmentFragment } from '@lrns/graphql-sdk/dist';
import { LinkProps } from '../Link';
import { MediaProps } from '../Media';

export interface QuoteProps extends Quote_BaseFragmentFragment {
  variant?: 'one-column' | 'two-column';
  // __typename?: string;
  id?: string;
  sidekickLookup?: any;
  quote: string;
  authorName?: string;
  authorImage?: MediaProps;
  authorTitle?: string;
  logo?: MediaProps;
  actions?: Array<LinkProps>;
}

export interface QuoteClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the authorRoot element. */
  authorRoot: string;
  /** Styles applied to the mediaItem element. */
  mediaItem: string;
  /** Styles applied to the authorImage element. */
  authorImage: string;
  /** Styles applied to the quoteText element. */
  quoteText: string;
  /** Styles applied to the authorName element. */
  authorName: string;
  /** Styles applied to the quoteSymbol element. */
  quoteSymbol: string;
  /** Styles applied to the authorTitle element. */
  authorTitle: string;
  /** Styles applied to the actionsRoot element. */
  actionsRoot: string;
}

export declare type QuoteClassKey = keyof QuoteClasses;
declare const accordionClasses: QuoteClasses;
export default accordionClasses;
