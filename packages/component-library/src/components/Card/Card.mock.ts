import { lorem } from 'faker';
import { capitalize } from 'lodash';
import mockLink from '../Link/Link.mock';
import { paragraphMock } from '../Text/Text.mock';

export default {
  __typename: 'Card',
  variant: 'profile-row',
  media: {
    __typename: 'Media',
    file: {
      url: 'https://i.picsum.photos/id/237/690/388.jpg?hmac=Zuv-CcXEfzBDJlr7G8wx67jMiWLssNTUppetu6ohvLc'
    },
    alt: capitalize(lorem.words(2))
  },
  title: capitalize(lorem.words(2)),
  subtitle: capitalize(lorem.words(3)),
  body: paragraphMock,
  actions: [{ ...mockLink }]
};
