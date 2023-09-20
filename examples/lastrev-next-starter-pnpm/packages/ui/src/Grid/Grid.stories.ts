import Grid from './Grid';

import { GridVariants } from './Grid.types';

import { gridBaseMock } from './Grid.mock';

export default {
  title: '3. Modules/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    // Props should follow this schema: https://storybook.js.org/docs/react/writing-stories/args#args-schema
    // More info on args: https://storybook.js.org/docs/react/writing-stories/args
    // More info on control types: https://storybook.js.org/docs/react/essentials/controls#annotation
    variant: {
      control: {
        type: 'select',
        options: GridVariants
      }
    }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = { args: { ...gridBaseMock() } };
export const ContentOnRight = { args: { ...gridBaseMock({ variant: 'mediaAbove' }) } };
export const ContentOnRightFullBleed = { args: { ...gridBaseMock({ variant: 'contentOnRightFullBleed' }) } };
export const ContentOnLeft = { args: { ...gridBaseMock({ variant: 'contentOnLeft' }) } };
export const ContentOnLeftFullBleed = { args: { ...gridBaseMock({ variant: 'contentOnLeftFullBleed' }) } };
export const ContentBelow = { args: { ...gridBaseMock({ variant: 'contentBelow' }) } };
export const ContentAbove = { args: { ...gridBaseMock({ variant: 'contentAbove' }) } };
