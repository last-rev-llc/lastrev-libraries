import React from 'react';
import Box from '@material-ui/core/Box';
import Section from './Section';

export default {
  title: '2. Modules / Section',
  component: Section,
  decorators: [(storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => <Box m={5}>{storyFn()}</Box>],
};

const Template = (args: JSX.IntrinsicAttributes) => <Section {...args} />;
export const Default = Template.bind({});
