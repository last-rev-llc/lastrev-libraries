import React from 'react';
import Box from '@mui/material/Box';
import Link from './Link';
import mockContent from './Link.mock';

export default {
  title: 'Components / Link',
  component: Link,
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['link', 'button-contained', 'button-outlined', 'button-text', '']
      },
      table: {
        defaultValue: { summary: 'link' }
      }
    },
    text: { name: 'Text' },
    href: { name: 'Href' },
    icon: {
      name: 'Icon',
      control: {
        type: 'select',
        options: ['instagram', 'facebook', 'twitter', 'youtube', 'chevron-right', 'caret-right', '']
      },
      table: {
        defaultValue: { summary: '' }
      }
    },
    iconPosition: {
      name: 'Icon Position',
      control: {
        type: 'inline-radio',
        options: ['Left', 'Right']
      },
      table: {
        defaultValue: { summary: 'Right' }
      }
    },
    type: {
      name: 'Type',
      control: {
        type: 'inline-radio',
        options: ['button', 'submit', 'reset']
      },
      table: {
        defaultValue: { summary: '' }
      }
    },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Link __typename="Link" {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent() };
export const ButtonContained = Template.bind({});
ButtonContained.args = { ...mockContent(), variant: 'button-contained' };
export const ButtonOutlined = Template.bind({});
ButtonOutlined.args = { ...mockContent(), variant: 'button-outlined' };
export const ButtonText = Template.bind({});
ButtonText.args = { ...mockContent(), variant: 'button-text' };
export const LinkText = Template.bind({});
LinkText.args = { ...mockContent(), variant: 'link' };
