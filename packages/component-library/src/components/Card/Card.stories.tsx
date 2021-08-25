import React from 'react';
import Box from '@material-ui/core/Box';
import Card from './Card';
import mockContent from './Card.mock';

export default {
  title: '1. Primitives / MUI / Card',
  component: Card,
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
        options: [
          'standard',
          'standard-round',
          'media',
          'media-hover',
          'media-and-text',
          'profile',
          'profile-large',
          'square',
          'standard-blog'
        ]
      },
      table: {
        defaultValue: { summary: 'standard' }
      }
    },
    media: { name: 'Media' },
    title: { name: 'Title' },
    subtitle: { name: 'Subtitle' },
    body: { name: 'Body' },
    actions: { name: 'Actions' },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Card {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
