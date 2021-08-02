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
      url: 'https://images.ctfassets.net/m1b67l45sk9z/4jtNAOSr68TdEVcsuuEPoh/1443dafc62dc2d264fbca495f0f20c09/Exampleimage.png'
    },
    alt: 'Not Alone'
  },
  body: {
    __typename: 'Text',
    json: {
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
  actions: [{ ...mockLink, children: 'Hero CTA' }],
  theme: [mockTheme]
};
