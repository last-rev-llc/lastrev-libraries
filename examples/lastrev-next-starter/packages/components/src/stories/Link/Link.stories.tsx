import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@last-rev/component-library/dist/components/Link/Link';
import mockContent from './Link.mock';

export default {
  title: 'Modules / Link',
  component: Link,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5} p={4} bgcolor="gray">
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
        defaultValue: { summary: 'Instagram' }
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
        defaultValue: { summary: 'button' }
      }
    },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Link {...args} />;

export const ContainedPrimary = Template.bind({});
ContainedPrimary.args = { ...mockContent };
export const ContainedSecondary = Template.bind({});
ContainedSecondary.args = { ...mockContent, color: 'secondary' };
export const OutlinedPrimary = Template.bind({});
OutlinedPrimary.args = { ...mockContent, variant: 'button-outlined' };
export const OutlinedSecondary = Template.bind({});
OutlinedSecondary.args = { ...mockContent, variant: 'button-outlined', color: 'secondary' };
