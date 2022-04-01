import { CollectionCarouselProps } from './CollectionCarousel.types';
import mockCard from '../Card/Card.mock';
import mockTheme from '../../theme/mock.theme';

export default (): CollectionCarouselProps => ({
  variant: 'carousel-large',
  items: [
    { ...mockCard(), variant: 'media-and-text', title: 'Card one title' },
    { ...mockCard(), variant: 'media-and-text', title: 'Card two title' },
    { ...mockCard(), variant: 'media-and-text', title: 'Card three title' },
    { ...mockCard(), variant: 'media-and-text', title: 'Card four title' }
  ],
  itemsVariant: 'media-and-text',
  theme: [mockTheme],
  sidekickLookup: 'sidekick-lookup'
});

export const smallCarouselMock = (): CollectionCarouselProps => ({
  variant: 'carousel-small',
  items: [
    { ...mockCard(), variant: 'media-hover', title: 'Card one title' },
    { ...mockCard(), variant: 'media-hover', title: 'Card two title' },
    { ...mockCard(), variant: 'media-hover', title: 'Card three title' },
    { ...mockCard(), variant: 'media-hover', title: 'Card four title' }
  ],
  itemsVariant: 'media-hover',
  theme: [mockTheme],
  sidekickLookup: 'sidekick-lookup'
});
