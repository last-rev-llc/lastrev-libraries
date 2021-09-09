import mockCard from '../Card/Card.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  itemsSpacing: 2,
  variant: 'collection-three-per-row',
  items: [{ ...mockCard }, { ...mockCard }, { ...mockCard }, { ...mockCard }, { ...mockCard }],
  itemsVariant: 'standard-round',
  // itemsWidth: 'xl',
  theme: [mockTheme]
};
