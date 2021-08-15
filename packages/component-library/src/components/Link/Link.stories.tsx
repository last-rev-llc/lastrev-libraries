import React from 'react';
import Box from '@material-ui/core/Box';
import Link from './Link';
import mockContent from './Link.mock';

export default {
  title: '1. Primitives / MUI / Link',
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
        options: ['link', 'button-contained', 'button-outlined', 'button-text']
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
        options: ['Instagram', 'Facebook', 'Twitter', 'YouTube']
      },
      table: {
        defaultValue: { summary: 'Instagram' }
      }
    },
    bgcolor: {
      name: 'Background Color',
      control: {
        type: 'select',
        options: ['yellow', 'orange', 'green']
      },
      table: {
        defaultValue: { summary: 'yellow' }
      }
    }
    // variantMapping: { name: 'Variant Mapping' },
    // ref: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Link {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
