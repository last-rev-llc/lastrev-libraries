import React from 'react';
import Box from '@material-ui/core/Box';
import Collection from './Collection';
import collectionMock from './Collection.mock';

export default {
  title: '1. Primitives / MUI / Collection',
  component: Collection,
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
        options: [
          'collection-three-per-row',
          'gradient-background',
          'tertiary-gradient-background'
        ]
      },
      // table: {
      //   defaultValue: { summary: 'standard' }
      // }
    },
    itemsVariant: {
      name: 'Items Variant',
      control: {
        type: 'select',
        options: ['standard', 'standard-round', 'media', 'avatar', 'avatar-large', 'square']
      },
      // table: {
      //   defaultValue: { summary: 'standard' }
      // }
    },
    // title: { name: 'Title' },
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Collection {...args} />;
export const Default = Template.bind({});
Default.args = { ...collectionMock };
