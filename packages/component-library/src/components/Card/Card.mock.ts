import { lorem } from 'faker';
import mockLink, { basicLink } from '../Link/Link.mock';
import { CardProps } from './Card.types';
import { staticRichTextMock } from '../Text/Text.mock';
import { mediaMock } from '../Media/Media.mock';

export default (): CardProps => ({
  id: lorem.slug(),
  __typename: 'Card',
  media: mediaMock(),
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(),

  actions: [{ ...mockLink(), text: 'Card link' }],
  sidekickLookup: {}
});

export const baseMock = (): CardProps => ({
  variant: 'default',
  __typename: 'Card',
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(),
  media: mediaMock()
});

export const cardWithTags = (): CardProps => ({
  __typename: 'Card',
  media: mediaMock(),
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(),
  tags: [{ ...mockLink(), text: 'Tag 1' }, { ...mockLink(), text: 'Tag 2' }, { text: 'Tag 3 - Not clickable' }],
  actions: [{ ...mockLink(), text: 'Card link' }],
  sidekickLookup: {}
});

export const cardWithLink = (): CardProps => ({
  __typename: 'Card',
  media: mediaMock(),
  link: { ...basicLink(), variant: 'link', text: '' },
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(),
  tags: [{ ...mockLink(), text: 'Tag 1' }, { ...mockLink(), text: 'Tag 2' }, { text: 'Tag 3 - Not clickable' }],
  actions: [{ ...mockLink(), text: 'Card link' }],
  sidekickLookup: {}
});

export const cardWithLinkButton = (): CardProps => ({
  __typename: 'Card',
  media: mediaMock(),
  link: { ...basicLink(), variant: 'button-contained', text: '' },
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(),
  tags: [{ ...mockLink(), text: 'Tag 1' }, { ...mockLink(), text: 'Tag 2' }, { text: 'Tag 3 - Not clickable' }],
  actions: [{ ...mockLink(), text: 'Card link' }],
  sidekickLookup: {}
});
