import Page from './Page';
import mockContent from './Page.mock';

export default {
  title: '4. Pages/Page General',
  component: Page,
  parameters: {
    layout: 'responsive'
  }
  // tags: ['autodocs']
};

export const Default = {
  args: {
    ...mockContent()
  }
};
