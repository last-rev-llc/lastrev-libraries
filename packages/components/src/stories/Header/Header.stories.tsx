import React from 'react';
import Box from '@mui/material/Box';
import Header, { HeaderProps } from '@last-rev/component-library/dist/components/Header/Header';
import mockContent from './Header.mock';

export default {
  title: 'Modules / Header',
  component: Header,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ]
};

const Template = (args: HeaderProps) => <Header {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
