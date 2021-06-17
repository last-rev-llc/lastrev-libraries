import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from './Grid';

export default {
  title: '1. Primitives / MUI / Grid',
  component: Grid,
  decorators: [(storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => <Box m={5}>{storyFn()}</Box>],
  argTypes: {
    container: {
      name: 'Container',
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
    justify: {
      name: 'Justify',
    },
    spacing: {
      name: 'Spacing',
      defaultValue: 5,
    },
    direction: {
      name: 'Direction',
      control: {
        type: 'inline-radio',
      },
    },
    alignContent: {
      name: 'Align Content',
      control: {
        type: 'select',
      },
    },
    alignItems: {
      name: 'Align Items',
      control: {
        type: 'select',
      },
    },
    wrap: {
      name: 'Wrap',
      control: {
        type: 'inline-radio',
      },
    },
    item: {
      name: 'Item',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      }
    },
    zeroMinWidth: {
      name: 'Zero Min-width',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      }
    },
    xs: { name: 'XS' },
    sm: { name: 'SM' },
    md: { name: 'MD' },
    lg: { name: 'LG' },
    xl: { name: 'XL' },
    ref: { table: { disable: true } },
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Grid {...args} />;
export const Default = Template.bind({});
