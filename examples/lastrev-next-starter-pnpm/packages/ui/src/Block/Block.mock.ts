import { linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextBlockMock } from '../RichText/RichText.mock';
import { introTextMock } from '../Text/Text.mock';

import { randomId } from '../utils/randomId';

import { type BlockProps, BlockVariants } from './Block.types';

const blockDefaultMock = (override?: Partial<BlockProps>): BlockProps => {
  const baseMock: BlockProps = {
    id: randomId(),
    __typename: 'Block',
    variant: BlockVariants.default,
    introText: introTextMock(),
    overline: 'This is the Block overline',
    title: 'This is the Block title',
    subtitle: 'This is the Block subtitle',
    body: richTextBlockMock(),
    mediaItems: [mediaBaseImageMock({ title: 'This is the Block Media 1' })],
    actions: [
      linkButtonMock({ text: 'This is the Block Action 1', variant: 'buttonContained' }),
      linkButtonMock({ text: 'This is the Block Action 2', variant: 'buttonOutlined' })
    ],
    link: linkButtonMock({ text: 'This is the Block Link', variant: 'buttonContained' })
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

export const blockOnRightMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content on Right" variant',
    variant: BlockVariants.contentOnRight
  };
};

export const blockOnRightFullBleedMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content on Right Full Bleed" variant',
    variant: BlockVariants.contentOnRightFullBleed
  };
};

export const blockOnLeftMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content on Left" variant',
    variant: BlockVariants.contentOnLeft
  };
};

export const blockOnLeftFullBleedMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content on Left Full Bleed" variant',
    variant: BlockVariants.contentOnLeftFullBleed
  };
};

export const blockBelowMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content Below" variant',
    variant: BlockVariants.contentBelow
  };
};

export const blockAboveMock = (override?: Partial<BlockProps>): BlockProps => {
  return {
    ...blockDefaultMock(override),
    title: 'This is the block title for the "Content Above" variant',
    variant: BlockVariants.contentAbove
  };
};

export default blockBaseMock;
