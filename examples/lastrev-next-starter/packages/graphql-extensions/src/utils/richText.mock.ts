import { Document } from '@contentful/rich-text-types';

const mockRichText = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      content: [
        { nodeType: 'text', value: 'Enhanced ', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: '/blog/1' },
          content: [{ nodeType: 'text', value: 'Some Text', marks: [], data: {} }]
        },
        {
          nodeType: 'text',
          value: ' does something else.',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'heading-2',
      content: [{ nodeType: 'text', value: 'A Section Header', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'Lorem ipsum',
          marks: [],
          data: {}
        },
        {
          nodeType: 'hyperlink',
          data: { uri: '#testLink' },
          content: [{ nodeType: 'text', value: 'Test Link', marks: [], data: {} }]
        },
        {
          nodeType: 'text',
          value: 'This is more text here. ',
          marks: [],
          data: {}
        }
      ],
      data: {}
    }
  ]
} as Document;

export default mockRichText;
