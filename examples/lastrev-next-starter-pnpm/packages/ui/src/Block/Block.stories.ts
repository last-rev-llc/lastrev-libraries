import Block from './Block';

import { blockBaseMock } from './Block.mock';

export default {
  title: '3. Modules/Block',
  component: Block,
  tags: ['autodocs'],
  argTypes: {
    // Props should follow this schema: https://storybook.js.org/docs/react/writing-stories/args#args-schema
    // More info on args: https://storybook.js.org/docs/react/writing-stories/args
    // More info on control types: https://storybook.js.org/docs/react/essentials/controls#annotation
    variant: {
      control: {
        type: 'select',
        options: ['default']
      }
    }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = { args: { ...blockBaseMock() } };
export const ContentOnRight = { args: { ...blockBaseMock({ variant: 'mediaAbove' }) } };
export const ContentOnRightFullBleed = { args: { ...blockBaseMock({ variant: 'contentOnRightFullBleed' }) } };
export const ContentOnLeft = { args: { ...blockBaseMock({ variant: 'contentOnLeft' }) } };
export const ContentOnLeftFullBleed = { args: { ...blockBaseMock({ variant: 'contentOnLeftFullBleed' }) } };
export const ContentBelow = { args: { ...blockBaseMock({ variant: 'contentBelow' }) } };
export const ContentAbove = { args: { ...blockBaseMock({ variant: 'contentAbove' }) } };
