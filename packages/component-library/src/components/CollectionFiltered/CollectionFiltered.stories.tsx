import React from 'react';
import Box from '@material-ui/core/Box';
import CollectionFiltered from './CollectionFiltered';
import CollectionFilteredMock from './CollectionFiltered.mock';

export default {
  title: '1. Primitives / MUI / CollectionFiltered',
  component: CollectionFiltered,
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
        options: ['carousel-large']
      },
      table: {
        defaultValue: { summary: 'carousel-large' }
      }
    },
    itemsVariant: {
      name: 'Items Variant',
      control: {
        type: 'select',
        options: [
          'standard',
          'standard-round',
          'media',
          'media-and-text',
          'profile-column',
          'profile-row',
          'profile-image',
          'square'
        ]
      },
      table: {
        defaultValue: { summary: 'media-and-text' }
      }
    },
    items: { name: 'Items' },
    background: { name: 'Background' },
    contentWidth: { name: 'Content Width' },
    theme: { name: 'Theme' }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <CollectionFiltered theme {...args} />;
export const Default = Template.bind({});
Default.args = { ...CollectionFilteredMock };
