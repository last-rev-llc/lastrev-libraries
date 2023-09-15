import { lorem } from 'faker';

import { staticRichTextMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock, mediaBaseSvgMock } from '../Media/Media.mock';
import { linkButtonMock, linkBaseMock } from '../Link/Link.mock';

import { CardProps } from './Card.types';

const cardDefaultMock: CardProps = {
  id: lorem.word(),
  __typename: 'Card',
  variant: 'default',
  media: [mediaBaseImageMock()],
  overline: 'This is a card overline',
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(), // TODO: Match to options in card
  actions: [{ ...linkButtonMock(), text: 'Card link' }],
  link: [{ ...linkBaseMock() }],
  sidekickLookup: {},
  loading: false
};

export const cardBaseMock = ({ ...override } = {}): CardProps => ({
  ...cardDefaultMock,
  ...override
});

export const cardIconMock = ({ ...override } = {}) => ({
  ...cardDefaultMock,
  ...override,
  variant: 'icon'
});

export const cardLogoMock = ({ ...override } = {}) => ({
  ...cardDefaultMock,
  media: [mediaBaseSvgMock(), mediaBaseImageMock()],
  ...override,
  variant: 'logo'
});

export const cardMediaMock = ({ ...override } = {}) => ({
  ...cardDefaultMock,
  ...override,
  variant: 'media'
});

export const cardPricingMock = ({ ...override } = {}) => ({
  ...cardDefaultMock,
  ...override,
  variant: 'pricing',
  overline: 'Plan 1',
  title: '$69.99',
  subtitle: 'Our best deal!'
});

export const cardPersonMock = ({ ...override } = {}) => ({
  ...cardDefaultMock,
  ...override,
  variant: 'person'
});

export const cardQuoteMock = ({ ...override } = {}) => ({
  ...cardDefaultMock,
  ...override,
  variant: 'quote'
});

export const cardBlogMock = ({ ...override } = {}) => ({
  ...cardDefaultMock,
  ...override,
  variant: 'blog'
});

export const cardWithTagsBaseMock = (): CardProps => ({
  ...cardBaseMock()
});

export default cardBaseMock;
