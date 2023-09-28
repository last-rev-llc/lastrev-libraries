import { lorem } from 'faker';
import type { PageProps } from './Page.types';
import { blockBaseMock } from '../Block/Block.mock';

const pageDefaultMock: PageProps = {
  id: lorem.word(),
  __typename: 'Page',
  title: lorem.words(2),
  contents: [blockBaseMock(), blockBaseMock(), blockBaseMock()]
};

export const pageBaseMock = ({ ...override } = {}) => ({
  ...pageDefaultMock,
  ...override
});

export default pageBaseMock;
