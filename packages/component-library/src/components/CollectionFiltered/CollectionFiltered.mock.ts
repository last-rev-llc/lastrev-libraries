import mockCard from '../Card/Card.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  __typename: 'Collection',
  id: 'xyz',
  variant: 'carousel-large',
  items: [
    { ...mockCard(), variant: 'media-and-text', title: 'Card one title' },
    { ...mockCard(), variant: 'media-and-text', title: 'Card two title' },
    { ...mockCard(), variant: 'media-and-text', title: 'Card three title' },
    { ...mockCard(), variant: 'media-and-text', title: 'Card four title' }
  ],
  itemsVariant: 'media-and-text',
  theme: [mockTheme]
};
