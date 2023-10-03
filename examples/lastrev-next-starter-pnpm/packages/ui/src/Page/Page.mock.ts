import { accordionBaseMock } from '../Accordion/Accordion.mock';
import { blockBaseMock } from '../Block/Block.mock';
import { collectionBaseMock } from '../Collection/Collection.mock';
import { footerBaseMock } from '../Footer/Footer.mock';
import { headerBaseMock } from '../Header/Header.mock';
import { tabsBaseMock } from '../Tabs/Tabs.mock';

import randomId from '../utils/randomId';

import { PageVariants, type PageProps } from './Page.types';

const pageDefaultMock: PageProps = {
  id: randomId(),
  __typename: 'Page',
  variant: PageVariants.default,
  header: headerBaseMock(),
  footer: footerBaseMock(),
  title: 'This is the Page Title',
  contents: [blockBaseMock(), collectionBaseMock(), accordionBaseMock(), tabsBaseMock()]
};

export const pageBaseMock = ({ ...override } = {}) => ({
  ...pageDefaultMock,
  ...override
});

export default pageBaseMock;
