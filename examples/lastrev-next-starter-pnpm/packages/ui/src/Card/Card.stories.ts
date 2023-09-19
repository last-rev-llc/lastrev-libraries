import Card from './Card';

import {
  cardBaseMock,
  cardBlogMock,
  cardIconMock,
  cardLogoMock,
  cardMediaMock,
  cardPersonMock,
  cardPricingMock,
  cardQuoteMock
} from './Card.mock';

export default {
  title: '3. Modules/Card',
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

export const Icon = { args: { ...cardIconMock() } };
export const Logo = { args: { ...cardLogoMock() } };
export const Media = { args: { ...cardMediaMock() } };
export const Pricing = { args: { ...cardPricingMock() } };
export const Person = { args: { ...cardPersonMock() } };
export const Quote = { args: { ...cardQuoteMock() } };
export const Blog = { args: { ...cardBlogMock() } };
