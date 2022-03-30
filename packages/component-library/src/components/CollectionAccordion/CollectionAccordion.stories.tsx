import React from 'react';
import Box from '@mui/material/Box';
import CollectionAccordion from './CollectionAccordion';
import mockContent from './CollectionAccordion.mock';

export default {
  title: '1. Components / CollectionAccordion',
  component: CollectionAccordion,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={2} style={{ backgroundColor: '#eee' }}>
        {storyFn()}
      </Box>
    )
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['collection-accordion']
      }
    },
    title: { name: 'Title' },
    body: { name: 'Body' },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => (
  <CollectionAccordion theme={undefined} sidekickLookup={undefined} itemSpacing={undefined} {...args} />
);
export const Default = Template.bind({});
Default.args = { ...mockContent() };
