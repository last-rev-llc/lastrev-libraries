import { lorem } from 'faker';
import { CarouselProps } from './Carousel';
import mockCard from '../Card/Card.mock';
import mockTheme from '../../theme/mock.theme';

export default (): CarouselProps => ({
  __typename: 'Carousel',
  variant: 'standard',
  title: 'Carousel title',
  body: {
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: lorem.sentences(2),
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  },
  items: [
    { ...mockCard, variant: 'media', title: 'Card one title' },
    { ...mockCard, variant: 'media', title: 'Card two title' },
    { ...mockCard, variant: 'media', title: 'Card three title' },
    { ...mockCard, variant: 'media', title: 'Card four title' }
  ],
  itemsVariant: 'standard-round',
  theme: [mockTheme]
  // links: {
  //   entries: [],
  //   assets: []
  // }
});
