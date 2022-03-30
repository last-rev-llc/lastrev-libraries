import { CollectionAccordionProps } from './CollectionAccordion.types';
import mockAccordion from '../Accordion/Accordion.mock';

export default (): CollectionAccordionProps => ({
  sidekickLookup: 'sidekick-lookup',
  variant: 'accordion',
  itemSpacing: 2,
  items: [
    {
      ...mockAccordion,
      variant: 'accordion-standard',
      title: 'Stress and anxiety: What’s the difference?'
    },
    {
      ...mockAccordion,
      variant: 'accordion-standard',
      title: 'What is depression? How do I know if I have it'
    },
    { ...mockAccordion, variant: 'accordion-standard', title: 'What is psychosis? How do I know if I have it?' },
    {
      ...mockAccordion,
      variant: 'accordion-standard',
      title: 'How soon should I seek help? Will this get better on its own?'
    }
  ],
  itemsVariant: 'accordion-standard'
});
