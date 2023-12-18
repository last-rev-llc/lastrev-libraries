import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { CategoryBlog_BaseFragmentFragment } from '@graphql-sdk/types';
import { type LinkProps } from '../Link';
import { type HeroProps } from '../Hero';

export enum CategoryBlogVariants {
  default = 'default'
}

export interface CategoryBlogProps extends Omit<CategoryBlog_BaseFragmentFragment, 'variant'> {
  variant: CategoryBlogVariants;
  breadcrumbs?: LinkProps[];
  jsonLd: any;
  hero?: HeroProps;
}

export interface CategoryBlogOwnerState extends CategoryBlogProps {}

interface CategoryBlogClasses {
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
  categoryblogCategories: string;
  categoryblogCategory: string;
  tags: string;
  tag: string;
  relatedItemsWrap: string;
  relatedItems: string;
  shareLinksWrap: string;
  shareLinks: string;
  shareLink: string;
}

export declare type CategoryBlogClassKey = keyof CategoryBlogClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    CategoryBlog: CategoryBlogClassKey;
  }

  export interface ComponentsPropsList {
    CategoryBlog: CategoryBlogProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    CategoryBlog?: {
      defaultProps?: ComponentsProps['CategoryBlog'];
      styleOverrides?: ComponentsOverrides<Theme>['CategoryBlog'];
      variants?: ComponentsVariants['CategoryBlog'];
    };
  }
}
