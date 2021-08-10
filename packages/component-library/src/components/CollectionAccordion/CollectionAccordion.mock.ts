import mockAccordion from '../Accordion/Accordion.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  variant: 'collection-accordion',
  spacing: 2,
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
  itemsVariant: 'accordion-standard',
  theme: [mockTheme]
};
