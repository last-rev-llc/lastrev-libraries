import { mediumIconCenterMock, mediaMock, iconSmallLeftMock, insightMock } from '../Card/Card.mock';

export const mediumIconCenterCollectionMock = {
  __typename: 'Collection',
  itemsSpacing: 2,
  variant: 'collection-medium-icon-center',
  items: [{ ...mediumIconCenterMock }, { ...mediumIconCenterMock }, { ...mediumIconCenterMock }],
  itemsVariant: 'medium-icon-center'
};

export const logosMock = {
  __typename: 'Collection',
  itemsSpacing: 2,
  variant: 'logos',
  items: [
    { ...mediaMock },
    {
      ...mediaMock,
      media: {
        ...mediaMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...mediaMock,
      media: {
        ...mediaMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...mediaMock,
      media: {
        ...mediaMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...mediaMock,
      media: {
        ...mediaMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...mediaMock,
      media: {
        ...mediaMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    }
  ],
  itemsVariant: 'media'
  // theme: [] // PASSING A THEME BREAKS THE VARIANT MAPPING
};

export const smallIconLeftCardsMock = {
  __typename: 'Collection',
  itemsSpacing: 2,
  variant: 'collection-three-per-row',
  items: [
    { ...iconSmallLeftMock },
    {
      ...iconSmallLeftMock,
      media: {
        ...iconSmallLeftMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...iconSmallLeftMock,
      media: {
        ...iconSmallLeftMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    }
  ],
  itemsVariant: 'iconSmallLeftMock'
};

export const insightCardsMock = {
  __typename: 'Collection',
  itemsSpacing: 2,
  variant: 'collection-three-per-row',
  items: [
    { ...insightMock },
    {
      ...insightMock,
      media: {
        ...insightMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...insightMock,
      media: {
        ...insightMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    }
  ],
  itemsVariant: 'insight'
};

export const fourPerRowMock = {
  id: '5wet4dFwz3cAIkMq1aa7ha',
  __typename: 'Collection',
  sidekickLookup: {
    contentId: '5wet4dFwz3cAIkMq1aa7ha',
    contentTypeId: 'collection'
  },
  variant: 'four-per-row',
  itemsVariant: 'default',
  itemsWidth: null,
  itemsSpacing: 5,
  theme: null,
  settings: null,
  items: [
    {
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
    },
    {
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
            url: '//images.ctfassets.net/o1orzsgogjpz/2esDUKNrSPFfj0GG7CKSsP/ffed474424c709022b789ce9553ebb31/Screen_Shot_2022-01-10_at_21.01.33.png',
            extension: null,
            fileName: 'Screen Shot 2021-12-12 at 5.25.48 PM.png'
          }
        }
      ],
      title: 'Product Guidance',
      subtitle: null,
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
    },
    {
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
            url: '//images.ctfassets.net/o1orzsgogjpz/1ghf1KJ3rscUa8CZShkmxO/ba0cdad3d379e5ec6492a2f5822390b5/Screen_Shot_2022-01-10_at_21.01.43.png',
            extension: null,
            fileName: 'Screen Shot 2021-12-12 at 5.25.48 PM.png'
          }
        }
      ],
      title: 'Programatic Solutions',
      subtitle: null,
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
    },
    {
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
            url: '//images.ctfassets.net/o1orzsgogjpz/cJy3bHXBMRlfiTEWIBISy/1991a1aeca0df54c2cdfe683cf74d0dd/Screen_Shot_2022-01-10_at_10.26.59.png',
            extension: null,
            fileName: 'Screen Shot 2021-12-12 at 5.25.48 PM.png'
          }
        }
      ],
      title: 'Publisher + Platform Solutions',
      subtitle: null,
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
    }
  ]
};

export const fourPerRowLinksListMock = {
  id: '5wet4dFwz3cAIkMq1aa7ha',
  __typename: 'Collection',
  sidekickLookup: {
    contentId: '5wet4dFwz3cAIkMq1aa7ha',
    contentTypeId: 'collection'
  },
  variant: 'four-per-row',
  itemsVariant: 'links list',
  itemsWidth: 'xl',
  itemsSpacing: 3,
  theme: null,
  settings: null,
  introText: {
    id: '3XXKYZIWi4i76qmjSBMqO8',
    __typename: 'Text',
    sidekickLookup: {
      internalTitle: {
        contentId: '3XXKYZIWi4i76qmjSBMqO8',
        contentTypeId: 'text',
        fieldName: 'internalTitle'
      },
      variant: {
        contentId: '3XXKYZIWi4i76qmjSBMqO8',
        contentTypeId: 'text',
        fieldName: 'variant'
      },
      body: {
        contentId: '3XXKYZIWi4i76qmjSBMqO8',
        contentTypeId: 'text',
        fieldName: 'body'
      },
      contentId: '3XXKYZIWi4i76qmjSBMqO8',
      contentTypeId: 'text'
    },
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
                value: 'Top Articles',
                nodeType: 'text'
              }
            ],
            nodeType: 'heading-2'
          },
          {
            data: {},
            content: [
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
    align: null,
    variant: 'default'
  },
  items: [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    }
  ]
};
