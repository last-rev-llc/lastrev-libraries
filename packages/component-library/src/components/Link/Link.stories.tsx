import React from 'react';
import Box from '@material-ui/core/Box';
import Link from './Link';
// import mockContent from './Link.mock';

export default {
  title: '1. Primitives / MUI / Link',
  component: Link,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    display: {
      name: 'Display',
      control: {
        type: 'inline-radio'
      },
      defaultValue: 'initial',
      table: {
        defaultValue: { summary: 'initial' }
      }
    },
    align: {
      name: 'Align',
      control: {
        type: 'select'
      }
      // defaultValue: 'left',
      // table: {
      //   defaultValue: { summary: 'left' },
      // }
    },
    color: {
      name: 'Color',
      options: ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error'],
      control: {
        type: 'select',
        labels: {
          initial: 'Initial',
          inherit: 'Inherit',
          primary: 'Primary',
          secondary: 'Secondary',
          textPrimary: 'Text Primary',
          textSecondary: 'Text Secondary',
          error: 'Error'
        }
      },
      // defaultValue: 'primary',
      table: {
        defaultValue: {
          summary: 'primary'
        }
      }
    },
    underline: {
      name: 'Underline',
      control: {
        type: 'inline-radio'
      },
      defaultValue: 'none',
      table: {
        defaultValue: { summary: 'none' }
      }
    },
    noWrap: {
      name: 'No Wrap',
      control: {
        type: 'boolean'
      },
      defaultValue: false,
      table: {
        defaultValue: { summary: false }
      }
    },
    gutterBottom: {
      name: 'Gutter Bottom',
      control: {
        type: 'boolean'
      },
      defaultValue: false,
      table: {
        defaultValue: { summary: false }
      }
    },
    paragraph: { name: 'Paragraph' },
    variant: { name: 'Variant' },
    variantMapping: { name: 'Variant Mapping' },
    // variant: { name: 'Variant' },
    ref: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Link {...args} />;
export const Default = Template.bind({});
// Default.args = { ...mockContent };
