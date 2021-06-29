import React from 'react';
import Box from '@material-ui/core/Box';
import Card from './Card';
import mockContent from './Card.mock';

export default {
  title: '1. Primitives / MUI / Card',
  component: Card,
  decorators: [(storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => <Box m={5}>{storyFn()}</Box>],
  argTypes: {
    image: { name: 'Image' },
    title: { name: 'Title' },
    subtitle: { name: 'Subtitle' },
    body: { name: 'Body' },
    ctas: { name: 'CTAs' },
    ref: { table: { disable: true } },
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Card {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
