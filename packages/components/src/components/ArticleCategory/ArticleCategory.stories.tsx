import React from 'react';
import { Story, Meta } from '@storybook/react';
import Box from '@mui/material/Box';

import ArticleCategory, { ArticleCategoryProps } from './ArticleCategory';
import { articleCategoryWithArticlesMock, articleCategoryWithSubCategoriesMock } from './ArticleCategory.mock';

type ArticleCategoryStory = {
  args?: ArticleCategoryProps;
} & Story<ArticleCategoryProps>;

const Template: ArticleCategoryStory = (args: ArticleCategoryProps) => <ArticleCategory {...args} />;

export default {
  title: 'Modules / ArticleCategory',
  component: ArticleCategory,
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
    title: { name: 'Name' },
    articles: { name: 'Articles' },
    subCategories: { name: 'SubCategories' },
  }
} as Meta;

export const Articles = Template.bind({});
Articles.args = { ...articleCategoryWithArticlesMock };

export const SubCategories = Template.bind({});
SubCategories.args = { ...articleCategoryWithSubCategoriesMock };
