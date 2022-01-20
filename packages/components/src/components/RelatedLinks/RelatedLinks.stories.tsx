import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Box } from '@mui/material';

import RelatedLinks, { RelatedLinksProps } from './RelatedLinks';
import { relatedLinksMock } from './RelatedLinks.mock';

type RelatedLinksStory = {
  args?: RelatedLinksProps;
} & Story<RelatedLinksProps>;

const Template: RelatedLinksStory = (args: RelatedLinksProps) => <RelatedLinks {...args} />;

export default {
  title: 'Elements / RelatedLinks',
  component: RelatedLinks,
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
Default.args = { ...relatedLinksMock };

