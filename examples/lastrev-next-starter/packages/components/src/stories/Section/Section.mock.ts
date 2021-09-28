import { lorem } from 'faker';
import { capitalize } from 'lodash';
import { logosMock, smallIconLeftCardsMock, insightCardsMock } from '../Collection/Collection.mock';
import { mediaLeftTextRightMock, mediaRightTextLeftMock } from '../Card/Card.mock';
import linkMock from '../Link/Link.mock';

export const mediaWithTextSectionMock = {
  __typename: 'Section',
  id: 'mediaWithTextSection',
  variant: 'media',
  contentSpacing: 2,
  contents: [
    {
      __typename: 'Text',
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-3',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Trusted by leaders in mobile',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        }
      }
    },
    { ...logosMock }
  ]
};

export const mediaWithComplexTextSectionMock = {
  __typename: 'Section',
  id: 'mediaWithTextSection',
  variant: 'media',
  contentSpacing: 2,
  contents: [
    {
      __typename: 'Text',
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-3',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Trusted by leaders in mobile',
                  marks: [
                    {
                      type: 'bold'
                    }
                  ],
                  data: {}
                }
              ]
            },
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value:
                    'Robust algorithms and hundreds of millions of data points power Store Intelligence, enabling deep and actionable insight into the App Store and Google Play. Store Intelligence offers unparalleled web-based analysis of downloads and revenue estimates for millions of apps, thousands of publishers, and all major countries and categories.',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            }
          ]
        }
      }
    },
    { ...logosMock }
  ]
};

export const standardMock = {
  __typename: 'Section',
  id: 'standard',
  variant: 'standard',
  contentSpacing: 2,
  contents: [
    {
      __typename: 'Text',
      variant: 'default',
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-3',
              content: [
                {
                  nodeType: 'text',
                  value: 'Gain Valuable Insights On',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            },
            {
              nodeType: 'heading-3',
              content: [
                {
                  nodeType: 'text',
                  value: 'The Greater App Economy',
                  marks: [
                    {
                      type: 'bold'
                    }
                  ],
                  data: {}
                }
              ],
              data: {}
            }
          ]
        }
      }
    },
    mediaLeftTextRightMock,
    mediaRightTextLeftMock,
    {
      ...mediaLeftTextRightMock,
      media: {
        ...mediaLeftTextRightMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    }
  ]
};

export const standardWithCollectionMock = {
  __typename: 'Section',
  id: 'standardWithCollection',
  variant: 'standard',
  contentSpacing: 2,
  contents: [
    {
      __typename: 'Text',
      variant: 'default',
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-3',
              content: [
                {
                  nodeType: 'text',
                  value: 'Data to Answer Critical',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            },
            {
              nodeType: 'heading-3',
              content: [
                {
                  nodeType: 'text',
                  value: 'Business Questions',
                  marks: [
                    {
                      type: 'bold'
                    }
                  ],
                  data: {}
                }
              ],
              data: {}
            }
          ]
        }
      }
    },
    smallIconLeftCardsMock
  ]
};

export const featuredMock = {
  __typename: 'Section',
  id: 'featured',
  variant: 'featured',
  contentSpacing: 2,
  backgroundColor: 'primary',
  contents: [
    {
      __typename: 'Text',
      variant: 'default',
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-2',
              content: [
                {
                  nodeType: 'text',
                  value: 'New Product',
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
              nodeType: 'heading-3',
              content: [
                {
                  nodeType: 'text',
                  value: 'Usage Intelligence',
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
              nodeType: 'heading-3',
              content: [
                {
                  nodeType: 'text',
                  value: 'Business Questions',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            },
            {
              nodeType: 'hr',
              content: [],
              data: {}
            },
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value:
                    'Sensor Tower’s powerful Usage Intelligence product models mobile app retention, demographics, and engagement across all markets. Get clear and concise data on mobile user behavior, and how apps retain audiences over time.',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            },
            {
              nodeType: 'embedded-entry-block',
              content: [],
              data: {
                target: {
                  sys: {
                    id: '1Qlyxq50il7JmW50GGIrNN',
                    type: 'Link',
                    linkType: 'Entry'
                  }
                }
              }
            }
          ]
        },
        links: {
          entries: [
            {
              __typename: 'Link',
              id: '1Qlyxq50il7JmW50GGIrNN',
              sidekickLookup: {
                href: {
                  contentId: '1Qlyxq50il7JmW50GGIrNN',
                  contentTypeId: 'link',
                  fieldName: 'href'
                },
                contentId: '1Qlyxq50il7JmW50GGIrNN',
                contentTypeId: 'link'
              },
              text: 'learn more',
              href: '/other-page#when-where-how',
              variant: 'button-contained',
              color: 'secondary'
            }
          ],
          assets: []
        }
      }
    },
    {
      __typename: 'Media',
      file: {
        url: './MockImage.jpg'
      },
      alt: capitalize(lorem.words(2))
    }
  ]
};

export const standardWithInsightCollectionMock = {
  __typename: 'Section',
  id: 'standardWithInsightCollection',
  variant: 'standard',
  contentSpacing: 2,
  contents: [
    {
      __typename: 'Text',
      variant: 'default',
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-3',
              content: [
                {
                  nodeType: 'text',
                  value: 'LRNS Insights',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            },
            {
              nodeType: 'heading-3',
              content: [
                {
                  nodeType: 'text',
                  value: '& Thoughts ',
                  marks: [],
                  data: {}
                },
                {
                  nodeType: 'text',
                  value: 'Blog',
                  marks: [
                    {
                      type: 'bold'
                    }
                  ],
                  data: {}
                }
              ],
              data: {}
            }
          ]
        }
      }
    },
    insightCardsMock
  ]
};

export const textWithLinksmock = {
  __typename: 'Section',
  id: 'standardWithInsightCollection',
  variant: 'default',
  contentSpacing: 2,
  backgroundColor: 'text.primary',
  contents: [
    {
      __typename: 'Text',
      variant: 'default',
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-2',
              content: [
                {
                  nodeType: 'text',
                  value: 'Ready to get started?',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            }
          ]
        }
      }
    },
    {
      __typename: 'Section',
      contents: [
        { ...linkMock, text: 'Schedule demo', variant: 'button-contained', color: 'secondary' },
        { ...linkMock, text: 'sign up for free', variant: 'button-outlined', color: 'secondary' }
      ]
    }
  ],
  styles: {
    root: {
      '& [class*="Text-root"]': {
        textAlign: 'center',
        color: 'white',
        paddingBottom: 2
      },
      '.MuiGrid-container': {
        '& .MuiGrid-item:nth-of-type(2)': {
          '.MuiGrid-container': {
            '& .MuiGrid-item:nth-of-type(1)': {
              textAlign: 'right',
              paddingRight: 2
            },
            '& .MuiGrid-item:nth-of-type(2)': {
              paddingLeft: 2
            }
          }
        }
      }
    }
  }
};
