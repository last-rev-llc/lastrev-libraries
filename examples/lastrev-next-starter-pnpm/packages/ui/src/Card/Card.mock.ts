import { lorem } from 'faker';

import { staticRichTextMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { linkButtonMock, linkBaseMock } from '../Link/Link.mock';

import { type CardProps, CardVariants } from './Card.types';

export const cardBaseMock = (override?: Partial<CardProps>) => {
  const baseMock: Partial<CardProps> = {
    id: lorem.slug(),
    __typename: 'Card',
    variant: 'default',
    media: [mediaBaseImageMock()],
    overline: 'This is a card overline',
    title: 'This is a card title',
    subtitle: 'And this is the subtitle',
    body: staticRichTextMock(), // TODO: Match to options in card
    actions: [
      { ...linkButtonMock(), text: 'Card link' },
      { ...linkButtonMock(), text: 'Card link 2' }
    ],
    link: { ...linkBaseMock() },
    sidekickLookup: {},
    loading: false
  };
  let variantOverride: Partial<CardProps>;
  switch (override?.variant) {
    case CardVariants.pricing:
      variantOverride = {
        overline: 'Plan 1',
        title: '$69.99',
        subtitle: 'Our best deal!'
      };
      break;
    case CardVariants.media:
      variantOverride = {
        overline: undefined,
        title: undefined,
        subtitle: undefined,
        actions: undefined,
        body: undefined
      };
      break;
    default:
      variantOverride = {};
  }
  Object.keys(variantOverride)?.forEach((key) => {
    baseMock[key] = variantOverride[key];
  });
  return { ...baseMock, ...variantOverride, ...override };
};

export default cardBaseMock;
