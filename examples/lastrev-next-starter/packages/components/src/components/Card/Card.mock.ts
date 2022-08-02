import { CardProps } from './Card';
import { staticRichTextMock } from '../Text/Text.mock';
import { mediaMock } from '../Media/Media.mock';
import mockLink from '../Link/Link.mock';

export const cardMock = (): CardProps => ({
  __typename: 'Card',
  media: mediaMock(),
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(),
  actions: [{ ...mockLink(), text: 'Card link' }],
  sidekickLookup: {}
});

export const cardWithTags = (): CardProps => ({
  ...cardMock(),
  tags: [
    { ...mockLink(), text: 'Card tag' },
    { ...mockLink(), text: 'Card tag 2' }
  ]
});

export default cardMock;
