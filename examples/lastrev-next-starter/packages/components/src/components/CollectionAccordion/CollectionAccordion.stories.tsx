import React from 'react';
import Box from '@mui/material/Box';
import CollectionAccordion from './CollectionAccordion';
import mockContent from './CollectionAccordion.mock';

export default {
  title: '1. LR Components / CollectionAccordion',
  component: CollectionAccordion,
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: []
      }
    },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => (
  <CollectionAccordion theme={undefined} sidekickLookup={undefined} itemSpacing={undefined} {...args} />
);
export const Default = Template.bind({});
Default.args = { ...mockContent() };
