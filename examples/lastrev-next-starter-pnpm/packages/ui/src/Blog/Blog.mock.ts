import { collectionBaseMock } from '../Collection/Collection.mock';
import { footerBaseMock } from '../Footer/Footer.mock';
import { headerChildrenNestedMock } from '../Header/Header.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { blogMock } from '../RichText/RichText.mock';
import { textTitleMock } from '../Text/Text.mock';
import { breadcrumbsBaseMock } from '../Breadcrumbs/Breadcrumbs.mock';
import { personBaseMock } from '../Person/Person.mock';

import { randomId } from '../utils/randomId';

import { BlogVariants, type BlogProps } from './Blog.types';
import heroBaseMock from '../Hero/Hero.mock';

const blogDefaultMock = (override?: Partial<BlogProps>): BlogProps => {
  const relatedItems = collectionBaseMock({ introText: textTitleMock({ title: 'Related Items' }) });
  relatedItems.items = relatedItems.items?.slice(0, 3);

  const baseMock: BlogProps = {
    id: randomId(),
    __typename: 'Blog',
    variant: BlogVariants.default,
    header: headerChildrenNestedMock(),
    footer: footerBaseMock(),
    title: 'This is the Blog Title',
    pubDate: new Date().toString(),
    body: blogMock(),
    featuredMedia: mediaBaseImageMock(),
    breadcrumbs: breadcrumbsBaseMock().links,
    author: personBaseMock(),
    relatedItems,
    jsonLd: {}
  };

  return { ...baseMock, ...override };
};

export const blogBaseMock = ({ ...override } = {}) => ({
  ...blogDefaultMock(override)
});

export const blogWithHeroMock = ({ ...override } = {}) => {
  const defaultMock = blogDefaultMock(override);

  return {
    ...defaultMock,
    hero: heroBaseMock({
      title: defaultMock.title,
      subtitle: undefined,
      body: undefined,
      overline: defaultMock.pubDate,
      images: [defaultMock.featuredMedia]
    })
  };
};

export default blogBaseMock;
