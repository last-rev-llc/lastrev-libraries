import React from 'react';
import Box from '@mui/material/Box';
import TopicNavHorizontal, { TopicNavHorizontalProps } from './TopicNavHorizontal';

import mockNavigationItem from '../NavigationItem/NavigationItem.mock';
import { Story, Meta } from '@storybook/react';

type TopicNavHorizontalStory = {
  args?: TopicNavHorizontalProps;
} & Story<TopicNavHorizontalProps>;

const Template: TopicNavHorizontalStory = (args: TopicNavHorizontalProps) => <TopicNavHorizontal {...args} />;

export default {
  title: 'Elements / Topic Nav Horizonatal',
  component: TopicNavHorizontal,
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
  navItems: [mockNavigationItem(), mockNavigationItem(), mockNavigationItem()]
};
