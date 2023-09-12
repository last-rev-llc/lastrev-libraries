import { CollectionFilteredProps } from '@last-rev/component-library/dist/components/CollectionFiltered';
import cardBaseMock from '../Card/Card.mock';

export default (): CollectionFilteredProps => ({
  id: 'collection-filtered',
  variant: 'filtered',
  itemsSpacing: 2,
  items: [
    {
      ...cardBaseMock(),
      title: 'Cum sociis natoque penatibus et magnis dis parturient.'
    },
    {
      ...cardBaseMock(),
      title: 'A communi observantia non est recedendum.'
    },
    {
      ...cardBaseMock(),
      title: 'Paullum deliquit, ponderibus modulisque suis ratio utitur.'
    },
    {
      ...cardBaseMock(),
      title: 'Unam incolunt Belgae, aliam Aquitani, tertiam.'
    }
  ],
  itemsVariant: 'accordion'
});
