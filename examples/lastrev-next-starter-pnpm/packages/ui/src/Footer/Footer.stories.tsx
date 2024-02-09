import Footer from './Footer';

import { footerBaseMock, footerChildrenNestedMock } from './Footer.mock';
export default {
  title: 'Global/Footer',
  component: Footer,
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
export const Default = {
  args: {
    ...footerBaseMock()
  }
};

export const BasicNavigation = {
  args: {
    ...footerChildrenNestedMock()
  }
};

export const NestedNavigation = {
  args: {
    ...footerChildrenNestedMock()
  }
};
