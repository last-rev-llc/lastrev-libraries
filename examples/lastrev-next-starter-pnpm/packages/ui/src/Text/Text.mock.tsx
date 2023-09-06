import React from 'react';
import { lorem } from 'faker';
import BLOCKS from './BLOCKS';
import MARKS from './MARKS';

import { TextProps, RichText } from './Text.types';

export const valueNode = (type: string = 'text') => ({
  data: {},
  marks: [],
  value: lorem.sentence(),
  nodeType: type
});

export const contentNode = (content: any[] = [valueNode()], nodeType: string = 'paragraph'): any => ({
  nodeType,
  data: {},
  content
});

const embeddedNode = (nodeType: string, id: string, isEntry: boolean = true) => ({
  nodeType,
  content: [],
  data: { target: { sys: { id, type: 'Link', linkType: isEntry ? 'Entry' : 'Asset' } } }
});

export const embeddedEntryInlineNode = (id: string) => embeddedNode('embedded-entry-inline', id);

export const embeddedEntryBlockNode = (id: string) => embeddedNode('embedded-entry-block', id);

export const embeddedAssetBlockNode = (id: string) => embeddedNode('embedded-asset-block', id, false);

export const itemNode = (content: any[] = [contentNode()]) => contentNode(content, 'list-item');

export const listNode = (
  content: any[] = [itemNode()],
  nodeType: 'ordered-list' | 'unordered-list' = 'unordered-list'
) => ({
  data: {},
  content,
  nodeType
});

export const hyperlinkNode = (text: string, url: string) => ({
  nodeType: 'hyperlink',
  content: [{ nodeType: 'text', value: text, marks: [], data: {} }],
  data: { uri: url }
});

export const hyperlinkEntryNode = (id: string) => ({
  data: {
    target: { sys: { id, type: 'Link', linkType: 'Entry' } }
  },
  content: [{ marks: [], value: lorem.words(2), nodeType: 'text' }],
  nodeType: 'entry-hyperlink'
});

export const dynamicMock = (content: any[], entries: any[] = [], assets: any[] = []) => ({
  __typename: 'Text',
  body: {
    json: {
      nodeType: 'document',
      data: {},
      content
    },
    links: { entries, assets }
  }
});

export const complexMock = ({ text } = {}): TextProps => ({
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
              value: text ?? lorem.sentence(),
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

export const richTextMock = ({ text } = {}): RichText => ({
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
            value: text ?? lorem.sentences(2),
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
});

export const withLinksMock = ({ text } = {}): TextProps => ({
  __typename: 'Text',
  body: {
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'heading-5',
          data: {},
          marks: [],
          content: [
            {
              nodeType: 'hyperlink',
              data: {
                uri: '/blog?category=1'
              },
              marks: [],
              content: [
                {
                  nodeType: 'text',
                  value: 'Example Project',
                  data: {},
                  marks: []
                }
              ]
            },
            {
              nodeType: 'text',
              value: ' • June 2022',
              data: {},
              marks: []
            }
          ]
        },
        {
          nodeType: 'heading-6',
          data: {},
          marks: [],
          content: [
            {
              nodeType: 'hyperlink',
              data: {
                uri: '/blog/a-blog-link'
              },
              marks: [],
              content: [
                {
                  nodeType: 'text',
                  value: 'Project grows and expands with customer success',
                  data: {},
                  marks: []
                }
              ]
            }
          ]
        },
        {
          nodeType: 'paragraph',
          data: {},
          marks: [],
          content: [
            {
              nodeType: 'text',
              value: text ?? lorem.sentences(2),
              data: {},
              marks: []
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

export const staticRichTextMock = (): RichText => ({
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
});

export const formattedMock = () => ({
  ...complexMock(),
  renderNode: {
    [BLOCKS.UL_LIST]: (_: any, children: any) => {
      return <ul style={{ color: 'red' }}>{children}</ul>;
    },
    [BLOCKS.LIST_ITEM]: (_: any, children: any) => {
      return <li>{children}</li>;
    }
  },
  renderMark: {
    [MARKS.BOLD]: (text: string) => <b style={{ color: 'red' }}>{text}</b>,
    [MARKS.ITALIC]: (text: string) => <i>{text}</i>,
    [MARKS.UNDERLINE]: (text: string) => <u>{text}</u>,
    [MARKS.CODE]: (text: string) => <code>{text}</code>,
    [MARKS.SUPERSCRIPT]: (text: string) => <sup>{text}</sup>,
    [MARKS.SUBSCRIPT]: (text: string) => <sub>{text}</sub>
  }
});

export const paragraphMock = ({ text } = {}): TextProps => ({
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
              value: text ?? lorem.sentences(2),
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
export const baseMock = (): TextProps => ({
  __typename: 'Text',
  body: {
    json: {
      nodeType: 'document',
      data: {},
      content: [
        ...[1, 2, 3, 4, 5, 6].map((level) => ({
          nodeType: `heading-${level}`,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: `Heading ${level}`,
              marks: [],
              data: {}
            }
          ]
        })),

        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: `Paragraph`,
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
              value: 'Hyperlink',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  }
});

export default baseMock;
