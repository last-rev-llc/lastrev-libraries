import { mediaBaseImageMock } from '../Media/Media.mock';

import randomId from '../utils/randomId';

import type { QuoteProps } from './Quote.types';

export const quoteDefaultMock = (override?: Partial<QuoteProps>): QuoteProps => {
  return {
    id: randomId(),
    __typename: 'Quote',
    variant: 'default',
    quote: 'Get in touch and learn how our services can help you!',
    authorName: `Adam Harris`,
    authorTitle: `Co-Founder`,
    logo: mediaBaseImageMock(),
    image: mediaBaseImageMock()
  };
};

export const quoteBaseMock = ({ ...override } = {}): QuoteProps => ({
  ...quoteDefaultMock(override)
});

export const quoteLargeMock = ({ ...override } = {}): QuoteProps => ({
  ...quoteDefaultMock(override),
  variant: 'large'
});

export const quoteInlineMock = ({ ...override } = {}): QuoteProps => ({
  ...quoteDefaultMock(override),

  variant: 'inline'
});

export default quoteBaseMock;
