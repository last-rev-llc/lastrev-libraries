import React from 'react';
import { Box } from '@mui/material';
import Autocomplete, { AutocompleteProps } from './Autocomplete';
import AutocompleteMock from './Autocomplete.mock';

export default {
  title: 'Modules / SearchBox / Autocomplete',
  component: Autocomplete,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => <Box>{storyFn()}</Box>
  ]
};

const Template = (args: AutocompleteProps) => <Autocomplete {...args} />;

export const Default = Template.bind({});
Default.args = { ...AutocompleteMock };
