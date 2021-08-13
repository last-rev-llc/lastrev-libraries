import React from 'react';
import Box from '@material-ui/core/Box';
import Collection from './Collection';
import collectionMock from './Collection.mock';

export default {
  title: '1. Primitives / MUI / Collection',
  component: Collection,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={2}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['collection-one-per-row', 'collection-two-per-row', 'collection-three-per-row', 'collection-tiles']
      },
      table: {
        defaultValue: { summary: 'collection-three-per-row' }
      }
    },
    itemsVariant: {
      name: 'Items Variant',
      control: {
        type: 'select',
        options: ['standard', 'standard-round', 'media', 'avatar', 'avatar-large', 'square', 'standard-blog']
      },
      table: {
        defaultValue: { summary: 'standard' }
      }
    },
    items: { name: 'Items' },
    background: { name: 'Background' },
    contentWidth: { name: 'Content Width' },
    theme: { name: 'Theme' }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Collection {...args} />;
export const Default = Template.bind({});
Default.args = { ...collectionMock };
