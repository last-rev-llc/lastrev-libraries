import React from 'react';
import Header from './Header';
import headerMock from './Header.mock';

export default {
  title: 'Global / Header',
  component: Header
};

const Template = (args: JSX.IntrinsicAttributes) => <Header sidekickLookup={{}} {...args} />;
export const Default = Template.bind({});
Default.args = { ...headerMock() };
