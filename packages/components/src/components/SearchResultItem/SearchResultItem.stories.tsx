import React from 'react';
import { Box } from '@mui/material';
import SearchResultItem, { SearchResultItemProps } from './SearchResultItem';
import SearchResultItemMock from './SearchResultItem.mock';

export default {
  title: 'Modules / SearchBox / SearchResultItem',
  component: SearchResultItem,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => <Box>{storyFn()}</Box>
  ]
};

const Template = (args: SearchResultItemProps) => <SearchResultItem {...args} />;

export const Default = Template.bind({});
Default.args = { ...SearchResultItemMock };
