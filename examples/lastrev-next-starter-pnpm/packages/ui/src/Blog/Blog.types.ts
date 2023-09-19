import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Blog_BaseFragmentFragment } from '@graphql-sdk/types';

export interface BlogProps extends Blog_BaseFragmentFragment {}

export interface BlogClasses {
  root: string;
  featuredMedia: string;
  featuredMediaWrap: string;
  pubDate: string;
  title: string;
  summary: string;
  author: string;
  body: string;
  blogCategories: string;
  blogCategory: string;
  tags: string;
  tag: string;
  relatedItems: string;
}

export declare type BlogClassKey = keyof BlogClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Blog: BlogClassKey;
  }
  export interface ComponentsPropsList {
    Blog: BlogProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Blog?: {
      defaultProps?: ComponentsProps['Blog'];
      styleOverrides?: ComponentsOverrides<Theme>['Blog'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Blog'];
    };
  }
}
