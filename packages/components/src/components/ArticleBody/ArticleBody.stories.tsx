import React from 'react';
import { Story, Meta } from '@storybook/react';
import Box from '@mui/material/Box';

import ArticleBody, { ArticleBodyProps } from './ArticleBody';
import { articleBodyMock } from './ArticleBody.mock';

type ArticleBodyStory = {
  args?: ArticleBodyProps;
} & Story<ArticleBodyProps>;

const Template: ArticleBodyStory = (args: ArticleBodyProps) => <ArticleBody {...args} />;

export default {
  title: 'Elements / ArticleBody',
  component: ArticleBody,
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
    body: { name: 'Body' },
    sidekickLookup: { table: { disable: true } },
  }
} as Meta;

export const Default = Template.bind({});
Default.args = { ...articleBodyMock };

