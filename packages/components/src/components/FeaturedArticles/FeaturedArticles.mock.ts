import { lorem, datatype } from 'faker';
import { capitalize } from 'lodash';

import mockLink from '../../stories/Link/Link.mock';

const articlesMock = [
  {
    id: datatype.uuid(),
    media: {
      __typename: 'Media',
      file: {
        url: './MockImage.jpg'
      },
      alt: capitalize(lorem.words(2))
    },
    title: 'Lords Mobile Revenue Doubled to $90 Million',
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
                value:
                  'The Q4 Data Digest from LRNS examines the most installed apps, trends in gaming, by category, geography, download and revenue.',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }
    },
    link: { ...mockLink },
  },
  {
    id: datatype.uuid(),
    variant: 'standard-blog',
    media: {
      __typename: 'Media',
      file: {
        url: './MockImage.jpg'
      },
      alt: capitalize(lorem.words(2))
    },
    title: 'Lords Mobile Revenue Doubled to $90 Million',
    subtitle: 'app intelligence • march 2021',
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
                value:
                  'The Q4 Data Digest from LRNS examines the most installed apps, trends in gaming, by category, geography, download and revenue.',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }
    },
    link: { ...mockLink },
  },
  {
    id: datatype.uuid(),
    variant: 'standard-blog',
    media: {
      __typename: 'Media',
      file: {
        url: './MockImage.jpg'
      },
      alt: capitalize(lorem.words(2))
    },
    title: 'Lords Mobile Revenue Doubled to $90 Million',
    subtitle: 'app intelligence • march 2021',
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
                value:
                  'The Q4 Data Digest from LRNS examines the most installed apps, trends in gaming, by category, geography, download and revenue.',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }
    },
    link: { ...mockLink },
  }
];

export default articlesMock;
