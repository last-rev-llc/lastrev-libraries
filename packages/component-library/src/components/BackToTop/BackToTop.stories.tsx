import React from 'react';
import BackToTop from './BackToTop';
import mockContent from './BackToTop.mock';

export default {
  title: '1. Primitives / MUI / BackToTop',
  component: BackToTop,
  argTypes: {
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
    href: { name: 'Href' },
    ref: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <BackToTop {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent() };
