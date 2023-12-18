import { collectionBaseMock } from '../Collection/Collection.mock';
import { footerBaseMock } from '../Footer/Footer.mock';
import { headerChildrenNestedMock } from '../Header/Header.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { pageresourceMock } from '../RichText/RichText.mock';
import { textTitleMock } from '../Text/Text.mock';
import { breadcrumbsBaseMock } from '../Breadcrumbs/Breadcrumbs.mock';
import { personBaseMock } from '../Person/Person.mock';

import { randomId } from '../utils/randomId';

import { PageResourceVariants, type PageResourceProps } from './PageResource.types';
import heroBaseMock from '../Hero/Hero.mock';

const pageresourceDefaultMock = (override?: Partial<PageResourceProps>): PageResourceProps => {
  const relatedItems = collectionBaseMock({ introText: textTitleMock({ title: 'Related Items' }) });
  relatedItems.items = relatedItems.items?.slice(0, 3);

  const baseMock: PageResourceProps = {
    id: randomId(),
    __typename: 'PageResource',
    variant: PageResourceVariants.default,
    header: headerChildrenNestedMock(),
    footer: footerBaseMock(),
    title: 'This is the PageResource Title',
    pubDate: new Date().toString(),
    body: pageresourceMock(),
    featuredMedia: mediaBaseImageMock(),
    breadcrumbs: breadcrumbsBaseMock().links,
    author: personBaseMock(),
    relatedItems,
    jsonLd: {}
  };

  return { ...baseMock, ...override };
};

export const pageresourceBaseMock = ({ ...override } = {}) => ({
  ...pageresourceDefaultMock(override)
});

export const pageresourceWithHeroMock = ({ ...override } = {}) => {
  const defaultMock = pageresourceDefaultMock(override);

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

export default pageresourceBaseMock;
