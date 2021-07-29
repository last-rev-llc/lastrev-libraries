import mockCard from '../Card/Card.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  variant: 'carrousel-large',
  items: [
     { ...mockCard },
      { ...mockCard },
      { ...mockCard },
      { ...mockCard }
  ],
  itemsVariant: 'standard-round',
  theme: [mockTheme]
};
