import Block from './Block';

import {
  blockBaseMock,
  blockAboveMock,
  blockBelowMock,
  blockOnLeftFullBleedMock,
  blockOnLeftMock,
  blockOnRightFullBleedMock,
  blockOnRightMock
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
export const ContentOnRight = { args: { ...blockOnRightMock() } };
export const ContentOnRightFullBleed = { args: { ...blockOnRightFullBleedMock() } };
export const ContentOnLeft = { args: { ...blockOnLeftMock() } };
export const ContentOnLeftFullBleed = { args: { ...blockOnLeftFullBleedMock() } };
export const ContentBelow = { args: { ...blockBelowMock() } };
export const ContentAbove = { args: { ...blockAboveMock() } };
