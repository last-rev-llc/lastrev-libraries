import React from 'react';
import { Box } from '@mui/material';
import AutocompleteBox, { AutocompleteBoxProps } from './AutocompleteBox';
import autocompleteBoxMock from './AutocompleteBox.mock';

export default {
  title: 'Modules / Search / AutocompleteBox',
  component: AutocompleteBox,
  argTypes: {
    settings: { name: 'Settings' }
  },
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={[1, 10]} bgcolor="#00324a">
        {storyFn()}
      </Box>
    )
  ]
};

const Template = (args: AutocompleteBoxProps) => <AutocompleteBox {...args} />;

export const Default = Template.bind({});
Default.args = { ...autocompleteBoxMock };
