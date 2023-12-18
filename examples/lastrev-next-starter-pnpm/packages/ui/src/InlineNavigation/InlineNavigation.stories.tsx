import React from 'react';
import InlineNavigationComponent from './InlineNavigation';
import { inlinenavigationTextMock } from './InlineNavigation.mock';

export default {
  title: 'Elements/InlineNavigation',
  component: InlineNavigationComponent,
  tags: ['autodocs'],
  argTypes: {
    sx: { table: { disable: true } },
    noInlineNavigationStyle: { table: { disable: true } },
    activeClassName: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } },
    variant: {
      name: 'Variant',
      control: {
        // type: { type: 'select' },
      },
      options: ['inlinenavigation', 'buttonContained', 'buttonOutlined', 'button-text', '']
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'select',
        options: ['instagram', 'facebook', 'twitter', 'youtube', 'chevron-right', 'caret-right', null]
      },
      table: {
        defaultValue: { summary: '' }
      }
    },
    iconPosition: {
      name: 'Icon Position',
      control: {
        type: 'inline-radio',
        options: ['Left', 'Right']
      },
      table: {
        defaultValue: { summary: 'Right' }
      }
    },
    onClick: { table: { disable: true } },
    id: { table: { disable: true } },
    __typename: { table: { disable: true } }
  }
};

export const InlineNavigation = { args: { ...inlinenavigationTextMock() } };
export const ButtonContained = { args: { ...InlineNavigation.args, variant: 'buttonContained' } };
export const ButtonOutlined = { args: { ...InlineNavigation.args, variant: 'buttonOutlined' } };
export const ButtonText = { args: { ...InlineNavigation.args, variant: 'button-text' } };
