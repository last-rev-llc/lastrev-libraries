import React from 'react';
import Collection from './Collection';
import collectionMock from './Collection.mock';

export default {
  title: '1. LR Components / Collection',
  component: Collection,

  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: []
      },
      table: {
        defaultValue: { summary: '' }
      }
    },
    itemsVariant: {
      name: 'Items Variant',
      control: {
        type: 'select',
        options: []
      },
      table: {
        defaultValue: { summary: '' }
      }
    },
    items: { name: 'Items' },
    background: { name: 'Background' },
    contentWidth: { name: 'Content Width' },
    theme: { name: 'Theme' },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => (
  <Collection __typename="Collection" id="" theme={undefined} sidekickLookup={undefined} {...args} />
);
export const Default = Template.bind({});
Default.args = { ...collectionMock() };
