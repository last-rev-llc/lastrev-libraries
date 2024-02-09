import { richTextCardMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { linkButtonMock, linkBaseMock } from '../Link/Link.mock';

import { randomId } from '../utils/randomId';

import { type CardProps, CardVariants } from './Card.types';
import { LinkVariants } from '../Link/Link.types';

export const cardBaseMock = (override?: Partial<CardProps>): CardProps => {
  const baseMock: CardProps = {
    id: randomId(),
    __typename: 'Card',
    variant: CardVariants.default,
    media: [mediaBaseImageMock()],
    overline: 'This is a card overline',
    title: 'This is a card title',
    subtitle: 'And this is the subtitle',
    body: richTextCardMock(),
    actions: [
      linkButtonMock({ text: 'Card Link 1', variant: LinkVariants.buttonText }),
      linkButtonMock({ text: 'Card Link 2', variant: LinkVariants.buttonText })
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
    case CardVariants.icon:
      variantOverride = {
        overline: undefined,
        // title: undefined,
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
