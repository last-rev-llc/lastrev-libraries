import { lorem } from 'faker';

import { linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';

import { BlockProps, BlockVariants } from './Block.types';
import { LinkVariants } from '../Link/Link.types';

const blockDefaultMock = (): BlockProps => ({
  id: lorem.word(),
  __typename: 'Block',
  backgroundColor: 'background',
  variant: BlockVariants.default,
  // introText: introTextMock(),
  overline: 'This is the Block overline',
  title: 'This is the Block title',
  subtitle: 'This is the Block subtitle',
  body: richTextMock({ text: 'This is the Block body' }),
  mediaItems: [mediaBaseImageMock({ title: 'This is the Block Media 1' })],
  actions: [
    linkButtonMock({ text: 'This is the Block Action 1', variant: LinkVariants['button-contained'] }),
    linkButtonMock({ text: 'This is the Block Action 2', variant: LinkVariants['button-outlined'] })
  ],
  link: linkButtonMock({ text: 'This is the Block Link', variant: LinkVariants['button-contained'] })
});

export const blockBaseMock = (override?: Partial<BlockProps>) => ({
  ...blockDefaultMock,
  ...override
});

export const blockContentOnRightMock = (override: Partial<BlockProps>) => ({
  ...blockDefaultMock,
  ...override,
  title: 'This is the block title for "Content on Right" variant"',
  variant: 'contentOnRight'
});

export const blockContentOnRightFullBleedMock = (override: Partial<BlockProps>) => ({
  ...blockDefaultMock,
  ...override,
  variant: 'contentOnRightFullBleed'
});

export const blockContentOnLeftMock = (override: Partial<BlockProps>) => ({
  ...blockDefaultMock,
  ...override,
  variant: 'contentOnLeft'
});

export const blockContentOnLeftFullBleedMock = (override: Partial<BlockProps>) => ({
  ...blockDefaultMock,
  ...override,
  variant: 'contentOnLeftFullBleed'
});

export const blockContentBelowMock = (override: Partial<BlockProps>) => ({
  ...blockDefaultMock,
  ...override,
  variant: 'contentBelow'
});

export const blockContentAboveMock = (override: Partial<BlockProps>) => ({
  ...blockDefaultMock,
  ...override,
  variant: 'contentAbove'
});

export default blockBaseMock;
