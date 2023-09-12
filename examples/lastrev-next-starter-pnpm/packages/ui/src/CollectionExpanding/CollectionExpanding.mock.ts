import { lorem } from 'faker';
import { CollectionExpandingProps } from './CollectionExpanding.types';
import { cardBaseMock } from '../Card/Card.mock';
import { introTextMock } from '../Text/Text.mock';

const CollectionExpandingDefaultMock: CollectionExpandingProps = {
  id: lorem.word(),
  __typename: 'CollectionExpanding',
  variant: 'threePerRow',
  items: [cardBaseMock(), cardBaseMock({ title: lorem.sentence }), cardBaseMock(), cardBaseMock()],
  itemsVariant: 'default',
  introText: introTextMock()
};

export const CollectionExpandingBaseMock = ({ ...override } = {}) => ({
  ...CollectionExpandingDefaultMock,
  ...override
});

export default CollectionExpandingBaseMock;
