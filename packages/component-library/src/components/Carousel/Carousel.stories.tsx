import React from 'react';
import Box from '@material-ui/core/Box';
import Carousel from './Carousel';
import mockContent from './Carousel.mock';

export default {
  title: '1. Primitives / MUI / Carousel',
  component: Carousel,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={5} style={{ backgroundColor: '#eee' }}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      // control: {
      //   type: 'select',
      //   options: ['standard', 'standard-round', 'media', 'avatar', 'avatar-large', 'square']
      // },
      // table: {
      //   defaultValue: { summary: 'standard' }
      // }
    },
    // media: { name: 'Media' },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Carousel {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
