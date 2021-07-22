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
      url: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    },
    alt: 'Contemplative Lizard',
  },
  body: {
    __typename: 'Text',
    body: {
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
    }
  },
  actions: [{ ...mockLink, children: 'Hero CTA' }],
  theme: [mockTheme]
};
