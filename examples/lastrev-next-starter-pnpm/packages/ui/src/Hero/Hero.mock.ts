import { lorem } from 'faker';
import { capitalize } from 'lodash';
import { HeroProps } from './Hero.types';
import { linkMock } from '../Link/Link.mock';
import { mediaMock } from '../Media/Media.mock';

export const baseMock = (): HeroProps => ({
  id: 'hero',
  __typename: 'Hero',
  variant: 'default',
  // overline: capitalize(lorem.words(3)),
  title: capitalize(lorem.words(3)),
  subtitle: lorem.sentence(),
  images: [mediaMock()],
  body: {
    __typename: 'RichText',
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
    },
    links: {
      entries: [],
      assets: []
    }
  },
  actions: [linkMock({ text: 'Hero CTA' })],
  background: mediaMock(),
  backgroundColor: 'white'
  // contentHeight: 'xl',
  // contentWidth: 'xl'
});

export default baseMock;
