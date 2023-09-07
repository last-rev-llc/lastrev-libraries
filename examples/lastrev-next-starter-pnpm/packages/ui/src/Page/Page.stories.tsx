import React from 'react';
import Box from '@mui/material/Box';
import Page from './Page';
import mockContent from './Page.mock';

export default {
  title: '4. Pages/Page General',
  component: Page,
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
        options: ['Page', 'button-contained', 'button-outlined', 'button-text']
      },
      table: {
        defaultValue: { summary: 'Page' }
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

const Template = (args: JSX.IntrinsicAttributes) => <Page __typename="Page" {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent() };
