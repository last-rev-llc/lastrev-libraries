import { linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';
import { introTextMock } from '../Text/Text.mock';

import randomId from '../utils/randomId';

import type { BlockProps } from './Block.types';

const blockDefaultMock = (override?: Partial<BlockProps>): BlockProps => {
  const baseMock: BlockProps = {
    id: randomId(),
    __typename: 'Block',
    backgroundColor: 'background',
    variant: 'default',
    introText: introTextMock(),
    overline: 'This is the Block overline',
    title: 'This is the Block title',
    subtitle: 'This is the Block subtitle',
    body: richTextMock({ text: 'This is the Block body' }),
    mediaItems: [mediaBaseImageMock({ title: 'This is the Block Media 1' })],
    actions: [
      linkButtonMock({ text: 'This is the Block Action 1', variant: 'button-contained' }),
      linkButtonMock({ text: 'This is the Block Action 2', variant: 'button-outlined' })
    ],
    link: linkButtonMock({ text: 'This is the Block Link', variant: 'button-contained' })
  };

  let variantOverride;
  switch (override?.variant) {
    default:
      variantOverride = {};
  }

  return { ...baseMock, ...variantOverride, ...override };
};

export const blockBaseMock = (override?: Partial<BlockProps>): BlockProps => {
  return { ...blockDefaultMock(override) };
};

export const blockContentOnRightMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content on Right" variant',
    variant: 'contentOnRight'
  };
};

export const blockContentOnRightFullBleedMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content on Right Full Bleed" variant',
    variant: 'contentOnRightFullBleed'
  };
};

export const blockContentOnLeftMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content on Left" variant',
    variant: 'contentOnLeft'
  };
};

export const blockContentOnLeftFullBleedMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content on Left Full Bleed" variant',
    variant: 'contentOnLeftFullBleed'
  };
};

export const blockContentBelowMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content Below" variant',
    variant: 'contentBelow'
  };
};

export const blockContentAboveMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content Above" variant',
    variant: 'contentAbove'
  };
};

export default blockBaseMock;
