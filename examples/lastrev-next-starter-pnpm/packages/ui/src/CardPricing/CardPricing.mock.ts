import { richTextCardPricingMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { linkButtonMock, linkBaseMock } from '../Link/Link.mock';

import { randomId } from '../utils/randomId';

import { type CardPricingProps, CardPricingVariants } from './CardPricing.types';
import { LinkVariants } from '../Link/Link.types';

export const cardBaseMock = (override?: Partial<CardPricingProps>): CardPricingProps => {
  const baseMock: CardPricingProps = {
    id: randomId(),
    __typename: 'CardPricing',
    variant: CardPricingVariants.default,
    media: [mediaBaseImageMock()],
    overline: 'This is a card overline',
    title: 'This is a card title',
    subtitle: 'And this is the subtitle',
    body: richTextCardPricingMock(),
    actions: [
      linkButtonMock({ text: 'CardPricing Link 1', variant: LinkVariants.buttonText }),
      linkButtonMock({ text: 'CardPricing Link 2', variant: LinkVariants.buttonText })
    ],
    link: { ...linkBaseMock() },
    sidekickLookup: {},
    loading: false
  };

  let variantOverride: Partial<CardPricingProps>;

  switch (override?.variant) {
    case CardPricingVariants.pricing:
      variantOverride = {
        overline: 'Plan 1',
        title: '$69.99',
        subtitle: 'Our best deal!'
      };
      break;

    case CardPricingVariants.media:
      variantOverride = {
        overline: undefined,
        title: undefined,
        subtitle: undefined,
        actions: undefined,
        body: undefined
      };
      break;
    case CardPricingVariants.icon:
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
