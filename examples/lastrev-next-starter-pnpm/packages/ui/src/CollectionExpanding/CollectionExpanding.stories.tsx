import React from 'react';
import CollectionExpanding from './CollectionExpanding';
import { CollectionExpandingBaseMock } from './CollectionExpanding.mock';

export default {
  title: '3. Modules/CollectionExpanding',
  component: CollectionExpanding,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],

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

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    ...CollectionExpandingBaseMock()
  }
};
