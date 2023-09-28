import Header from './Header';

import { headerBaseMock, headerChildrenMock, headerChildrenNestedMock } from './Header.mock';

export default {
  title: '1. Global / Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    // TODO: Update
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
    ...headerBaseMock()
  }
};

export const MegaNavOne = {
  args: {
    ...headerChildrenMock()
  }
};

export const MegaNavTwo = {
  args: {
    ...headerChildrenNestedMock()
  }
};
