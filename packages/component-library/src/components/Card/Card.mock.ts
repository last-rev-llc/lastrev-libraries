import { lorem } from 'faker';
import { capitalize } from 'lodash';
import mockLink from '../Link/Link.mock';

export default {
  __typename: 'Card',
  variant: 'standard-blog',
  media: {
    __typename: 'Media',
    file: {
      url: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
    },
    alt: 'Contemplative Lizard'
  },
  title: capitalize(lorem.word()),
  subtitle: capitalize(lorem.words(3)),
  body: lorem.sentence(),
  actions: [{ ...mockLink }, { ...mockLink }]
};
