import React from 'react';
import Button from './Button';

const inlineRadios = ['variant', 'size', 'color'];

export default {
  title: '1. Primitives / MUI / Button',
  component: Button,
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'inline-radio'
      },
      defaultValue: 'contained',
      table: {
        defaultValue: { summary: 'contained' }
      }
    },
    size: {
      name: 'Size',
      control: {
        type: 'inline-radio'
      },
      defaultValue: 'large',
      table: {
        defaultValue: { summary: 'large' }
      }
    },
    color: {
      name: 'Color',
      control: {
        type: 'inline-radio'
      },
      defaultValue: 'primary',
      table: {
        defaultValue: { summary: 'primary' }
      }
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false,
      table: {
        defaultValue: { summary: false }
      }
    },
    disableElevation: {
      name: 'Disable Elevation',
      control: {
        type: 'boolean'
      },
      defaultValue: false,
      table: {
        defaultValue: { summary: false }
      }
    },
    fullWidth: {
      name: 'Full Width',
      control: {
        type: 'boolean'
      },
      defaultValue: false,
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
