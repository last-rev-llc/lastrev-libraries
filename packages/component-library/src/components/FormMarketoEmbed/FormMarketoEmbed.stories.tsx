import React from 'react';
import { Box } from '@mui/material';
import FormMarketoEmbed from './FormMarketoEmbed';
import { FormMarketoEmbedProps } from './FormMarketoEmbed.types';
import formMarketoEmbedMock from './FormMarketoEmbed.mock';

export default {
  title: '1. Components / FormMarketoEmbed',
  component: FormMarketoEmbed,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box p={2} bgcolor="secondary.main">
        {storyFn()}
      </Box>
    )
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
Default.args = { ...formMarketoEmbedMock };
