import React from 'react';
import Box from '@mui/material/Box';
import MailchimpForm from './MailchimpForm';
import mailchimpFormMock from './MailchimpForm.mock';

export default {
  title: '1. Primitives / MUI / MailchimpForm',
  component: MailchimpForm,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => <Box>{storyFn()}</Box>
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'inline-radio',
        options: ['default', 'gradient-background']
      },
      table: {
        defaultValue: { summary: 'standard' }
      }
    },
    title: { name: 'Title' },
    subtitle: { name: 'Subtitle' },
    body: { name: 'Body' },
    image: { name: 'Image' },
    actions: { name: 'Actions' }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <MailchimpForm theme sidekickLookup {...args} />;
export const Default = Template.bind({});
Default.args = { ...mailchimpFormMock() };
