import Card from './Card';

import { cardBaseMock } from './Card.mock';
import { CardVariants } from './Card.types';

export default {
  title: 'Components/Collection/Card',
  component: Card,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default']
      }
    }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = { args: { ...cardBaseMock() } };
export const Icon = { args: { ...cardBaseMock({ variant: CardVariants.icon }) } };
export const Logo = { args: { ...cardBaseMock({ variant: CardVariants.logo }) } };
export const Media = { args: { ...cardBaseMock({ variant: CardVariants.media }) } };
export const Pricing = { args: { ...cardBaseMock({ variant: CardVariants.pricing }) } };
export const Person = { args: { ...cardBaseMock({ variant: CardVariants.person }) } };
export const Blog = { args: { ...cardBaseMock({ variant: CardVariants.blog }) } };
