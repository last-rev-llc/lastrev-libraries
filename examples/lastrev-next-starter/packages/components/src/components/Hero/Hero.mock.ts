import { lorem } from 'faker';
import { capitalize } from 'lodash';
import { HeroProps } from './Hero';
import mockLink from '../Link/Link.mock';
import mockTheme from '../../theme';

export default (): HeroProps => ({
  id: 'hero',
  __typename: 'Hero',
  variant: 'default',
  overline: capitalize(lorem.words(3)),
  title: capitalize(lorem.words(3)),
  subtitle: 'Salutantibus vitae elit libero, a pharetra augue. Contra legem facit qui id facit quod lex prohibet.',
  image: {
    file: {
      url: 'https://images.ctfassets.net/m1b67l45sk9z/4Oj0gAEf0wFiPfg0R3QHqG/b1f835f3e380670cd6484e486c9816b1/it-gets-better.png?h=800'
    },
    title: 'Morbi fringilla convallis sapien, id pulvinar odio volutpat.'
  },
  body: {
    // __typename: 'Text',
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
  actions: [{ ...mockLink(), text: 'Hero CTA' }],
  background: {
    file: {
      url: 'https://i.picsum.photos/id/327/2800/800.jpg?hmac=lqhEpkLvfvBfoZSxszEf8pOTbitkmHpJmZsoQYcrWkI'
    },
    title: lorem.sentence()
  },
  backgroundColor: 'white',
  contentHeight: 'sm',
  contentWidth: 'xl'
});
