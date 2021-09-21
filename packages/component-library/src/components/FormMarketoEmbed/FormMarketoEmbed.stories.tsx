import React from 'react';
import Box from '@material-ui/core/Box';
import FormMarketoEmbed, { FormMarketoEmbedProps } from './FormMarketoEmbed';
// import mailchimpFormMock from './MailchimpForm.mock';

export default {
  title: '2. Modules / FormMarketoEmbed',
  component: FormMarketoEmbed,
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

const Template = (args: FormMarketoEmbedProps) => <FormMarketoEmbed {...args} />;
export const Default = Template.bind({});
Default.args = {};
