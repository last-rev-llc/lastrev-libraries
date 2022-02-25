export const defaultHeroMock = {
  __typename: 'Hero',
  id: '681xn0qMZPBXe2PY6ziYgj',
  sidekickLookup: {},
  variant: 'Align - Left',
  internalTitle: 'Advertiser + Agency Solutions Hero',
  title: 'Advertiser + Agency Solutions',
  subtitle: 'Lorem ipsum dolor sit amet, vitae sem maximu consectetur adipiscing elit.',
  backgroundColor: 'yellow',
  contentWidth: null,
  contentHeight: 'lg',
  background: null,
  body: {
    id: null,
    __typename: 'RichText',
    json: {
      data: {},
      content: [
        {
          data: {
            target: {
              sys: {
                id: '5V1NAD8P2Cp4AsCMNFomZf',
                type: 'Link',
                linkType: 'Entry'
              }
            }
          },
          content: [],
          nodeType: 'embedded-entry-block'
        },
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
      entries: [
        {
          __typename: 'ModuleIntegration',
          id: '5V1NAD8P2Cp4AsCMNFomZf',
          variant: 'autocomplete-search-box',
          settings: {
            variant: 'home',
            placeholder: 'search...',
            searchResultsUrl: '/search'
          }
        }
      ],
      assets: []
    }
  },
  image: null,
  actions: null
};

export const alignLeftMock = {
  ...defaultHeroMock,
  variant: 'Align - Left',
  contentHeight: 'Medium'
};

export const alignCenterMock = {
  ...defaultHeroMock,
  variant: 'Align - Center',
  contentHeight: 'Medium'
};

export const heightShortMock = {
  ...defaultHeroMock,
  contentHeight: 'Small'
};

export const heightMediumMock = {
  ...defaultHeroMock,
  contentHeight: 'Medium'
};
