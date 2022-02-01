import React from 'react';
import Box from '@mui/material/Box';
import ArticleNav, { ArticleNavProps } from './ArticleNav';
import { Story, Meta } from '@storybook/react';

import { articleNavMock } from './ArticleNav.mock';

type ArticleNavStory = {
  args?: ArticleNavProps;
} & Story<ArticleNavProps>;

const Template: ArticleNavStory = (args: ArticleNavProps) => <ArticleNav {...args} />;

export default {
  title: 'Elements / ArticleNav',
  component: ArticleNav,
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
Default.args = { ...articleNavMock };
