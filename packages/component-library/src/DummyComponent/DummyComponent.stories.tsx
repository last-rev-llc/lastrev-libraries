import React from 'react';
import DummyComponent from './DummyComponent';

export default {
  title: 'DummyComponent',
  component: DummyComponent
};

const Template = (args) => <DummyComponent {...args} />;
export const Default = Template.bind({});
