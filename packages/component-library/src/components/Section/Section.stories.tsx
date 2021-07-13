import React from 'react';
import merge from 'lodash/merge';
import { ThemeProvider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Section from './Section';
// import ContentModule from '../ContentModule';
import mockContent from './Section.mock';

export default {
  title: '2. Modules / Section',
  component: Section,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    contents: { name: 'Contents' },
    background: { name: 'Background' },
    styles: { name: 'Styles' },
  },
};

const Template = (args: JSX.IntrinsicAttributes) =>
  <ThemeProvider theme={merge({}, ...args.theme)}>
    <Section {...args} />
  </ThemeProvider>;
export const Default = Template.bind({});
Default.args = { ...mockContent };
