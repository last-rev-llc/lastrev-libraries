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

export default homepageMock;
