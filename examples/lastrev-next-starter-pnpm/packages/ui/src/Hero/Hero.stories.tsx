import Hero from './Hero';

import {
  heroBaseMock,
  heroMediaAboveMock,
  heroMediaBelowMock,
  heroMediaOnLeftFullBleedMock,
  heroMediaOnLeftMock,
  heroMediaOnRightFullBleedMock,
  heroMediaOnRightMock
} from './Hero.mock';
import { HeroVariants } from './Hero.types';

export default {
  title: 'Components/Hero',
  component: Hero,

  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: HeroVariants
      }
    }
  }
};
export const Default = { args: { ...heroBaseMock() } };
export const MediaOnRight = { args: { ...heroMediaOnRightMock() } };
export const MediaOnRightFullBleed = { args: { ...heroMediaOnRightFullBleedMock() } };
export const MediaOnLeft = { args: { ...heroMediaOnLeftMock() } };
export const MediaOnLeftFullBleed = { args: { ...heroMediaOnLeftFullBleedMock() } };
export const MediaBelow = { args: { ...heroMediaBelowMock() } };
export const MediaAbove = { args: { ...heroMediaAboveMock() } };
