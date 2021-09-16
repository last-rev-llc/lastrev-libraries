import { lorem } from 'faker';
import mockCard from '../Card/Card.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  itemsSpacing: 2,
  variant: 'collection-three-per-row',
  items: [{ ...mockCard }, { ...mockCard, title: lorem.sentence() }, { ...mockCard }, { ...mockCard }],
  itemsVariant: 'standard-round',
  // itemsWidth: 'xl',
  theme: [mockTheme]
};
