import React from 'react';
import Box from '@mui/material/Box';
import TopicNav, { TopicNavProps } from './TopicNav';
import { Story, Meta } from '@storybook/react';

import { articleCategoriesMock } from './TopicNav.mock';

type ArticleNavStory = {
  args?: TopicNavProps;
} & Story<TopicNavProps>;

const Template: ArticleNavStory = (args: TopicNavProps) => <TopicNav {...args} />;

export default {
  title: 'Elements / TopicNav',
  component: TopicNav,
  decorators: [
    (Story?: any, ctx?: any) => {
      return (
        <Box p={3}>
          <Story {...ctx.args} />
        </Box>
      );
    }
  ]
} as Meta;

export const Default = Template.bind({});
Default.args = {
  categories: [...articleCategoriesMock]
};
