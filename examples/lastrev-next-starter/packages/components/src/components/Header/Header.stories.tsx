import React from 'react';
import Box from '@mui/material/Box';
import Header from './Header';
import headerMock from './Header.mock';

export default {
  title: '1. LR Components / Header',
  component: Header
};

const Template = (args: JSX.IntrinsicAttributes) => <Header sidekickLookup={{}} {...args} />;
export const Default = Template.bind({});
Default.args = { ...headerMock() };
