import React from 'react';
import Box from '@mui/material/Box';
import NavigationBar from './NavigationBar';
import NavigationBarMock, { mockWithNavigationItems } from './NavigationBar.mock';

export default {
  title: '1. LR Components / NavigationBar',
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
        options: ['standard', 'standard-round', 'media', 'profile-column', 'profile-row', 'profile-image', 'square']
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

const Template = (args: JSX.IntrinsicAttributes) => <NavigationBar theme={{}} sidekickLookup="" {...args} />;
export const Default = Template.bind({});
Default.args = { ...NavigationBarMock() };

export const WithNavigationItems = Template.bind({});
WithNavigationItems.args = { ...mockWithNavigationItems() };
