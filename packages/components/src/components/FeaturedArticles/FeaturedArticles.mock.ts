import { mediaMock } from '../Media/Media.mock';

export const articlesMock = {
  articles: [
    {
      id: '4GEjeEoTyo0xGNVRgmGlRJ',
      __typename: 'Card',
      sidekickLookup: {
        contentId: '4GEjeEoTyo0xGNVRgmGlRJ',
        contentTypeId: 'article'
      },
      variant: null,
      media: [mediaMock()],
      title:
        'Proprietary Partner Integration Activation - All Partners [sample from site with bullets] [LAST REV DEMO]',
      subtitle: null,
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
                  value:
                    'placeholder text for summary\n[internal note] this article is from https://support.integralads.com/s/article/Social-Intergration',
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
      },
      pubDate: '2021-11-22',
      actions: null,
      link: {
        id: '4GEjeEoTyo0xGNVRgmGlRJ',
        __typename: 'Link',
        href: '/article/proprietary-partner-integration-activation-all-partners-sample-from-site-demo'
      }
    },
    {
      id: '6wqLGnTcK9a4Vh5BRmt1wP',
      __typename: 'Card',
      sidekickLookup: {
        contentId: '6wqLGnTcK9a4Vh5BRmt1wP',
        contentTypeId: 'article'
      },
      variant: null,
      media: [mediaMock()],
      title: 'Article with 2 column grid for image and table [LAST REV DEMO] update ',
      subtitle: null,
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
                  value:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor ligula a enim convallis, quis feugiat orci posuere. Praesent eu commodo nisl. Vestibulum eget ipsum in nulla sollicitudin lobortis. Donec sollicitudin ante et diam tristique, ac aliquam nibh fermentum.  Lorem',
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
      },
      pubDate: '2021-12-08',
      actions: null,
      link: {
        id: '6wqLGnTcK9a4Vh5BRmt1wP',
        __typename: 'Link',
        href: '/article/article-with-2-column-grid-for-image-and-table-last-rev-demo'
      }
    }
  ]
};
