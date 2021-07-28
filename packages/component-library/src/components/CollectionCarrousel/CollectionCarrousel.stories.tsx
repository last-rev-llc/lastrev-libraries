import React from 'react';
import Box from '@material-ui/core/Box';
import CollectionCarrousel from './CollectionCarrousel';
import CollectionCarrouselMock from './CollectionCarrousel.mock';

export default {
  title: '1. Primitives / MUI / CollectionCarrousel',
  component: CollectionCarrousel,
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
          'CollectionCarrousel-large',
        ]
      },
      table: {
        defaultValue: { summary: 'CollectionCarrousel-large' }
      }
    },
    itemsVariant: {
      name: 'Items Variant',
      control: {
        type: 'select',
        options: ['standard', 'standard-round', 'media', 'avatar', 'avatar-large', 'square']
      },
      table: {
        defaultValue: { summary: 'standard' }
      }
    },
    items: { name: 'Items' },
    background: { name: 'Background' },
    contentWidth: { name: 'Content Width' },
    theme: { name: 'Theme' },
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <CollectionCarrousel theme {...args} />;
export const Default = Template.bind({});
Default.args = { ...CollectionCarrouselMock };
