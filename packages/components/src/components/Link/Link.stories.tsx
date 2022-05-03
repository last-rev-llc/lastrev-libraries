import React from 'react';
import Box from '@mui/material/Box';
import Link from '@last-rev/component-library/dist/components/Link';
import mockContent from './Link.mock';

export default {
  title: '1. LR Components / Link',
  component: Link,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5} p={4} bgcolor="background.coolGrey">
        {storyFn()}
      </Box>
    )
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['button-contained', 'button-outlined', 'button-text', '']
      },
      table: {
        defaultValue: { summary: 'button-contained' }
      }
    },
    color: {
      name: 'Color',
      control: {
        type: 'select',
        options: ['primary', 'secondary']
      },
      table: {
        defaultValue: { summary: 'primary' }
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

const Template = (args: JSX.IntrinsicAttributes) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = { ...mockContent };
