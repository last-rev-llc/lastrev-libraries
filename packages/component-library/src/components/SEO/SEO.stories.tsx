import React from 'react';
import SEO from './SEO';
import mockContent from './SEO.mock';

export default {
  title: '1. Primitives / LR / SEO',
  component: SEO,
  argTypes: {}
};

const Template = (args: JSX.IntrinsicAttributes) => <SEO {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
