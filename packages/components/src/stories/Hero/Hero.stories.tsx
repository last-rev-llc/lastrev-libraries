import React from 'react';
import Box from '@mui/material/Box';
import Hero, { HeroProps } from '@last-rev/component-library/dist/components/Hero';
import { defaultHeroMock, alignLeftMock, alignCenterMock, heightShortMock, heightMediumMock } from './Hero.mock';

export default {
  title: 'Modules / Hero',
  component: Hero,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => <Box>{storyFn()}</Box>
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'inline-radio',
        options: ['Align - Left', 'Align - Center']
      },
      table: {
        defaultValue: { summary: 'Align - Left' }
      }
    },
    contentHeight: {
      name: 'Content Height',
      control: {
        type: 'inline-radio',
        options: { Small: 'sm', Medium: 'md', Large: 'lg' }
      },
      table: {
        defaultValue: { summary: 'lg' }
      }
    },
    title: { name: 'Title' },
    subtitle: { name: 'Subtitle' },
    body: { name: 'Body' },
    image: { name: 'Image' },
    background: { name: 'Background' },
    backgroundColor: { name: 'Background Color' },
    actions: { name: 'Actions' },
    contentWidth: { name: 'Content Width' },
    id: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } },
    internalTitle: { table: { disable: true } },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: HeroProps) => <Hero {...args} />;

export const Default = Template.bind({});
Default.args = { ...defaultHeroMock };

export const AlignLeft = Template.bind({});
AlignLeft.args = { ...alignLeftMock };

export const AlignCenter = Template.bind({});
AlignCenter.args = { ...alignCenterMock };

export const HeightMedium = Template.bind({});
HeightMedium.args = { ...heightMediumMock };

export const HeightShort = Template.bind({});
HeightShort.args = { ...heightShortMock };
