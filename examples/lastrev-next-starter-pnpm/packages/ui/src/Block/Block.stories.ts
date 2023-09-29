import Block from './Block';

import {
  blockBaseMock,
  blockContentAboveMock,
  blockContentBelowMock,
  blockContentOnLeftFullBleedMock,
  blockContentOnLeftMock,
  blockContentOnRightFullBleedMock,
  blockContentOnRightMock
} from './Block.mock';

import { BlockVariants } from './Block.types';

export default {
  title: '3. Modules/Block',
  component: Block,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: BlockVariants
      }
    }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = { args: { ...blockBaseMock() } };
export const ContentOnRight = { args: { ...blockContentOnRightMock() } };
export const ContentOnRightFullBleed = { args: { ...blockContentOnRightFullBleedMock() } };
export const ContentOnLeft = { args: { ...blockContentOnLeftMock() } };
export const ContentOnLeftFullBleed = { args: { ...blockContentOnLeftFullBleedMock() } };
export const ContentBelow = { args: { ...blockContentBelowMock() } };
export const ContentAbove = { args: { ...blockContentAboveMock() } };
