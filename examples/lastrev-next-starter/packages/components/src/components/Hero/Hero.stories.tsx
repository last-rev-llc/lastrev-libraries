import React from 'react';
import { responsiveMediaMock } from '../Media/Media.mock';
import Hero from './Hero';
import heroMock from './Hero.mock';

export default {
  title: '1. LR Components / Hero',
  component: Hero,
  decorators: [(storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => storyFn()],
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

const Template = (args: JSX.IntrinsicAttributes) => <Hero id={''} __typename={''} theme={undefined} {...args} />;
export const Default = Template.bind({});
Default.args = { ...heroMock(), background: undefined };

export const BackgroundImage = Template.bind({});
BackgroundImage.args = {
  ...heroMock(),
  backgroundColor: null,
  contentHeight: 'xl',
  contentWidth: 'xl'
};

export const ResponsiveBackgroundImage = Template.bind({});
ResponsiveBackgroundImage.args = {
  ...heroMock,
  backgroundColor: null,
  contentHeight: 'xl',
  contentWidth: 'xl',
  background: responsiveMediaMock
};
