import React from 'react';
import Box from '@mui/material/Box';
import NavigationItem from './NavigationItem';
import mockContent from './NavigationItem.mock';

export default {
  title: '1. LR Components / NavigationItem',
  component: NavigationItem,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['NavigationItem', 'button-contained', 'button-outlined', 'button-text']
      },
      table: {
        defaultValue: { summary: 'NavigationItem' }
      }
    },
    text: { name: 'Text' },
    href: { name: 'Href' },
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

const Template = (args: JSX.IntrinsicAttributes) => <NavigationItem __typename="NavigationItem" {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent() };
