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
                'Sensor Tower provides top-quality App Store Optimization data, allowing you to monitor your app’s marketplace performance inreal time. Develop a customized dashboard that tracks your daily downloads, delivers regular revenue reports, keeps you up-to-dateon user sentiment, and gives insights into how your competitorsare performing over time.',
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
                'The Q4 Data Digest from Sensor Tower examines the most installed apps, trends in gaming, by category, geography, download and revenue.',
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
                'The Q4 Data Digest from Sensor Tower examines the most installed apps, trends in gaming, by category, geography, download and revenue, COVID-19 impact, and more.',
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
                'Sensor Tower’s App Teardown product allows you to look under the hood of the market’s most successful apps.',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  }
};
