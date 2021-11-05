import { lorem } from 'faker';
import { capitalize } from 'lodash';
import { TextProps } from './Text';

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

export const listNode = (content: any[] = [itemNode()], nodeType: 'ordered-list' | 'unordered-list' = 'unordered-list') => ({
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
    target: { sys: { id, type: "Link", linkType: "Entry" } }
  },
  content: [
    { marks: [], value: lorem.words(2), nodeType: "text" }
  ],
  nodeType: "entry-hyperlink"
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
  },
  
});

const embeddedMock = () => {
  return {
    body: {
      id: 'embedded-entries',
      __typename: 'Text',
      json: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'embedded-entry-inline',
                content: [],
                data: { target: { sys: { id: '6RWpWwgg7OlVxXCprgw7un', type: 'Link', linkType: 'Entry' } } }
              }
            ],
            data: {}
          },
          {
            nodeType: 'embedded-entry-block',
            content: [],
            data: { target: { sys: { id: '4ir4lbAY9NfnV0eZmBu1rV', type: 'Link', linkType: 'Entry' } } }
          },
          {
            nodeType: 'embedded-asset-block',
            content: [],
            data: { target: { sys: { id: '1BOSe14Ig8b1nEpEe76UZJ', type: 'Link', linkType: 'Asset' } } }
          },
          {
            nodeType: 'hyperlink',
            content: [{ nodeType: 'text', value: 'Test Link', marks: [], data: {} }],
            data: { uri: 'https://www.example.com' }
          }
        ]
      },
      links: {
        entry: [
          {
            __typename: 'Link',
            id: '6RWpWwgg7OlVxXCprgw7un',
            sidekickLookup: { contentId: '6RWpWwgg7OlVxXCprgw7un', contentTypeId: 'link' },
            text: 'Ask Us Anything',
            href: '/about-us',
            variant: 'link',
            icon: null,
            iconPosition: null
          },
          { __typename: 'Media', id: '4ir4lbAY9NfnV0eZmBu1rV' }
        ],
        assets: [
          {
            id: '1BOSe14Ig8b1nEpEe76UZJ',
            __typename: 'Media',
            title: 'Star Plant',
            variant: 'image',
            file: {
              url: '//images.ctfassets.net/m1b67l45sk9z/1BOSe14Ig8b1nEpEe76UZJ/b88c975ad512e365e27b7c4d8c708467/StarPlant.svg',
              extension: null,
              fileName: 'StarPlant.svg'
            }
          }
        ]
      }
    }
  };
};


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
