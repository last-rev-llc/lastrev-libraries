import { lorem } from 'faker';
import { capitalize } from 'lodash';

export default {
  __typename: 'Accordion',
  internalTitle: 'hola!',
  variant: 'standard',
  items: [
    { title: capitalize(lorem.word()), variant: 'standard', body: lorem.sentence() },
    { title: capitalize(lorem.word()), variant: 'standard', body: lorem.sentence() },
    { title: capitalize(lorem.word()), variant: 'standard', body: lorem.sentence() }
  ],
  itemsVariant: 'standard',
  colorTitle: 'secondary',
  colorBody: 'textPrimary',
  sizeTitle: 'h3'
};
