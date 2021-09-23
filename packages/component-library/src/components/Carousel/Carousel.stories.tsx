import React from 'react';
import Box from '@mui/material/Box';
import Carousel from './Carousel';
import mockContent from './Carousel.mock';

export default {
  title: '1. Primitives / MUI / Carousel',
  component: Carousel,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={5} style={{ backgroundColor: '#eee' }}>
        {storyFn()}
      </Box>
    )
  ],
  argTypes: {
    variant: {
      name: 'Variant'
      // control: {
      //   type: 'select',
      //   options: ['standard', 'standard-round', 'media', 'profile-column', 'profile-row', 'profile-image', 'square']
      // },
      // table: {
      //   defaultValue: { summary: 'standard' }
      // }
    },
    title: { name: 'Title' },
    body: { name: 'Body' },
    items: { name: 'Items' },
    itemsVariant: { name: 'Items Variant' },
    theme: { name: 'Theme' },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Carousel __typename={''} title={''} theme={undefined} {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
