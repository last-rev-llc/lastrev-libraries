import Tabs from './Tabs';
import { tabsBaseMock, tabsBlocksMock, tabsCollectionMock, tabsQuotesMock } from './Tabs.mock';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {}
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = { args: { ...tabsBaseMock() } };
export const Blocks = { args: { ...tabsBlocksMock() } };
export const Collections = { args: { ...tabsCollectionMock() } };
export const Quotes = { args: { ...tabsQuotesMock() } };
