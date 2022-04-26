import React from 'react';
import Box from '@mui/material/Box';
import Collection, { CollectionProps } from '@last-rev/component-library/dist/components/Collection';
import {
  mediumIconCenterCollectionMock,
  logosMock,
  smallIconLeftCardsMock,
  insightCardsMock,
  fourPerRowMock,
  fourPerRowLinksListMock
} from './Collection.mock';

const itemVariantProps = {
  'medium-icon-center': {
    bgcolor: '#262730',
    m: 2
  },
  'small-icon-left': {
    bgcolor: '#FFFFFF',
    m: 2
  },
  'media': {
    bgcolor: '#262730',
    m: 2
  }
};

export default {
  title: 'Modules / Collection',
  component: Collection,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal, ctx: any) => (
      <Box {...itemVariantProps[ctx?.args?.variant]}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: [
          'collection-one-per-row',
          'collection-two-per-row',
          'collection-three-per-row',
          'four-per-row',
          'collection-tiles',
          'collection-three-per-row-rounded-wrapper'
        ]
      },
      table: {
        defaultValue: { summary: 'collection-three-per-row' }
      }
    },
    itemsVariant: {
      name: 'Items Variant',
      control: {
        type: 'select',
        options: [
          'default',
          'links list',
          'standard',
          'standard-round',
          'media',
          'profile-column',
          'profile-row',
          'profile-image',
          'square',
          'standard-blog'
        ]
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

const Template = (args: CollectionProps) => <Collection {...args} />;

export const MediumIconCenter = Template.bind({});
MediumIconCenter.args = { ...mediumIconCenterCollectionMock };

export const Logos = Template.bind({});
Logos.args = { ...logosMock };

export const SmallIconLeftCards = Template.bind({});
SmallIconLeftCards.args = { ...smallIconLeftCardsMock };

export const InsightCards = Template.bind({});
InsightCards.args = { ...insightCardsMock };

export const fourPerRowCollection = Template.bind({});
fourPerRowCollection.args = { ...fourPerRowMock };

export const fourPerRowLinksListCollection = Template.bind({});
fourPerRowLinksListCollection.args = { ...fourPerRowLinksListMock };
