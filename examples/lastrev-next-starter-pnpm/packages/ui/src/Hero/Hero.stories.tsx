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

export default {
  title: '3. Modules/Hero',
  component: Hero,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    // variant: {
    //   name: 'Variant',
    //   control: {
    //     type: 'inline-radio',
    //     options: ['default', 'centered']
    //   },
    //   table: {
    //     defaultValue: { summary: 'default' }
    //   }
    // },
    // title: { name: 'Title' },
    // subtitle: { name: 'Subtitle' },
    // body: { name: 'Body' },
    // image: { name: 'Image' },
    // background: { name: 'Background' },
    // backgroundColor: {
    //   name: 'Background Color',
    //   control: {
    //     type: 'inline-radio',
    //     options: ['none', 'black', 'white', 'primary', 'secondary']
    //   },
    //   table: {
    //     defaultValue: { summary: 'none' }
    //   }
    // },
    // contentHeight: {
    //   name: 'Content Height',
    //   control: {
    //     type: 'inline-radio',
    //     options: ['sm', 'md', 'lg', 'xl']
    //   },
    //   table: {
    //     defaultValue: { summary: 'md' }
    //   }
    // },
    // contentWidth: {
    //   name: 'Content Width',
    //   control: {
    //     type: 'inline-radio',
    //     options: ['xs', 'sm', 'md', 'lg', 'xl']
    //   },
    //   table: {
    //     defaultValue: { summary: 'xl' }
    //   }
    // },
    // actions: { name: 'Actions' },
    __typename: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};
export const Default = { args: { ...heroBaseMock() } };
export const MediaOnRight = { args: { ...heroMediaOnRightMock() } };
export const MediaOnRightFullBleed = { args: { ...heroMediaOnRightFullBleedMock() } };
export const MediaOnLeft = { args: { ...heroMediaOnLeftMock() } };
export const MediaOnLeftFullBleed = { args: { ...heroMediaOnLeftFullBleedMock() } };
export const MediaBelow = { args: { ...heroMediaBelowMock() } };
export const MediaAbove = { args: { ...heroMediaAboveMock() } };
export const MediaAboveTwo = { args: { ...heroMediaAboveMock() } };
