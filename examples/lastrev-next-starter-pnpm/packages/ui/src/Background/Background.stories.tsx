import Background from './Background';

import {
  backgroundBaseMock,
  backgroundMediaAboveMock,
  backgroundMediaBelowMock,
  backgroundMediaOnLeftFullBleedMock,
  backgroundMediaOnLeftMock,
  backgroundMediaOnRightFullBleedMock,
  backgroundMediaOnRightMock
} from './Background.mock';
import { BackgroundVariants } from './Background.types';

export default {
  title: 'Components/Background',
  component: Background,

  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: BackgroundVariants
      }
    }
  }
};
export const Default = { args: { ...backgroundBaseMock() } };
export const MediaOnRight = { args: { ...backgroundMediaOnRightMock() } };
export const MediaOnRightFullBleed = { args: { ...backgroundMediaOnRightFullBleedMock() } };
export const MediaOnLeft = { args: { ...backgroundMediaOnLeftMock() } };
export const MediaOnLeftFullBleed = { args: { ...backgroundMediaOnLeftFullBleedMock() } };
export const MediaBelow = { args: { ...backgroundMediaBelowMock() } };
export const MediaAbove = { args: { ...backgroundMediaAboveMock() } };
