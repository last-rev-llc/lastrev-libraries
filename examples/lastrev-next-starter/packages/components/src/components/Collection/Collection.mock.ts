import { lorem } from 'faker';
import { CollectionProps } from './Collection';
import mockCard from '../Card/Card.mock';
import { complexMock } from '../Text/Text.mock';

export const collectionMock = (): CollectionProps => ({
  id: '1',
  __typename: 'Collection',
  sidekickLookup: {},
  itemsSpacing: 2,
  variant: 'three-per-row',
  items: [{ ...mockCard() }, { ...mockCard(), title: lorem.sentence() }, { ...mockCard() }, { ...mockCard() }],
  itemsVariant: 'standard-round',

  introText: complexMock()
});

export default collectionMock;
