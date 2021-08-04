import React from 'react';
import Box from '@material-ui/core/Box';
import CollectionAccordion from './CollectionAccordion';
import mockContent from './CollectionAccordion.mock';

export default {
  title: '1. Primitives / MUI / CollectionAccordion',
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
        options: ['accordion-standard']
      }
    },
    title: { name: 'Title' },
    body: { name: 'Body' },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <CollectionAccordion {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
