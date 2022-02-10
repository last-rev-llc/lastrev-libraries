import mockLink from '../Link/Link.mock';

export const homepageMock = {
  __typename: 'Hero',
  variant: 'default',
  title: 'Data that Drives',
  subtitle: 'App Growth',
  image: null,
  contentWidth: 'xl',
  body: {
    __typename: 'Text',
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'LRNS equips you with the ',
              marks: [],
              data: {}
            },
            {
              nodeType: 'text',
              value: 'data and insights',
              marks: [
                {
                  type: 'bold'
                }
              ],
              data: {}
            }
          ],
          data: {}
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'needed to master the mobile app ecosystem.',
              marks: [],
              data: {}
            }
          ],
          data: {}
        }
      ]
    }
  },
  actions: [
    { ...mockLink, text: 'Request a demo' },
    { ...mockLink, text: 'sign up for free', variant: 'button-outlined', color: 'secondary' }
  ],
  background: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: 'Homepage'
  }
};

export const productMock = {
  __typename: 'Hero',
  variant: 'product',
  title: 'Product:',
  subtitle: 'Custom Alerts',
  image: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
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
          content: [
            {
              nodeType: 'text',
              value: 'Accurate download & app revenue',
              marks: [],
              data: {}
            }
          ],
          data: {}
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'estimates that drive strategic decisions',
              marks: [],
              data: {}
            }
          ],
          data: {}
        }
      ]
    }
  },
  actions: [{ ...mockLink, text: 'Schedule demo', color: 'secondary' }]
};

export const solutionMock = {
  __typename: 'Hero',
  variant: 'default',
  contentWidth: 'xl',
  title: 'Solution:',
  subtitle: 'Strategy & Partnerships',
  image: null,
  body: {
    __typename: 'Text',
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Accurate download & app revenue estimates that drive strategic decisions',
              marks: [],
              data: {}
            }
          ],
          data: {}
        }
      ]
    }
  },
  actions: [
    { ...mockLink, text: 'Request demo' },
    { ...mockLink, text: 'contact us', variant: 'button-outlined', color: 'secondary' }
  ],
  background: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: 'Solution'
  }
};

export const backgroundMock = {
  __typename: 'Hero',
  variant: 'default',
  background: {
    __typename: 'Media',
    desktop: {
      file: {
        url: './MockImage.jpg'
      }
    },
    mobile: {
      file: {
        url: './MockImage.jpg'
      }
    },
    alt: 'Pathmatics'
  }
};

export const heightMediumMock = {
  id: '6hdImKPtzJI2dn7nhezT1i',
  __typename: 'Hero',
  sidekickLookup: {
    internalTitle: {
      contentId: '6hdImKPtzJI2dn7nhezT1i',
      contentTypeId: 'hero',
      fieldName: 'internalTitle'
    },
    variant: {
      contentId: '6hdImKPtzJI2dn7nhezT1i',
      contentTypeId: 'hero',
      fieldName: 'variant'
    },
    title: {
      contentId: '6hdImKPtzJI2dn7nhezT1i',
      contentTypeId: 'hero',
      fieldName: 'title'
    },
    actions: {
      contentId: '6hdImKPtzJI2dn7nhezT1i',
      contentTypeId: 'hero',
      fieldName: 'actions'
    },
    body: {
      contentId: '6hdImKPtzJI2dn7nhezT1i',
      contentTypeId: 'hero',
      fieldName: 'body'
    },
    backgroundColor: {
      contentId: '6hdImKPtzJI2dn7nhezT1i',
      contentTypeId: 'hero',
      fieldName: 'backgroundColor'
    },
    contentHeight: {
      contentId: '6hdImKPtzJI2dn7nhezT1i',
      contentTypeId: 'hero',
      fieldName: 'contentHeight'
    },
    contentId: '6hdImKPtzJI2dn7nhezT1i',
    contentTypeId: 'hero'
  },
  variant: 'Height - Med',
  internalTitle: 'Homepage: Hero [LAST REV DEMO]',
  title: 'How can we help you?',
  subtitle: null,
  backgroundColor: 'Black',
  contentWidth: null,
  contentHeight: 'md',
  background: null,
  body: {
    id: null,
    __typename: 'RichText',
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: 'Common topics: ',
              nodeType: 'text'
            },
            {
              data: {
                uri: 'https://help.integralplatform.com/topic1'
              },
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'topic 1',
                  nodeType: 'text'
                }
              ],
              nodeType: 'hyperlink'
            },
            {
              data: {},
              marks: [],
              value: ', ',
              nodeType: 'text'
            },
            {
              data: {
                uri: 'https://help.integralplatform.com/topic2'
              },
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'topic 2',
                  nodeType: 'text'
                }
              ],
              nodeType: 'hyperlink'
            },
            {
              data: {},
              marks: [],
              value: ', ',
              nodeType: 'text'
            },
            {
              data: {
                uri: 'https://help.integralplatform.com/topic3'
              },
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'topic 3',
                  nodeType: 'text'
                }
              ],
              nodeType: 'hyperlink'
            },
            {
              data: {},
              marks: [],
              value: '',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    },
    links: {
      entries: [],
      assets: []
    }
  },
  image: null,
  actions: [
    {
      id: '5V1NAD8P2Cp4AsCMNFomZf',
      __typename: 'Link',
      sidekickLookup: {
        contentId: '5V1NAD8P2Cp4AsCMNFomZf',
        contentTypeId: 'moduleIntegration'
      },
      text: null,
      href: '#',
      variant: null,
      icon: null,
      iconPosition: null
    }
  ]
};

export default homepageMock;
