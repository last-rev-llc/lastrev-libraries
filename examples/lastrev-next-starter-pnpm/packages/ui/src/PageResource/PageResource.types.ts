import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { PageResource_BaseFragmentFragment } from '@graphql-sdk/types';
import { type LinkProps } from '../Link';
import { type HeroProps } from '../Hero';

export enum PageResourceVariants {
  default = 'default'
}

export interface PageResourceProps extends Omit<PageResource_BaseFragmentFragment, 'variant'> {
  variant: PageResourceVariants;
  breadcrumbs?: LinkProps[];
  jsonLd: any;
  hero?: HeroProps;
}

export interface PageResourceOwnerState extends PageResourceProps {}

interface PageResourceClasses {
  root: string;
  contentOuterGrid: string;
  headerWrap: string;
  contentWrap: string;
  title: string;
  pubDate: string;
  featuredMedia: string;
  featuredMediaWrap: string;
  authorWrap: string;
  author: string;
  authorName: string;
  authorSummaryWrap: string;
  authorSummary: string;
  authorImageWrap: string;
  authorImage: string;
  authorSocialLinks: string;
  body: string;
  breadcrumbsWrap: string;
  pageresourceCategories: string;
  pageresourceCategory: string;
  tags: string;
  tag: string;
  relatedItemsWrap: string;
  relatedItems: string;
  shareLinksWrap: string;
  shareLinks: string;
  shareLink: string;
}

export declare type PageResourceClassKey = keyof PageResourceClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    PageResource: PageResourceClassKey;
  }

  export interface ComponentsPropsList {
    PageResource: PageResourceProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    PageResource?: {
      defaultProps?: ComponentsProps['PageResource'];
      styleOverrides?: ComponentsOverrides<Theme>['PageResource'];
      variants?: ComponentsVariants['PageResource'];
    };
  }
}
