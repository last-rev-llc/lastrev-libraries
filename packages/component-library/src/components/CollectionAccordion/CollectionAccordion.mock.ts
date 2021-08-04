import { lorem } from 'faker';
import { capitalize } from 'lodash';

export default {
  __typename: 'CollectionAccordion',
  internalTitle: 'hola!',
  variant: 'accordion-standard',
  title: capitalize(lorem.word()),
  body: capitalize(lorem.words(3))
};
