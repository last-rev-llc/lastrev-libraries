import type { ComponentsOverrides, ComponentsVariants, ComponentsProps, LinkProps } from '@mui/material';

import type { Quote_BaseFragmentFragment } from '@graphql-sdk/types';
import { MediaProps } from '../Media';

export enum QuoteVariants {
  default = 'default',
  large = 'large',
  inline = 'inline'
}

export interface QuoteProps extends Quote_BaseFragmentFragment {
  variant?: string;
}

export interface QuoteOwnerState extends QuoteProps {}

interface QuoteClasses {
  root: string;
  background: string;
  contentOuterGrid: string;
  authorRoot: string;
  logo: string;
  image: string;
  quoteText: string;
  authorName: string;
  quoteSymbol: string;
  authorTitle: string;
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
