import React from 'react';
import { responsivemediaBaseImageMock } from '../Media/Media.mock';
import Hero from './Hero';
import { heroBaseMock } from './Hero.mock';

//TODO: Cleanup
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

const Template = (args: JSX.IntrinsicAttributes) => <Hero id={''} __typename={''} theme={undefined} {...args} />;
export const Default = Template.bind({});
Default.args = { ...heroBaseMock(), background: undefined };

export const BackgroundImage = Template.bind({});
BackgroundImage.args = {
  ...heroBaseMock(),
  backgroundColor: null,
  contentHeight: 'xl',
  contentWidth: 'xl'
};

export const ResponsiveBackgroundImage = Template.bind({});
ResponsiveBackgroundImage.args = {
  ...heroBaseMock,
  backgroundColor: null,
  contentHeight: 'xl',
  contentWidth: 'xl',
  background: responsivemediaBaseImageMock
};
