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

export default {
  title: 'Components/Block',
  component: Block,
  tags: ['autodocs'],
  argTypes: {
    // TODO: Setup Block controls
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
