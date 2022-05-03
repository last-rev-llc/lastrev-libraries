import { CollectionAccordionProps } from './CollectionAccordion';
import mockAccordion from '../Accordion/Accordion.mock';
import mockTheme from '../../theme';

export default (): CollectionAccordionProps => ({
  sidekickLookup: 'sidekick-lookup',
  variant: 'accordion',
  itemSpacing: 2,
  items: [
    {
      ...mockAccordion,
      variant: 'accordion-standard',
      title: 'Cum sociis natoque penatibus et magnis dis parturient.'
    },
    {
      ...mockAccordion,
      variant: 'accordion-standard',
      title: 'A communi observantia non est recedendum.'
    },
    {
      ...mockAccordion,
      variant: 'accordion-standard',
      title: 'Paullum deliquit, ponderibus modulisque suis ratio utitur.'
    },
    {
      ...mockAccordion,
      variant: 'accordion-standard',
      title: 'Unam incolunt Belgae, aliam Aquitani, tertiam.'
    }
  ],
  itemsVariant: 'accordion-standard',
  theme: [mockTheme]
});
