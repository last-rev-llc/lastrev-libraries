import React from 'react';
import Button from './Button';
import mockContent from './Button.mock';

export default {
  title: '1. Primitives / MUI / Button',
  component: Button,
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'inline-radio'
      },
      table: {
        defaultValue: { summary: 'contained' }
      }
    },
    size: {
      name: 'Size',
      control: {
        type: 'inline-radio'
      },
      table: {
        defaultValue: { summary: 'large' }
      }
    },
    color: {
      name: 'Color',
      control: {
        type: 'inline-radio'
      },
      table: {
        defaultValue: { summary: 'primary' }
      }
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      table: {
        defaultValue: { summary: false }
      }
    },
    disableElevation: {
      name: 'Disable Elevation',
      control: {
        type: 'boolean'
      },
      defaultValue: true,
      table: {
        defaultValue: { summary: true }
      }
    },
    fullWidth: {
      name: 'Full Width',
      control: {
        type: 'boolean'
      },
      table: {
        defaultValue: { summary: false }
      }
    },
    href: { name: 'Href' },
    ref: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Button {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent() };
