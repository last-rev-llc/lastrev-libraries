import { lorem } from 'faker';

import { linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';
import { introTextMock } from '../Text/Text.mock';

import type { BlockProps } from './Block.types';

const blockDefaultMock: BlockProps = {
  id: lorem.word(),
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

export const blockBaseMock = ({ ...override } = {}) => ({
  ...blockDefaultMock,
  ...override
});

export const blockContentOnRightMock = ({ ...override } = {}) => ({
  ...blockDefaultMock,
  ...override,
  title: 'This is the block title for "Content on Right" variant"',
  variant: 'contentOnRight'
});

export const blockContentOnRightFullBleedMock = ({ ...override } = {}) => ({
  ...blockDefaultMock,
  ...override,
  variant: 'contentOnRightFullBleed'
});

export const blockContentOnLeftMock = ({ ...override } = {}) => ({
  ...blockDefaultMock,
  ...override,
  variant: 'contentOnLeft'
});

export const blockContentOnLeftFullBleedMock = ({ ...override } = {}) => ({
  ...blockDefaultMock,
  ...override,
  variant: 'contentOnLeftFullBleed'
});

export const blockContentBelowMock = ({ ...override } = {}) => ({
  ...blockDefaultMock,
  ...override,
  variant: 'contentBelow'
});

export const blockContentAboveMock = ({ ...override } = {}) => ({
  ...blockDefaultMock,
  ...override,
  variant: 'contentAbove'
});

export default blockBaseMock;
