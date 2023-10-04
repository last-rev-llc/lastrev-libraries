import { accordionBaseMock } from '../Accordion/Accordion.mock';
import { blockBaseMock } from '../Block/Block.mock';
import { collectionBaseMock } from '../Collection/Collection.mock';
import { footerBaseMock } from '../Footer/Footer.mock';
import { headerBaseMock } from '../Header/Header.mock';
import heroBaseMock from '../Hero/Hero.mock';
import sectionBaseMock from '../Section/Section.mock';
import { tabsBaseMock } from '../Tabs/Tabs.mock';

import { randomId } from '../utils/randomId';

import { PageVariants, type PageProps } from './Page.types';

const pageDefaultMock: PageProps = {
  id: randomId(),
  __typename: 'Page',
  variant: PageVariants.default,
  header: headerBaseMock(),
  footer: footerBaseMock(),
  hero: heroBaseMock(),
  title: 'This is the Page Title',
  contents: [
    blockBaseMock({}),
    blockBaseMock({ backgroundColor: 'secondary' }),
    blockBaseMock({ backgroundColor: 'primary' }),
    sectionBaseMock({
      variant: 'twoPerRow',
      backgroundColor: null,
      background: null,
      contents: [blockBaseMock({ backgroundColor: 'secondary' }), blockBaseMock({ backgroundColor: 'secondary' })]
    }),
    collectionBaseMock(),
    accordionBaseMock(),
    tabsBaseMock()
  ]
};

export const pageBaseMock = ({ ...override } = {}) => ({
  ...pageDefaultMock,
  ...override
});

export default pageBaseMock;
