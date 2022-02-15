import React from 'react';
import { Box } from '@mui/material';
import SearchBox, { SearchBoxProps } from './SearchBox';
import searchBoxMock from './SearchBox.mock';

export default {
  title: 'Modules / Search / SearchBox',
  component: SearchBox,
  argTypes: {
    settings: { name: 'Settings' }
  },
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={[1, 10]} bgcolor="midnight.A100">
        {storyFn()}
      </Box>
    )
  ]
};

const Template = (args: SearchBoxProps) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = { ...searchBoxMock };
