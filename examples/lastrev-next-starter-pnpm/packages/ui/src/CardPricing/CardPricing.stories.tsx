import CardPricing from './CardPricing';

import { cardBaseMock } from './CardPricing.mock';
import { CardPricingVariants } from './CardPricing.types';

export default {
  title: 'Components/Collection/CardPricing',
  component: CardPricing,

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
export const Icon = { args: { ...cardBaseMock({ variant: CardPricingVariants.icon }) } };
export const Logo = { args: { ...cardBaseMock({ variant: CardPricingVariants.logo }) } };
export const Media = { args: { ...cardBaseMock({ variant: CardPricingVariants.media }) } };
export const Pricing = { args: { ...cardBaseMock({ variant: CardPricingVariants.pricing }) } };
export const Person = { args: { ...cardBaseMock({ variant: CardPricingVariants.person }) } };
export const Quote = { args: { ...cardBaseMock({ variant: CardPricingVariants.quote }) } };
export const Blog = { args: { ...cardBaseMock({ variant: CardPricingVariants.blog }) } };
