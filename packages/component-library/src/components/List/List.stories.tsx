import React from 'react';
import Box from '@material-ui/core/Box';
import List from './List';

export default {
  title: '1. Primitives / MUI / List',
  component: List,
  decorators: [(storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => <Box m={5}>{storyFn()}</Box>],
  argTypes: {
    dense: {
      name: 'Dense',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      }
    },
    disablePadding: {
      name: 'Disable Padding',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      }
    },
    subheader: { name: 'Subheader' },
    ref: { table: { disable: true } },
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <List {...args} />;
export const Default = Template.bind({});
