import { CollectionFilteredProps } from '@last-rev/component-library/dist/components/CollectionFiltered';
import cardMock from '../Card/Card.mock';
import mockTheme from '../../theme';

export default (): CollectionFilteredProps => ({
  id: 'collection-filtered',
  variant: 'filtered',
  itemsSpacing: 2,
  items: [
    {
      ...cardMock(),
      title: 'Cum sociis natoque penatibus et magnis dis parturient.'
    },
    {
      ...cardMock(),
      title: 'A communi observantia non est recedendum.'
    },
    {
      ...cardMock(),
      title: 'Paullum deliquit, ponderibus modulisque suis ratio utitur.'
    },
    {
      ...cardMock(),
      title: 'Unam incolunt Belgae, aliam Aquitani, tertiam.'
    }
  ],
  itemsVariant: 'accordion',
  theme: [mockTheme]
});
