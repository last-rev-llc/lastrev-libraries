import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Box } from '@mui/material';

import CategoryLinks, { CategoryLinkProps } from './CategoryLinks';
import { categoryLinksMock } from './CategoryLinks.mock';

type CategoryLinksStory = {
  args?: CategoryLinkProps;
} & Story<CategoryLinkProps>;

const Template: CategoryLinksStory = (args: CategoryLinkProps) => <CategoryLinks {...args} />;

export default {
  title: 'Elements / CategoryLinks',
  component: CategoryLinks,
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
    links: { name: 'Links' },
    sidekickLookup: { table: { disable: true } },
  }
} as Meta;

export const Default = Template.bind({});
Default.args = { ...categoryLinksMock };

