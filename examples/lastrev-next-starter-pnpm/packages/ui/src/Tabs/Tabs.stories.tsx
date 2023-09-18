import Tabs from './Tabs';
import { TabsBaseMock, TabsBlocksMock, TabsCardsMock, TabsQuotesMock } from './Tabs.mock';

export default {
  title: '3. Modules/Collection Expanding',
  component: Tabs,
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
export const Default = { args: { ...TabsBaseMock() } };
export const Blocks = { args: { ...TabsBlocksMock() } };
export const Cards = { args: { ...TabsCardsMock() } };
export const Quotes = { args: { ...TabsQuotesMock() } };
