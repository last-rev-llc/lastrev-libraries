import React from 'react';
import Hero from './Hero';
import heroMock from './Hero.mock';

export default {
  title: '1. Primitives / MUI / Hero',
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
        options: ['none', 'black', 'white', 'primary', 'secondary', 'tertiary', 'quartiary', 'gradient-primary']
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

const Template = (args: JSX.IntrinsicAttributes) => <Hero {...args} />;
export const Default = Template.bind({});
Default.args = { ...heroMock };

export const BackgroundImage = Template.bind({});
BackgroundImage.args = {
  ...heroMock,
  backgroundColor: null,
  background: {
    __typename: 'Media',
    file: {
      url: 'https://i.picsum.photos/id/327/2800/800.jpg?hmac=lqhEpkLvfvBfoZSxszEf8pOTbitkmHpJmZsoQYcrWkI'
    },
    alt: 'Flowers'
  }
};
