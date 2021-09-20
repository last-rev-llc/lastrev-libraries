import React from 'react';
import Box from '@mui/material/Box';
import Header from './Header';

export default {
  title: '2. Modules / Header',
  component: Header,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ]
};

const Template = (args: JSX.IntrinsicAttributes) => <Header {...args} />;
export const Default = Template.bind({});
