import mockCard from '../Card/Card.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  variant: 'three-per-row',
  items: [
    { ...mockCard },
    { ...mockCard },
    { ...mockCard },
    { ...mockCard }
  ],
  itemsVariant: 'standard-round',
  theme: [mockTheme]
};
