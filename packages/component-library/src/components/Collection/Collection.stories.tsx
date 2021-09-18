import React from 'react';
import Box from '@material-ui/core/Box';
import Collection from './Collection';
import collectionMock, { collectionWithIntroText } from './Collection.mock';

export default {
  title: '1. Primitives / MUI / Collection',
  component: Collection,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box mx={2}>{storyFn()}</Box>
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
          'three-per-row',
          'collection-tiles',
          'three-per-row-rounded-wrapper'
        ]
      },
      table: {
        defaultValue: { summary: 'three-per-row' }
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
    theme: { name: 'Theme' },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => (
  <Collection id={''} theme={undefined} sidekickLookup={undefined} {...args} />
);
export const Default = Template.bind({});
Default.args = { ...collectionMock };

export const WithIntroTExt = Template.bind({});
WithIntroTExt.args = {
  ...collectionWithIntroText
};
