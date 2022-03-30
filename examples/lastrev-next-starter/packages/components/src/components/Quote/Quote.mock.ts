import { random } from 'faker';
import { mediaMock } from '../Media/Media.mock';
import { QuoteProps } from './Quote.types';

const mockQuoteBase = (): QuoteProps => {
  return {
    __typename: 'Quote',
    id: random.alphaNumeric(10),
    variant: 'one-column',
    authorImage: mediaMock(),
    quote: 'Get in touch and learn how our services can help you!',
    authorName: `Adam Harris`,
    authorTitle: `Co-Founder`,
    logo: mediaMock()
  };
};

export const mockQuoteOneColumn = (): QuoteProps => {
  return {
    ...mockQuoteBase(),
    variant: 'one-column',
    authorImage: mediaMock()
  };
};

export const mockQuoteTwoColumn = (): QuoteProps => {
  return {
    ...mockQuoteBase(),
    variant: 'two-column',
    authorImage: mediaMock()
  };
};
