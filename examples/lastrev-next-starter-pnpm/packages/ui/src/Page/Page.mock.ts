import { blockBaseMock } from '../Block/Block.mock';

import randomId from '../utils/randomId';

import type { PageProps } from './Page.types';

const pageDefaultMock: PageProps = {
  id: randomId(),
  __typename: 'Page',
  title: 'This is the Page Title',
  contents: [blockBaseMock(), blockBaseMock(), blockBaseMock()]
};

export const pageBaseMock = ({ ...override } = {}) => ({
  ...pageDefaultMock,
  ...override
});

export default pageBaseMock;
