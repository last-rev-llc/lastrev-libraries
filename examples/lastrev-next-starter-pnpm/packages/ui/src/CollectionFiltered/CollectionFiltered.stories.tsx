import React from 'react';
import Box from '@mui/material/Box';
import CollectionFiltered from './CollectionFiltered';
import mockContent from './CollectionFiltered.mock';

export default {
  title: '1. Components / CollectionFiltered',
  component: CollectionFiltered,

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
  <CollectionFiltered theme={undefined} sidekickLookup={undefined} itemSpacing={undefined} {...args} />
);
export const Default = Template.bind({});
Default.args = { ...mockContent() };
