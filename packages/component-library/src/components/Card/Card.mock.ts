import mockLink from '../Link/Link.mock';
import { mediaMock } from '../Media/Media.mock';
import { staticRichTextMock } from '../Text/Text.mock';

export default {
  __typename: 'Card',
  variant: 'profile-row',
  media: {
    ...mediaMock,
    file: {
      url: 'https://i.picsum.photos/id/237/690/388.jpg?hmac=Zuv-CcXEfzBDJlr7G8wx67jMiWLssNTUppetu6ohvLc'
    }
  },
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock,
  actions: [{ ...mockLink, text: 'Card link' }],
  sidekickLookup: {}
};
