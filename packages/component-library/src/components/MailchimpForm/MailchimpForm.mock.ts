import { lorem } from 'faker';
import { capitalize } from 'lodash';
import mockLink from '../Link/Link.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  variant: 'default',
  title: capitalize(lorem.words(3)),
  subtitle: lorem.sentence(),
  image: {
    __typename: 'Media',
    file: {
      url: 'https://images.ctfassets.net/m1b67l45sk9z/1BOSe14Ig8b1nEpEe76UZJ/b88c975ad512e365e27b7c4d8c708467/StarPlant.svg'
    },
    alt: 'Contemplative Lizard'
  },
  body: {
    __typename: 'Text',
    document: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: lorem.sentences(2),
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  },
  successMessage: {
    __typename: 'Text',
    document: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'You have successfully subscribed!',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  },

  actions: [{ text: 'Join now', variant: 'button-contained' }],
  theme: [mockTheme]
};
