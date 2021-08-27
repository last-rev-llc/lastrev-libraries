import { lorem } from 'faker';
import { capitalize } from 'lodash';
import mockLink from '../Link/Link.mock';
import { paragraphMock } from '../Text/Text.mock';

export default {
  __typename: 'Card',
  // variant: 'standard-blog',
  variant: 'profile',
  media: {
    __typename: 'Media',
    file: {
      url: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
    },
    alt: 'Contemplative Lizard'
  },
  title: capitalize(lorem.word()),
  subtitle: capitalize(lorem.words(3)),
  body: paragraphMock,
  actions: [{ ...mockLink }]
};
