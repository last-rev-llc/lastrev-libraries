import { lorem } from 'faker';
import { capitalize } from 'lodash';
import mockLink from '../Link/Link.mock';

export const mediaLeftTextRightMock = {
  __typename: 'Card',
  variant: 'media-left-text-right',
  media: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: capitalize(lorem.words(2))
  },
  title: 'App Intelligence',
  subtitle: 'Drive Organic Growth',
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
                'LRNS provides top-quality App Store Optimization data, allowing you to monitor your app’s marketplace performance inreal time. Develop a customized dashboard that tracks your daily downloads, delivers regular revenue reports, keeps you up-to-dateon user sentiment, and gives insights into how your competitorsare performing over time.',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  },
  actions: [{ ...mockLink, text: 'learn more' }]
};

export const mediaRightTextLeftMock = {
  ...mediaLeftTextRightMock,
  variant: 'media-right-text-left',
  media: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: capitalize(lorem.words(2))
  }
};

export const standardBlogMock = {
  __typename: 'Card',
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
  actions: [{ ...mockLink, text: 'read more', variant: 'button-outlined' }]
};

export const mediumIconCenterMock = {
  __typename: 'Card',
  variant: 'medium-icon-center',
  media: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: capitalize(lorem.words(2))
  },
  title: 'Measure Performance',
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
              value: 'Gain clear benchmarks on the performance of mobile companies',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  }
};

export const iconSmallLeftMock = {
  __typename: 'Card',
  variant: 'icon-small-left',
  media: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: capitalize(lorem.words(2))
  },
  title: 'Stay ahead of mobile trends and all your competitors',
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
                'Develop an organic user acquisition strategy with our powerful ASO products, and measure reach through app. Develop an organic user acquisition strategy with our powerful ASO',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  }
};

export const resourceMock = {
  __typename: 'Card',
  variant: 'resource',
  media: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: capitalize(lorem.words(2))
  },
  title: 'Mobile Gaming',
  subtitle: 'game intelligence',
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
                'The Q4 Data Digest from LRNS examines the most installed apps, trends in gaming, by category, geography, download and revenue, COVID-19 impact, and more.',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  },
  actions: [{ ...mockLink, text: 'download now' }]
};

export const quoteMock = {
  __typename: 'Card',
  variant: 'quote',
  media: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: capitalize(lorem.words(2))
  },
  title: 'Lorem Ipsum, Takeaway.com',
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
                '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.”',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  }
};

export const mediaMock = {
  __typename: 'Card',
  variant: 'media',
  media: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: capitalize(lorem.words(2))
  }
};

