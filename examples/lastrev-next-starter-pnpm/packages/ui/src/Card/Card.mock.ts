import { lorem } from 'faker';

import { staticRichTextMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock, mediaBaseSvgMock } from '../Media/Media.mock';
import { linkButtonMock, linkBaseMock } from '../Link/Link.mock';

import { CardProps } from './Card.types';

const cardDefaultMock = (override?: Partial<CardProps>) => ({
  id: lorem.slug(),
  __typename: 'Card',
  variant: 'default',
  media: [mediaBaseImageMock()],
  overline: 'This is a card overline',
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(), // TODO: Match to options in card
  actions: [{ ...linkButtonMock(), text: 'Card link' }],
  link: { ...linkBaseMock() },
  sidekickLookup: {},
  loading: false,
  ...override
});

export const cardBaseMock = (override: Partial<CardProps>) => ({
  ...cardDefaultMock(override)
});

export const cardIconMock = (override: Partial<CardProps>) => ({
  ...cardDefaultMock(override),
  variant: 'icon'
});

export const cardLogoMock = (override: Partial<CardProps>) => ({
  ...cardDefaultMock(override),
  media: [mediaBaseSvgMock(), mediaBaseImageMock()],
  variant: 'logo'
});

export const cardMediaMock = (override: Partial<CardProps>) => ({
  ...cardDefaultMock(override),

  variant: 'media'
});

export const cardPricingMock = (override: Partial<CardProps>) => ({
  ...cardDefaultMock(override),

  variant: 'pricing',
  overline: 'Plan 1',
  title: '$69.99',
  subtitle: 'Our best deal!'
});

export const cardPersonMock = (override: Partial<CardProps>) => ({
  ...cardDefaultMock(override),

  variant: 'person'
});

export const cardQuoteMock = (override: Partial<CardProps>) => ({
  ...cardDefaultMock(override),

  variant: 'quote'
});

export const cardBlogMock = (override: Partial<CardProps>) => ({
  ...cardDefaultMock(override),
  variant: 'blog'
});

export const cardWithTagsBaseMock = (override: Partial<CardProps>) => ({
  ...cardBaseMock(override)
});

export default cardBaseMock;
