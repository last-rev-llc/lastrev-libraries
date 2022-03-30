import React from 'react';
import Box from '@mui/material/Box';
import Link from './Link';
import mockContent from './Link.mock';

export default {
  title: '1. Components / Link',
  component: Link,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={4} style={{ backgroundColor: '#f5f5f5' }}>
        {storyFn()}
      </Box>
    )
  ],
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
