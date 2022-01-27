import React from 'react';
import { Story, Meta } from '@storybook/react';
import Box from '@mui/material/Box';

import ArticleHead, { ArticleHeadProps } from './ArticleHead';
import { articleHeadMock } from './ArticleHead.mock';

type ArticleHeadStory = {
  args?: ArticleHeadProps;
} & Story<ArticleHeadProps>;

const Template: ArticleHeadStory = (args: ArticleHeadProps) => <ArticleHead {...args} />;

export default {
  title: 'Elements / ArticleHead',
  component: ArticleHead,
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
    title: { name: 'Title' },
    pubDate: { name: 'Publish Date (Last Modified Date)' },
    summary: { name: 'Summary' },
    sidekickLookup: { table: { disable: true } },
  }
} as Meta;

export const Default = Template.bind({});
Default.args = { ...articleHeadMock };

