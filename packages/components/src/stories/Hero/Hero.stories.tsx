import React from 'react';
import Box from '@mui/material/Box';
import Hero, { HeroProps } from '@last-rev/component-library/dist/components/Hero/Hero';
import heroMock, { productMock, solutionMock, backgroundMock, heightMediumMock, heightShortMock } from './Hero.mock';

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
        options: ['default', 'gradient-background', 'Height - Short']
      },
      table: {
        defaultValue: { summary: 'standard' }
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
    contentHeight: { name: 'Content Height' },
    id: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } },
    internalTitle: { table: { disable: true } },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: HeroProps) => <Hero {...args} />;

export const Default = Template.bind({});
Default.args = { ...heroMock };

export const Product = Template.bind({});
Product.args = { ...productMock };

export const Solution = Template.bind({});
Solution.args = { ...solutionMock };

export const BackgroundOnly = Template.bind({});
BackgroundOnly.args = { ...backgroundMock };

export const HeightMedium = Template.bind({});
HeightMedium.args = { ...heightMediumMock };

export const HeightShort = Template.bind({});
HeightShort.args = { ...heightShortMock };
