import { accordionBaseMock } from '../Accordion/Accordion.mock';
import { blockBaseMock } from '../Block/Block.mock';
import { collectionBaseMock } from '../Collection/Collection.mock';
import { footerBaseMock } from '../Footer/Footer.mock';
import { headerBaseMock } from '../Header/Header.mock';
import heroBaseMock from '../Hero/Hero.mock';
import sectionBaseMock from '../Section/Section.mock';
import { tabsBaseMock } from '../Tabs/Tabs.mock';
import { breadcrumbsBaseMock } from '../Breadcrumbs/Breadcrumbs.mock';

import { randomId } from '../utils/randomId';

import { PageVariants, type PageProps } from './Page.types';
// import { mediaBaseImageMock } from '../Media/Media.mock';
import { BlockVariants } from '../Block/Block.types';

const pageDefaultMock: PageProps = {
  id: randomId(),
  __typename: 'Page',
  variant: PageVariants.default,
  header: headerBaseMock(),
  footer: footerBaseMock(),
  hero: heroBaseMock(),
  breadcrumbs: breadcrumbsBaseMock().links,
  title: 'This is the Page Title',
  contents: [
    // blockBaseMock({ introText: undefined }),
    // blockBaseMock({ backgroundColor: 'black', introText: undefined }),
    // blockBaseMock({ backgroundColor: 'black', introText: undefined }),
    sectionBaseMock({
      variant: 'twoPerRow',
      backgroundColor: 'black',
      background: null, //mediaBaseImageMock(),
      contents: [accordionBaseMock({ introText: undefined }), tabsBaseMock({ introText: undefined })]
    }),

    // blockBaseMock({ introText: undefined }),
    // blockBaseMock({ backgroundColor: 'black', introText: undefined }),
    // blockBaseMock({ backgroundColor: 'black', introText: undefined }),
    sectionBaseMock({
      variant: 'onePerRow',
      backgroundColor: 'secondary',
      background: null, //mediaBaseImageMock(),
      contents: [
        blockBaseMock({
          backgroundColor: 'black',
          introText: undefined,
          variant: BlockVariants.contentOnRightFullBleed
        }),
        blockBaseMock({ backgroundColor: 'black', introText: undefined })
      ]
    }),
    sectionBaseMock({
      variant: 'twoPerRow',
      backgroundColor: 'primary',
      background: null, //mediaBaseImageMock(),
      contents: [
        blockBaseMock({
          backgroundColor: 'black',
          introText: undefined,
          variant: BlockVariants.contentOnRightFullBleed
        }),
        blockBaseMock({ backgroundColor: 'black', introText: undefined })
      ]
    }),
    sectionBaseMock({
      variant: 'threePerRow',
      backgroundColor: 'secondary',
      background: null, //mediaBaseImageMock(),
      contents: [
        blockBaseMock({
          backgroundColor: 'secondary',
          introText: undefined,
          variant: BlockVariants.contentOnRightFullBleed
        }),
        blockBaseMock({ backgroundColor: 'black', introText: undefined }),
        blockBaseMock({ backgroundColor: 'black', introText: undefined })
      ]
    }),
    collectionBaseMock({ introText: undefined }),
    accordionBaseMock({ introText: undefined }),
    tabsBaseMock({ introText: undefined })
  ]
};

export const pageBaseMock = ({ ...override } = {}) => ({
  ...pageDefaultMock,
  ...override
});

export default pageBaseMock;
