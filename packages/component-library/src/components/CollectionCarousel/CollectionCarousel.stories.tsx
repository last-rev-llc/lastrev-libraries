import React from 'react';
import Box from '@mui/material/Box';
import CollectionCarousel from './CollectionCarousel';
import CollectionCarouselMock, { smallCarouselMock } from './CollectionCarousel.mock';

export default {
  title: 'Components / CollectionCarousel',
  component: CollectionCarousel,
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
        options: ['carousel-large', 'carousel-small']
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
          'media-hover',
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

const TemplateLarge = (args: JSX.IntrinsicAttributes) => (
  <CollectionCarousel theme variant={undefined} sidekickLookup={undefined} {...args} />
);
export const Default = TemplateLarge.bind({});
Default.args = { ...CollectionCarouselMock() };

const TemplateSmall = (args: JSX.IntrinsicAttributes) => (
  <CollectionCarousel theme variant={undefined} sidekickLookup={undefined} {...args} />
);
export const DefaultSmall = TemplateSmall.bind({});
DefaultSmall.args = { ...smallCarouselMock() };
