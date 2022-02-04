import React from 'react';
import { Story, Meta } from '@storybook/react';
import Box from '@mui/material/Box';

import ArticleList, { ArticleListProps } from './ArticleList';
import { articleCategoryWithArticlesMock, articleCategoryWithSubcategoriesMock } from '../ArticleCategory/ArticleCategory.mock';

type ArticleListStory = {
  args?: ArticleListProps;
} & Story<ArticleListProps>;

const Template: ArticleListStory = (args: ArticleListProps) => <ArticleList {...args} />;

export default {
  title: 'Elements / ArticleList',
  component: ArticleList,
  decorators: [
    (Story?: any, ctx?: any) => {
      return (
        <Box p={3}>
          <Story {...ctx.args} />
        </Box>
      );
    }
  ],
  argTypes: {
    categories: { name: 'Categories' },
  }
} as Meta;

export const Default = Template.bind({});
Default.args = {
  categories: [
    { ...articleCategoryWithArticlesMock },
    { ...articleCategoryWithSubcategoriesMock }
  ]
};
