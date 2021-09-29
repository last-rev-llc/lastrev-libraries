import React from 'react';
import { Box } from '@mui/material';
import Hero, { HeroProps } from '@last-rev/component-library/dist/components/Hero/Hero';
import heroMock, { productMock, solutionMock, backgroundMock } from './Hero.mock';

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
        options: ['default', 'gradient-background']
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
    actions: { name: 'Actions' }
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
