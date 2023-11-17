import { collectionBaseMock } from '../Collection/Collection.mock';
import { footerBaseMock } from '../Footer/Footer.mock';
import { headerChildrenNestedMock } from '../Header/Header.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { categoryblogMock } from '../RichText/RichText.mock';
import { textTitleMock } from '../Text/Text.mock';
import { breadcrumbsBaseMock } from '../Breadcrumbs/Breadcrumbs.mock';
import { personBaseMock } from '../Person/Person.mock';

import { randomId } from '../utils/randomId';

import { CategoryBlogVariants, type CategoryBlogProps } from './CategoryBlog.types';
import heroBaseMock from '../Hero/Hero.mock';

const categoryblogDefaultMock = (override?: Partial<CategoryBlogProps>): CategoryBlogProps => {
  const relatedItems = collectionBaseMock({ introText: textTitleMock({ title: 'Related Items' }) });
  relatedItems.items = relatedItems.items?.slice(0, 3);

  const baseMock: CategoryBlogProps = {
    id: randomId(),
    __typename: 'CategoryBlog',
    variant: CategoryBlogVariants.default,
    header: headerChildrenNestedMock(),
    footer: footerBaseMock(),
    title: 'This is the CategoryBlog Title',
    pubDate: new Date().toString(),
    body: categoryblogMock(),
    featuredMedia: mediaBaseImageMock(),
    breadcrumbs: breadcrumbsBaseMock().links,
    author: personBaseMock(),
    relatedItems,
    jsonLd: {}
  };

  return { ...baseMock, ...override };
};

export const categoryblogBaseMock = ({ ...override } = {}) => ({
  ...categoryblogDefaultMock(override)
});

export const categoryblogWithHeroMock = ({ ...override } = {}) => {
  const defaultMock = categoryblogDefaultMock(override);

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

export default categoryblogBaseMock;
