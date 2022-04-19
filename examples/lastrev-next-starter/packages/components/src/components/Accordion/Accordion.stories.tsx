import React from 'react';
import Box from '@mui/material/Box';
import Accordion from './Accordion';
import mockContent from './Accordion.mock';

export default {
  title: '1. LR Components / Accordion',
  component: Accordion,

  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: []
      }
    },
    title: { name: 'Title' },
    body: { name: 'Body' },
    __typename: { table: { disable: true } },
    ref: { table: { disable: true } },
    internalTitle: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => (
  <Accordion __typename={''} internalTitle={''} sidekickLookup={undefined} children={''} {...args} />
);
export const Default = Template.bind({});
Default.args = { ...mockContent };
