import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Quote_BaseFragmentFragment } from '@graphql-sdk/types';

import type { LinkProps } from '../Link/Link.types';
import type { MediaProps } from '../Media/Media.types';

export enum QuoteVariants {
  default = 'default',
  large = 'large',
  inline = 'inline'
}

export interface QuoteProps extends Quote_BaseFragmentFragment {
  variant?: QuoteVariants;
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
  root: string;
  authorRoot: string;
  mediaItem: string;
  authorImage: string;
  quoteText: string;
  authorName: string;
  quoteSymbol: string;
  authorTitle: string;
  actionsRoot: string;
}

export declare type QuoteClassKey = keyof QuoteClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Quote: QuoteClassKey;
  }

  export interface ComponentsPropsList {
    Quote: QuoteProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Quote?: {
      defaultProps?: ComponentsProps['Quote'];
      styleOverrides?: ComponentsOverrides<Theme>['Quote'];
      variants?: ComponentsVariants['Quote'];
    };
  }
}
