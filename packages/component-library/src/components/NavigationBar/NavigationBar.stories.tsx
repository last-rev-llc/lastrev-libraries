import React from 'react';
import Box from '@material-ui/core/Box';
import NavigationBar from './NavigationBar';
import NavigationBarMock from './NavigationBar.mock';

export default {
  title: '1. Primitives / MUI / NavigationBar',
  component: NavigationBar,
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
          'NavigationBar-one-per-row',
          'NavigationBar-two-per-row',
          'NavigationBar-three-per-row',
          'NavigationBar-tiles'
        ]
      },
      table: {
        defaultValue: { summary: 'NavigationBar-three-per-row' }
      }
    },
    itemsVariant: {
      name: 'Items Variant',
      control: {
        type: 'select',
        options: ['standard', 'standard-round', 'media', 'profile', 'profile-large', 'square']
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

const Template = (args: JSX.IntrinsicAttributes) => <NavigationBar {...args} />;
export const Default = Template.bind({});
Default.args = { ...NavigationBarMock };
