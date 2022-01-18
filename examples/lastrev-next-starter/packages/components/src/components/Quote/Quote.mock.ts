import { random } from 'faker';
import mockFile from '../../stories/mocks/file.mock';

const mockQuoteBase = () => {
  return {
    __typename: 'Quote',
    id: random.alphaNumeric(10),
    variant: 'one-column',
    quoteImage: {
      __typename: 'Media',
      file: mockFile({ height: 2160, width: 3840, text: 'Quote Base' }),
      alt: 'Quote Base'
    },
    quote: 'Get in touch and learn how our services can help you!',
    authorName: `Adam Harris`,
    authorTitle: `Co-Founder`
  };
};

export const mockQuoteOneColumn = () => {
  return {
    ...mockQuoteBase(),
    variant: 'one-column',
    quoteImage: {
      __typename: 'Media',
      file: mockFile({ height: 2160, width: 3840, text: 'Quote One Column' }),
      alt: 'Quote One Column'
    }
  };
};

export const mockQuoteTwoColumn = () => {
  return {
    ...mockQuoteBase(),
    variant: 'two-column',
    quoteImage: {
      __typename: 'Media',
      file: mockFile({ height: 2160, width: 3840, text: 'Quote Two Column' }),
      alt: 'Quote Two Column'
    }
  };
};
