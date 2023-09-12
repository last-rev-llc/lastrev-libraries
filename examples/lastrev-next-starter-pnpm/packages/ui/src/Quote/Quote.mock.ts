import { lorem } from 'faker';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { QuoteProps } from './Quote.types';

const quoteDefaultMock: QuoteProps = {
  id: lorem.word(),
  __typename: 'Quote',
  variant: 'default',
  authorImage: mediaBaseImageMock(),
  quote: 'Get in touch and learn how our services can help you!',
  authorName: `Adam Harris`,
  authorTitle: `Co-Founder`,
  logo: mediaBaseImageMock()
};

export const quoteBaseMock = ({ ...override } = {}) => ({
  ...quoteDefaultMock,
  ...override
});

export const quoteLargeMock = ({ ...override } = {}) => ({
  ...quoteDefaultMock,
  ...override,
  variant: 'large'
});

export const quoteInlineMock = ({ ...override } = {}) => ({
  ...quoteDefaultMock,
  ...override,
  variant: 'inline'
});

export default quoteBaseMock;
