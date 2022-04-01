import { CollectionAccordionMediaProps } from './CollectionAccordionMedia';
import mockAccordion from '../Accordion/Accordion.mock';

export default (): CollectionAccordionMediaProps => ({
  id: 'collection-accordion-media',
  variant: 'accordion-media',
  itemsSpacing: 2,
  items: [
    {
      ...mockAccordion,
      title: 'Cum sociis natoque penatibus et magnis dis parturient.'
    },
    {
      ...mockAccordion,
      title: 'A communi observantia non est recedendum.'
    },
    {
      ...mockAccordion,
      title: 'Paullum deliquit, ponderibus modulisque suis ratio utitur.'
    },
    {
      ...mockAccordion,
      title: 'Unam incolunt Belgae, aliam Aquitani, tertiam.'
    }
  ]
});
