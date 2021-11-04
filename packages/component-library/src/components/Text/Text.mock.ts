import { lorem } from 'faker';
import { capitalize } from 'lodash';
import { TextProps } from './Text';

export const valueNode = (type: string = 'text') => ({
  data: {},
  marks: [],
  value: lorem.sentence(),
  nodeType: type
});

export const contentNode = (content: any[] = [valueNode()], nodeType: string = 'paragraph') => ({
  nodeType,
  data: {},
  content
});

export const itemNode = (content: any[] = [contentNode()]) => contentNode(content, 'list-item');

export const listNode = (content: any[] = [itemNode()], nodeType: 'ordered-list' | 'unordered-list' = 'unordered-list') => ({
  data: {},
  content,
  nodeType
});

export const hyperlinkNode = () => ({
  data: {
    target: {
      sys: {
        id: "12345",
        type: "Link",
        linkType: "Entry"
      }
    }
  },
  content: [
    {
      marks: [],
      value: "the link text",
      nodeType: "text"
    }
  ],
  nodeType: "entry-hyperlink"
});

export const dynamicMock = (content: any[]) => ({
  __typename: 'Text',
  body: {
    json: {
      nodeType: 'document',
      data: {},
      content
    }
  }
});

export const complexMock = (): TextProps => ({
  __typename: 'Text',
  body: {
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: lorem.sentence(),
              nodeType: 'text'
            },
            {
              data: {},
              marks: [
                {
                  type: 'bold'
                }
              ],
              value: ' Bold, ',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [
                {
                  type: 'italic'
                }
              ],
              value: 'italic and ',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [
                {
                  type: 'italic'
                },
                {
                  type: 'underline'
                }
              ],
              value: 'underline.',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: 'This is a list:',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        },
        {
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
                      value: 'Item Two',
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
                      value: 'Item Three',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            }
          ],
          nodeType: 'unordered-list'
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: lorem.paragraph(),
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ]
    }
  }
});

export const richTextMock = (): TextProps => ({
  __typename: 'Text',
  body: {
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
    },
    links: {
      entries: [],
      assets: []
    }
  }
});

export const staticRichTextMock = (): TextProps => ({
  body: {
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
              value: 'This a paragraph of static text',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    },
    links: {
      entries: [],
      assets: []
    }
  }
});

export const paragraphMock = (): TextProps => ({
  __typename: 'Text',
  body: {
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
    },
    links: {
      entries: [],
      assets: []
    }
  }
});

export default (): TextProps => ({
  __typename: 'Text',
  body: {
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'heading-2',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: capitalize(lorem.words(2)),
              marks: [],
              data: {}
            }
          ]
        },
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
        },
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://url.org',
            target: {
              sys: {
                id: '12345',
                type: 'Link',
                linkType: 'Entry'
              }
            }
          },
          content: [
            {
              nodeType: 'text',
              value: 'Heyo',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  }
});
