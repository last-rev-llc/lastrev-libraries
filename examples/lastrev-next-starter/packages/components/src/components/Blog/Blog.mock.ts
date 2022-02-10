import { mediaMock } from '../../stories/Card/Card.mock';
import textMock from '../../stories/mocks/text.mock';
import { textWithLinksmock } from '../../stories/Section/Section.mock';

export default {
  __typename: 'Blog',
  sidekickLookup: {},
  title: 'Blog title',
  slug: 'blog-title',
  featuredMedia: [mediaMock],
  author: 'John Author',
  body: textMock,
  categories: [],
  tags: [],
  relatedLinks: [textWithLinksmock],
  contents: null
};
