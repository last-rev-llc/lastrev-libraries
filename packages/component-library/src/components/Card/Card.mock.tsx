import { lorem } from 'faker';
import { capitalize } from 'lodash';

export default {
  title: capitalize(lorem.word()),
  subtitle: capitalize(lorem.words(3)),
  body: lorem.sentence(),
  ctas: []
};
