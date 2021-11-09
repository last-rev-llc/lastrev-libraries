import mockLink from '../Link/Link.mock';
import { mediaMock } from '../Media/Media.mock';
import { staticRichTextMock } from '../Text/Text.mock';

export default {
  __typename: 'Card',
  media: {
    ...mediaMock(),
    file: {
      url: 'https://i.picsum.photos/id/237/690/388.jpg?hmac=Zuv-CcXEfzBDJlr7G8wx67jMiWLssNTUppetu6ohvLc'
    }
  },
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(),

  actions: [{ ...mockLink(), text: 'Card link' }],
  sidekickLookup: {}
};
export const cardWithTags = {
  __typename: 'Card',
  media: {
    ...mediaMock(),
    file: {
      url: 'https://i.picsum.photos/id/237/690/388.jpg?hmac=Zuv-CcXEfzBDJlr7G8wx67jMiWLssNTUppetu6ohvLc'
    }
  },
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(),
  tags: [{ ...mockLink(), text: 'Tag 1' }, { ...mockLink(), text: 'Tag 2' }, { text: 'Tag 3 - Not clickable' }],
  actions: [{ ...mockLink(), text: 'Card link' }],
  sidekickLookup: {}
};
