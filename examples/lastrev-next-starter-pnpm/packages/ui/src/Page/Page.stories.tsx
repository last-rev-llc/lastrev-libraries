import Page from './Page';
import { pageBaseMock } from './Page.mock';

export default {
  title: '4. Pages/Page General',
  component: Page,
  parameters: {
    layout: 'responsive'
  }
  // tags: ['autodocs']
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    ...pageBaseMock()
  }
};
