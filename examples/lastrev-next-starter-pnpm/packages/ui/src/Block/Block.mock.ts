import { lorem } from 'faker';

import { linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';
import { introTextMock } from '../Text/Text.mock';

import { BlockProps } from './Block.types';

const blockDefaultMock: BlockProps = {
  id: lorem.word(),
  __typename: 'Block',
  variant: 'default',
  introText: introTextMock(),
  eyebrow: 'This is the Block eyebrow',
  title: 'This is the Block title',
  subtitle: 'This is the Block subtitle',
  body: richTextMock({ text: 'This is the Block body' }),
  mediaItems: [
    mediaBaseImageMock({ title: 'This is the Block Media 1' }),
    mediaBaseImageMock({ title: 'This is the Block Media 2' })
  ],
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

export default blockBaseMock;
