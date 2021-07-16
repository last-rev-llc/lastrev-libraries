import React from 'react';
import merge from 'lodash/merge';
import { ThemeProvider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Section from './Section';
// import ContentModule from '../ContentModule';
import mockContent from './Section.mock';
import {
  module01Mock,
  module02Mock,
  module03Mock,
  module04Mock,
  module05Mock,
  module06Mock,
  module07Mock,
  module08Mock,
  module09Mock,
} from './Section.mock';

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

export const AllCards = Template.bind({});
AllCards.args = { ...mockContent };

export const Module01 = Template.bind({});
Module01.args = { ...module01Mock };

export const Module02 = Template.bind({});
Module02.args = { ...module02Mock };

export const Module03 = Template.bind({});
Module03.args = { ...module03Mock };

export const Module04 = Template.bind({});
Module04.args = { ...module04Mock };

export const Module05 = Template.bind({});
Module05.args = { ...module05Mock };

export const Module06 = Template.bind({});
Module06.args = { ...module06Mock };

export const Module07 = Template.bind({});
Module07.args = { ...module07Mock };

export const Module08 = Template.bind({});
Module08.args = { ...module08Mock };

export const Module09 = Template.bind({});
Module09.args = { ...module09Mock };
