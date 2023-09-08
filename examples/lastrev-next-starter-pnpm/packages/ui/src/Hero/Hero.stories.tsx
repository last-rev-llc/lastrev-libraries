import React from 'react';
import { responsiveMediaMock } from '../Media/Media.mock';
import Hero from './Hero';
import heroMock from './Hero.mock';

export default {
  title: '3. Modules/Hero',
  component: Hero,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'inline-radio',
        options: ['default', 'centered']
      },
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    title: { name: 'Title' },
    subtitle: { name: 'Subtitle' },
    body: { name: 'Body' },
    image: { name: 'Image' },
    background: { name: 'Background' },
    backgroundColor: {
      name: 'Background Color',
      control: {
        type: 'inline-radio',
        options: ['none', 'black', 'white', 'primary', 'secondary']
      },
      table: {
        defaultValue: { summary: 'none' }
      }
    },
    contentHeight: {
      name: 'Content Height',
      control: {
        type: 'inline-radio',
        options: ['sm', 'md', 'lg', 'xl']
      },
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    contentWidth: {
      name: 'Content Width',
      control: {
        type: 'inline-radio',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      },
      table: {
        defaultValue: { summary: 'xl' }
      }
    },
    actions: { name: 'Actions' },
    __typename: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

export const Default = {
  args: { ...heroMock(), background: undefined }
};

export const BackgroundImage = {
  args: {
    ...heroMock(),
    backgroundColor: null,
    contentHeight: 'xl',
    contentWidth: 'xl'
  }
};

export const ResponsiveBackgroundImage = {
  args: {
    ...heroMock,
    backgroundColor: null,
    contentHeight: 'xl',
    contentWidth: 'xl',
    background: responsiveMediaMock
  }
};
