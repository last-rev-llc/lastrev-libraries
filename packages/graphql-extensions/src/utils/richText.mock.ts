import { Document } from '@contentful/rich-text-types';

const mockRichText = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      content: [
        { nodeType: 'text', value: 'Enhanced ', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: '/articles/Knowledge/Enhanced-Programmatic-Reporting-User-Guide' },
          content: [{ nodeType: 'text', value: 'Programmatic Reporting', marks: [], data: {} }]
        },
        {
          nodeType: 'text',
          value:
            ' lets you make informed decisions on your programmatic spend via the inclusion of DSP, Exchange, Deal ID, Line Item, and Publisher data points in the Integral Ad Science (IAS) reporting infrastructure.',
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
          value:
            'As part of the Enhanced Programmatic Reporting, you might be automatically activated for programmatic reporting (see ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'hyperlink',
          data: { uri: '#automaticMapping' },
          content: [{ nodeType: 'text', value: 'Automatic Mapping', marks: [], data: {} }]
        },
        {
          nodeType: 'text',
          value: '). Enhanced Programmatic Reporting automatically activates select DSPs and Media Partners.  ',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        { nodeType: 'text', value: 'Alternatively, you can use the ', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: '#ManagedService' },
          content: [{ nodeType: 'text', value: 'managed service', marks: [], data: {} }]
        },
        {
          nodeType: 'text',
          value:
            ". If you are not automatically activated because you are not set up or you don't use DSP specific media partners for your programmatic buys, create a Help Center request to get activated for programmatic reporting. ",
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'heading-2',
      content: [{ nodeType: 'text', value: 'Automatic Mapping', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value:
            'The following teams are automatically activated for the following DSPs and media Partners for Enhanced Programmatic Reporting:',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'embedded-entry-block',
      content: [],
      data: { target: { sys: { type: 'Link', linkType: 'Entry', id: '1207621896' } } }
    },
    {
      nodeType: 'heading-2',
      content: [{ nodeType: 'text', value: 'Managed Service', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value:
            "Teams which aren't automatically activated are activated upon request. TCS creates an association for the media partner with DSP ID = 64 (Not configured for a DSP). Then the teams can use the ",
          marks: [],
          data: {}
        },
        {
          nodeType: 'hyperlink',
          data: { uri: '/articles/Knowledge/Tag-Configurator-User-Guide' },
          content: [{ nodeType: 'text', value: 'Tag Configurator', marks: [], data: {} }]
        },
        {
          nodeType: 'text',
          value: ' to update the tags to contain the macros of the DSP which they intend to traffic the tags. See ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'hyperlink',
          data: { uri: '#WrappedTags' },
          content: [{ nodeType: 'text', value: 'Wrapped Tags', marks: [], data: {} }]
        },
        { nodeType: 'text', value: ' for more information.', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: 'heading-1',
      content: [{ nodeType: 'text', value: 'Open Web Tag', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value:
            'Open Web tags have six macros including the DSP appended as query parameters. By default, the tags are configured for Enhanced Programmatic Reporting.  ',
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
          value:
            'IAS uses the following macros to collect reference data where IAS tags run to enable Enhanced Programmatic Reporting:',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'embedded-entry-block',
      content: [],
      data: { target: { sys: { type: 'Link', linkType: 'Entry', id: '4218703042' } } }
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'Note: Enhanced Programmatic Reporting does not track macro level data for Innovid video placements.',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'heading-2',
      content: [{ nodeType: 'text', value: 'Wrapping Tags', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value:
            "IAS updated the tag wrapping solutions to automatically append a DSP's macro placeholders to an IAS Open Web tag by default. Before wrapping tags for Enhanced Programmatic Reporting, the client must verify they properly enabled the tags for the solution. The following string indicates tags are wrapped for Enhanced Programmatic Reporting:",
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        { nodeType: 'text', value: '"', marks: [], data: {} },
        { nodeType: 'text', value: 'ias', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: '_', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: 'dspId=', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: '64&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'campId=&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'pubId=&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId=&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId=&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'dealId="', marks: [], data: {} }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: "Conversely, the following tag (which doesn't include ",
          marks: [],
          data: {}
        },
        { nodeType: 'text', value: 'ias', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: '_', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: 'dspId', marks: [{ type: 'bold' }], data: {} },
        {
          nodeType: 'text',
          value: ') shows a tag which is not live for Enhanced Programmatic Reporting:',
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
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&originalVast=https://testvast.xml'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&originalVast=https://testvast.xml',
              marks: [],
              data: {}
            }
          ]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        { nodeType: 'text', value: 'To debug the wrapped tag, check that the ', marks: [], data: {} },
        { nodeType: 'text', value: 'ias', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: '_', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: 'dspId=', marks: [{ type: 'bold' }], data: {} },
        {
          nodeType: 'text',
          value: ' value matches the value in the DSP ID to Name table.',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'heading-2',
      content: [{ nodeType: 'text', value: 'Wrapped Tags', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value:
            "Teams which aren't automatically activated are activated upon request. TCS creates an association for the media partner with DSP ID = 64 (No",
          marks: [],
          data: {}
        },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'Detected', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'DSP). Then the teams can use the ', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: '/articles/Knowledge/Tag-Configurator-User-Guide' },
          content: [{ nodeType: 'text', value: 'Tag Configurator', marks: [], data: {} }]
        },
        {
          nodeType: 'text',
          value: ' to update the tags to contain the macros of the DSP which they intend to traffic the tags.',
          marks: [],
          data: {}
        },
        { nodeType: 'text', value: 'To debug the wrapped tag, check that the ', marks: [], data: {} },
        { nodeType: 'text', value: 'ias', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: '_', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: 'dspId=', marks: [{ type: 'bold' }], data: {} },
        {
          nodeType: 'text',
          value: ' value matches the value in the DSP ID to Name table.',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'heading-3',
      content: [{ nodeType: 'text', value: 'DSP ID to Name', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'IAS provides reporting for one DSP. Here is the ID to DSP mapping:',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'embedded-entry-block',
      content: [],
      data: { target: { sys: { type: 'Link', linkType: 'Entry', id: '1330708203' } } }
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value:
            "The default tag, 64, works on all platforms and publisher direct buys. IAS doesn't collect programmatic data if a tag has DSP ID = 64.",
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'heading-2',
      content: [{ nodeType: 'text', value: 'DSP Tag Examples', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'Default (not configured):', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?' },
          content: [
            {
              nodeType: 'text',
              value: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' ', marks: [], data: {} },
        { nodeType: 'text', value: 'ias', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: '_', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: 'dspId=64', marks: [{ type: 'bold' }], data: {} },
        { nodeType: 'text', value: '&includeFlash=false&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'Amobee:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=1**&ias\\_campId=$!{INSERTION\\_ORDER\\_ID}&ias\\_pubId=$!'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=1**&ias\\_campId=$!{INSERTION\\_ORDER\\_ID}&ias\\_pubId=$!',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' {INVENTORY', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'SOURCE', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId=$!{PACKAGE', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId=$!{AD', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' dealId=$!{DEAL', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'Xandr:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=2**&ias\\_campId=${CP\\_ID}&ias\\_pubId=${SELLER\\_MEMBER\\_'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=2**&ias\\_campId=${CP\\_ID}&ias\\_pubId=${SELLER\\_MEMBER\\_',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId=${PUBLISHER', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId=${CREATIVE', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' dealId=${DEAL', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'DV360:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=3**&ias\\_campId=${INSERTION\\_ORDER\\_ID}&ias\\_'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=3**&ias\\_campId=${INSERTION\\_ORDER\\_ID}&ias\\_',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' pubId=${ADSXT', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'PUBLISHER', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId=&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId=${CAMPAIGN', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' dealId=${INVENTORY', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'SOURCE', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'EXTERNAL', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'MediaMath:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=8**&ias\\_campId=\\[AD\\_ATTR.strategy\\]&ias\\_pubId=\\[BID\\_'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=8**&ias\\_campId=\\[AD\\_ATTR.strategy\\]&ias\\_pubId=\\[BID\\_',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' ATTR.exchange', marks: [], data: {} },
        { nodeType: 'text', value: ']', marks: [], data: {} },
        { nodeType: 'text', value: '&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId=', marks: [], data: {} },
        { nodeType: 'text', value: '[', marks: [], data: {} },
        { nodeType: 'text', value: 'AD', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ATTR.width', marks: [], data: {} },
        { nodeType: 'text', value: ']', marks: [], data: {} },
        { nodeType: 'text', value: 'x', marks: [], data: {} },
        { nodeType: 'text', value: '[', marks: [], data: {} },
        { nodeType: 'text', value: 'AD', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ATTR.height', marks: [], data: {} },
        { nodeType: 'text', value: ']', marks: [], data: {} },
        { nodeType: 'text', value: '&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId= ', marks: [], data: {} },
        { nodeType: 'text', value: '[', marks: [], data: {} },
        { nodeType: 'text', value: 'AD', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ATTR.creative', marks: [], data: {} },
        { nodeType: 'text', value: ']', marks: [], data: {} },
        { nodeType: 'text', value: '&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'dealId=', marks: [], data: {} },
        { nodeType: 'text', value: '[', marks: [], data: {} },
        { nodeType: 'text', value: 'BID', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ATTR.pmp', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'mm', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'deal', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' id', marks: [], data: {} },
        { nodeType: 'text', value: ']', marks: [], data: {} },
        { nodeType: 'text', value: '&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'TTD:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=9**&ias\\_campId=%%TTD\\_CAMPAIGNID%%&ias\\_pubId=%%TTD\\_'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=9**&ias\\_campId=%%TTD\\_CAMPAIGNID%%&ias\\_pubId=%%TTD\\_',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' SUPPLYVENDOR%%&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId=%%TTD', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ADGROUPID%%&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId=%%TTD', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' CREATIVEID%%&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'dealId=%%TTD', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'DEALID%%&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'Adobe:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=11**&ias\\_campId=${TM\\_CAMPAIGN\\_ID\\_NUM}&ias\\_'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=11**&ias\\_campId=${TM\\_CAMPAIGN\\_ID\\_NUM}&ias\\_',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' pubId=${TM', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'SITE', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'NUM}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId=&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId=${TM', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'PLACEMENT', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' NUM}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'dealId=${TM', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'EXTERNAL', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'DEAL', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'AdForm:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=12**&ias\\_campId=\\_ADFCAMID\\_&ias\\_'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=12**&ias\\_campId=\\_ADFCAMID\\_&ias\\_',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' pubId=', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ADFMEDID', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: '&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId=', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ADFINVID', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: '&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId=', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ADFPLAID', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: '&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' dealId=', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ADFDPID', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: '&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'Zeta Global:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=26**&ias\\_campId=\\[%tp\\_CampaignID%\\]&ias\\_pubId=\\[%tp\\_'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=26**&ias\\_campId=\\[%tp\\_CampaignID%\\]&ias\\_pubId=\\[%tp\\_',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' SiteID%', marks: [], data: {} },
        { nodeType: 'text', value: ']', marks: [], data: {} },
        { nodeType: 'text', value: '&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId=', marks: [], data: {} },
        { nodeType: 'text', value: '[', marks: [], data: {} },
        { nodeType: 'text', value: '%tp', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'AdID%', marks: [], data: {} },
        { nodeType: 'text', value: ']', marks: [], data: {} },
        { nodeType: 'text', value: '&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId=', marks: [], data: {} },
        { nodeType: 'text', value: '[', marks: [], data: {} },
        { nodeType: 'text', value: '%tp', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'PlacementID%', marks: [], data: {} },
        { nodeType: 'text', value: ']', marks: [], data: {} },
        { nodeType: 'text', value: '&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        {
          nodeType: 'text',
          value: 'dealId= {selectedDirectRfiDealId}&originalVast=',
          marks: [],
          data: {}
        },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'Adelphic', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=28**&ias\\_campId=${ADELPHIC\\_ADORDERID}&ias\\_'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=28**&ias\\_campId=${ADELPHIC\\_ADORDERID}&ias\\_',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' pubId=${ADELPHIC', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'PUBID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId=${ADELPHIC', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'AUDIENCEID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' placementId=${ADELPHIC', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'CREATIVEID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' dealId=&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'Yahoo:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=30**&ias\\_campId={ORDER\\_ID}&ias\\_pubId={PUBLISHER\\_'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=30**&ias\\_campId={ORDER\\_ID}&ias\\_pubId={PUBLISHER\\_',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId={LINE', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId={CREATIVE', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' dealId=&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'Amazon:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=33**&ias\\_campId={%campaign\\_cfid}&ias\\_pubId=&ias\\_'
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=33**&ias\\_campId={%campaign\\_cfid}&ias\\_pubId=&ias\\_',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' chanId={%ad', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'cfid}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId={%creative', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'cfid}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' dealId=&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: 'Beeswax:', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=58**&ias\\_campId={{CAMPAIGN\\_ID}}&ias\\_pubId='
          },
          content: [
            {
              nodeType: 'text',
              value:
                'https://vast.adsafeprotected.com/vast/fwjsvid/st/555520/51033501/skeleton.js?includeFlash=false&**ias\\_dspId=58**&ias\\_campId={{CAMPAIGN\\_ID}}&ias\\_pubId=',
              marks: [],
              data: {}
            }
          ]
        },
        { nodeType: 'text', value: ' {{INVENTORY', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'SOURCE}}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'chanId={{SITE', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ID}}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'placementId={{LINE', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'ITEM', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: ' ID}}&ias', marks: [], data: {} },
        { nodeType: 'text', value: '_', marks: [], data: {} },
        { nodeType: 'text', value: 'dealId=&originalVast=', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: 'https://testvast.xml' },
          content: [{ nodeType: 'text', value: 'https://testvast.xml', marks: [], data: {} }]
        }
      ],
      data: {}
    },
    {
      nodeType: 'heading-2',
      content: [{ nodeType: 'text', value: 'DSP Macro Placeholder for Reporting', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'embedded-entry-block',
      content: [],
      data: { target: { sys: { type: 'Link', linkType: 'Entry', id: '1898007738' } } }
    },
    {
      nodeType: 'paragraph',
      content: [{ nodeType: 'text', value: '  ', marks: [], data: {} }],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        { nodeType: 'text', value: 'Also, see ', marks: [], data: {} },
        {
          nodeType: 'hyperlink',
          data: { uri: '/articles/Knowledge/Trafficking-Programmatic-Reporting-Tags-in-DCM-and-DV360' },
          content: [
            {
              nodeType: 'text',
              value: 'Trafficking Programmatic Reporting Tags in DCM and DV360',
              marks: [],
              data: {}
            }
          ]
        },
        {
          nodeType: 'text',
          value: ' for more information about tags in DCM and DV360.',
          marks: [],
          data: {}
        }
      ],
      data: {}
    }
  ]
} as Document;

export default mockRichText;
