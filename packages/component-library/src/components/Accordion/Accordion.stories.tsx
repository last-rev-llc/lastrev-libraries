import React from 'react';
import Box from '@mui/material/Box';
import Accordion from './Accordion';
import mockContent from './Accordion.mock';

export default {
  title: 'Components / Accordion',
  component: Accordion,
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
    __typename: { table: { disable: true } },
    ref: { table: { disable: true } },
    internalTitle: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => (
  <Accordion __typename={''} internalTitle={''} sidekickLookup={undefined} children={''} {...args} />
);
export const Default = Template.bind({});
Default.args = { ...mockContent };
