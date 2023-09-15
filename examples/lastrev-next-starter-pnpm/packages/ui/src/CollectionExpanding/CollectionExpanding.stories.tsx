import CollectionExpanding from './CollectionExpanding';
import {
  collectionExpandingBaseMock,
  collectionExpandingBlocksMock,
  collectionExpandingCardsMock,
  collectionExpandingQuotesMock
} from './CollectionExpanding.mock';

export default {
  title: '3. Modules/Collection Expanding',
  component: CollectionExpanding,
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
export const Default = { args: { ...collectionExpandingBaseMock() } };
export const Blocks = { args: { ...collectionExpandingBlocksMock() } };
export const Cards = { args: { ...collectionExpandingCardsMock() } };
export const Quotes = { args: { ...collectionExpandingQuotesMock() } };
