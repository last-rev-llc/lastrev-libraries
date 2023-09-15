import Accordion from './Accordion';
import { accordionBaseMock, accordionBlocksMock, accordionCardsMock, accordionQuotesMock } from './Accordion.mock';

export default {
  title: '3. Modules/Accordion',
  component: Accordion,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: {
      name: 'LayoutStyle',
      control: {
        type: 'select',
        options: ['onePerRow', 'twoPerRow', 'threePerRow', 'fourPerRow']
      }
    },
    background: { name: 'Background' }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = { args: { ...accordionBaseMock() } };
export const Blocks = { args: { ...accordionBlocksMock() } };
export const Cards = { args: { ...accordionCardsMock() } };
export const Quotes = { args: { ...accordionQuotesMock() } };
