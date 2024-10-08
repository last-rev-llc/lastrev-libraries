import { lorem } from 'faker';
import { CollectionProps } from './Collection.types';
import mockCard from '../Card/Card.mock';
import { complexMock } from '../Text/Text.mock';

export default (): CollectionProps => ({
  id: '1',
  __typename: 'Collection',
  sidekickLookup: {},
  itemsSpacing: 2,
  variant: 'three-per-row',
  items: [{ ...mockCard() }, { ...mockCard(), title: lorem.sentence() }, { ...mockCard() }, { ...mockCard() }],
  itemsVariant: 'standard-round'
});

export const collectionWithIntroText: CollectionProps = {
  id: '1',
  __typename: 'Collection',
  sidekickLookup: {},
  itemsSpacing: 2,
  variant: 'three-per-row',
  items: [{ ...mockCard() }, { ...mockCard(), title: lorem.sentence() }, { ...mockCard() }, { ...mockCard() }],
  itemsVariant: 'standard-round',
  // itemsWidth: 'xl',
  introText: complexMock()
};
