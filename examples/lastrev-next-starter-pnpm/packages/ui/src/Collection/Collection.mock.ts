import { lorem } from 'faker';
import { CollectionProps } from './Collection.types';
import { cardBaseMock } from '../Card/Card.mock';
import { introTextMock } from '../Text/Text.mock';

const collectionDefaultMock: CollectionProps = {
  id: lorem.word(),
  __typename: 'Collection',
  variant: 'threePerRow',
  backgroundColor: 'secondary',
  items: [
    cardBaseMock(),
    cardBaseMock({ title: lorem.sentence(6) }),
    cardBaseMock(),
    cardBaseMock(),
    cardBaseMock(),
    cardBaseMock(),
    cardBaseMock(),
    cardBaseMock(),
    cardBaseMock(),
    cardBaseMock()
  ],
  itemsVariant: 'default',
  introText: introTextMock()
};

export const collectionBaseMock = ({ ...override } = {}) => ({
  ...collectionDefaultMock,
  ...override
});

export default collectionBaseMock;
