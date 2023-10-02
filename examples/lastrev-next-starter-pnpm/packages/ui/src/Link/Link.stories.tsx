import React from 'react';
import LinkComponent from './Link';
import { linkTextMock } from './Link.mock';

export default {
  title: 'Elements/Link',
  component: LinkComponent,
  tags: ['autodocs'],
  argTypes: {
    sx: { table: { disable: true } },
    noLinkStyle: { table: { disable: true } },
    activeClassName: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } },
    variant: {
      name: 'Variant',
      control: {
        // type: { type: 'select' },
      },
      options: ['link', 'button-contained', 'button-outlined', 'button-text', '']
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

export const Link = { args: { ...linkTextMock() } };
export const ButtonContained = { args: { ...Link.args, variant: 'button-contained' } };
export const ButtonOutlined = { args: { ...Link.args, variant: 'button-outlined' } };
export const ButtonText = { args: { ...Link.args, variant: 'button-text' } };
