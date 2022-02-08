import React from 'react';
import { Story, Meta } from '@storybook/react';
import Box from '@mui/material/Box';

import FeaturedArticles, { FeaturedArticlesProps } from './FeaturedArticles';
import articlesMock from './FeaturedArticles.mock';

type ArticleCategoryStory = {
  args?: FeaturedArticlesProps;
} & Story<FeaturedArticlesProps>;

const Template: ArticleCategoryStory = (args: FeaturedArticlesProps) => <FeaturedArticles {...args} />;

export default {
  title: 'Elements / FeaturedArticles',
  component: FeaturedArticles,
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
    articles: { name: 'Articles' },
  }
} as Meta;

export const Default = Template.bind({});
Default.args = { articles: [...articlesMock] };