export const reasonMock = {
  __typename: 'Card',
  variant: 'reason',
  title: '#1 Reason',
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
              value: 'Take control of your user data.',
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
              value: 'Engage users. Discover trends without giving anything away.',
              marks: [],
              data: {}
            }
          ],
          data: {}
        },
        {
          nodeType: 'unordered-list',
          content: [
            {
              nodeType: 'list-item',
              content: [
                {
                  nodeType: 'paragraph',
                  content: [
                    {
                      nodeType: 'text',
                      value: 'Build custom audience segments',
                      marks: [],
                      data: {}
                    }
                  ],
                  data: {}
                }
              ],
              data: {}
            },
            {
              nodeType: 'list-item',
              content: [
                {
                  nodeType: 'paragraph',
                  content: [
                    {
                      nodeType: 'text',
                      value: 'Share only the data you need',
                      marks: [],
                      data: {}
                    }
                  ],
                  data: {}
                }
              ],
              data: {}
            },
            {
              nodeType: 'list-item',
              content: [
                {
                  nodeType: 'paragraph',
                  content: [
                    {
                      nodeType: 'text',
                      value: 'Never pay for fraudulent traffic',
                      marks: [],
                      data: {}
                    }
                  ],
                  data: {}
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
};

export const insightMock = {
  __typename: 'Card',
  variant: 'insight',
  media: {
    __typename: 'Media',
    file: {
      url: './MockImage.jpg'
    },
    alt: capitalize(lorem.words(2))
  },
  title: 'Usage Intelligence',
  subtitle: 'Competitive Technical Insights At Your Fingertips',
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
                'LRNS’s App Teardown product allows you to look under the hood of the market’s most successful apps.',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  }
};

export const defaultMock = {
  id: '5DZu46BLw1ZXoZCqAJtOwo',
  __typename: 'Card',
  sidekickLookup: {
    internalTitle: {
      contentId: '5DZu46BLw1ZXoZCqAJtOwo',
      contentTypeId: 'card',
      fieldName: 'internalTitle'
    },
    variant: {
      contentId: '5DZu46BLw1ZXoZCqAJtOwo',
      contentTypeId: 'card',
      fieldName: 'variant'
    },
    media: {
      contentId: '5DZu46BLw1ZXoZCqAJtOwo',
      contentTypeId: 'card',
      fieldName: 'media'
    },
    title: {
      contentId: '5DZu46BLw1ZXoZCqAJtOwo',
      contentTypeId: 'card',
      fieldName: 'title'
    },
    body: {
      contentId: '5DZu46BLw1ZXoZCqAJtOwo',
      contentTypeId: 'card',
      fieldName: 'body'
    },
    link: {
      contentId: '5DZu46BLw1ZXoZCqAJtOwo',
      contentTypeId: 'card',
      fieldName: 'link'
    },
    contentId: '5DZu46BLw1ZXoZCqAJtOwo',
    contentTypeId: 'card'
  },
  variant: 'default',
  media: [
    {
      id: '4UPgQvvkfI2YZVe7jT87rY',
      __typename: 'Media',
      sidekickLookup: {
        contentId: '4UPgQvvkfI2YZVe7jT87rY'
      },
      title: 'Screen Shot 2021-12-12 at 5.25.48 PM',
      variant: 'image',
      file: {
        url: '//images.ctfassets.net/o1orzsgogjpz/4UPgQvvkfI2YZVe7jT87rY/57697ccc3fbc0370b1b7ee0c5c1cef8a/Screen_Shot_2021-12-12_at_5.25.48_PM.png',
        extension: null,
        fileName: 'Screen Shot 2021-12-12 at 5.25.48 PM.png'
      }
    }
  ],
  title: 'Advertiser + Agency Solutions',
  subtitle: null,
  body: {
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
  actions: null,
  link: {
    id: 'EKub49WWeu3kseCQWNTOK',
    __typename: 'Link',
    sidekickLookup: {
      contentId: 'EKub49WWeu3kseCQWNTOK',
      contentTypeId: 'link'
    },
    text: null,
    href: '/topic/advertiser',
    variant: 'link',
    icon: null,
    iconPosition: 'Right'
  }
};

export const linksListMock = {
  id: '1hTBNRmxXcxgQEJ6TIs54h',
  __typename: 'Card',
  sidekickLookup: {
    internalTitle: {
      contentId: '1hTBNRmxXcxgQEJ6TIs54h',
      contentTypeId: 'card',
      fieldName: 'internalTitle'
    },
    variant: {
      contentId: '1hTBNRmxXcxgQEJ6TIs54h',
      contentTypeId: 'card',
      fieldName: 'variant'
    },
    title: {
      contentId: '1hTBNRmxXcxgQEJ6TIs54h',
      contentTypeId: 'card',
      fieldName: 'title'
    },
    actions: {
      contentId: '1hTBNRmxXcxgQEJ6TIs54h',
      contentTypeId: 'card',
      fieldName: 'actions'
    },
    articleItems: {
      contentId: '1hTBNRmxXcxgQEJ6TIs54h',
      contentTypeId: 'card',
      fieldName: 'articleItems'
    },
    contentId: '1hTBNRmxXcxgQEJ6TIs54h',
    contentTypeId: 'card'
  },
  variant: 'links list',
  media: null,
  title: 'Advertiser + Agency Solutions',
  subtitle: null,
  body: null,
  actions: [
    {
      id: '4GEjeEoTyo0xGNVRgmGlRJ',
      __typename: 'Link',
      sidekickLookup: {
        text: {
          contentId: '4GEjeEoTyo0xGNVRgmGlRJ',
          contentTypeId: 'article',
          fieldName: 'title'
        },
        contentId: '4GEjeEoTyo0xGNVRgmGlRJ',
        contentTypeId: 'article'
      },
      text: 'Proprietary Partner Integration Activation - All Partners [sample from site with bullets]',
      href: '/article/proprietary-partner-integration-activation-all-partners-sample-from-site',
      variant: null,
      icon: null,
      iconPosition: null
    },
    {
      id: '6wqLGnTcK9a4Vh5BRmt1wP',
      __typename: 'Link',
      sidekickLookup: {
        text: {
          contentId: '6wqLGnTcK9a4Vh5BRmt1wP',
          contentTypeId: 'article',
          fieldName: 'title'
        },
        contentId: '6wqLGnTcK9a4Vh5BRmt1wP',
        contentTypeId: 'article'
      },
      text: 'Article with 2 column grid for image and table',
      href: '/article/article-with-2-column-grid-for-image-and-table-last-rev-demo',
      variant: null,
      icon: null,
      iconPosition: null
    },
    {
      variant: 'button-text',
      icon: 'angle-right',
      iconPosition: 'Right',
      id: '6wqLGnTcK9a4Vh5BRmt1wP',
      __typename: 'Link',
      sidekickLookup: {
        text: {
          contentId: '6wqLGnTcK9a4Vh5BRmt1wP',
          contentTypeId: 'article',
          fieldName: 'title'
        },
        contentId: '6wqLGnTcK9a4Vh5BRmt1wP',
        contentTypeId: 'article'
      },
      text: 'View all',
      href: '/this-is-a-test'
    }
  ],
  link: null
};
