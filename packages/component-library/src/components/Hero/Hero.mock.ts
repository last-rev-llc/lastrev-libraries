import { lorem } from 'faker';
import { capitalize } from 'lodash';
import mockLink from '../Link/Link.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  variant: 'centered',
  title: capitalize(lorem.words(3)),
  subtitle: lorem.sentence(),
  image: {
    __typename: 'Media',
    file: {
      url: 'https://images.ctfassets.net/m1b67l45sk9z/4Oj0gAEf0wFiPfg0R3QHqG/b1f835f3e380670cd6484e486c9816b1/it-gets-better.png?h=800'
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
          nodeType: 'ordered-list',
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: 'Item One',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: 'Item One',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            }
          ]
        }
      ]
    }
  },
  actions: [{ ...mockLink, text: 'Hero CTA' }],
  background: null,
  backgroundColor: 'white',
  contentHeight: 'xl',
  contentWidth: 'xl',
  theme: [mockTheme]
};
