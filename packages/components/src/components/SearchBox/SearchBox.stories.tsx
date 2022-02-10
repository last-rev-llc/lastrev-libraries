import React from 'react';
import { Box } from '@mui/material';
import SearchBox, { SearchBoxProps } from './SearchBox';
import SearchBoxMock from './SearchBox.mock';

export default {
  title: 'Modules / SearchBox',
  component: SearchBox,
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['home', 'default']
      }
    },
    placeholder: { name: 'Placeholder' }
  },
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={[1, 10]} bgcolor="#00324a">
        {storyFn()}
      </Box>
    )
  ]
};

const Template = (args: SearchBoxProps) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = { ...SearchBoxMock };
