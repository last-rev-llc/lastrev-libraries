import { lorem } from 'faker';
import { capitalize } from 'lodash';
import mockLink from '../Link/Link.mock';
import { paragraphMock } from '../Text/Text.mock';

export default {
  __typename: 'Card',
  // variant: 'standard-blog',
  variant: 'avatar',
  media: {
    __typename: 'Media',
    file: {
      url: 'https://i.picsum.photos/id/237/690/388.jpg?hmac=Zuv-CcXEfzBDJlr7G8wx67jMiWLssNTUppetu6ohvLc'
    },
    alt: 'Contemplative Lizard'
  },
  title: capitalize(lorem.word()),
  subtitle: capitalize(lorem.words(3)),
  body: paragraphMock,
  actions: [{ ...mockLink }]
};
