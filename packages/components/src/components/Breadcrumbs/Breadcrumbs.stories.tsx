import React from 'react';
import { Story, Meta } from '@storybook/react';
import Box from '@mui/material/Box';

import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs';
import { breadcrumbsMock } from './Breadcrumbs.mock';

type BreadcrumbsStory = {
  args?: BreadcrumbsProps;
} & Story<BreadcrumbsProps>;

const Template: BreadcrumbsStory = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

export default {
  title: 'Elements / Breadcrumbs',
  component: Breadcrumbs,
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
    breadcrumbs: { name: 'Breadcrumbs' }
  }
} as Meta;

export const Default = Template.bind({});
Default.args = { ...breadcrumbsMock };

