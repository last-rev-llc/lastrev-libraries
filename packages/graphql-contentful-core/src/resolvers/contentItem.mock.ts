import { CmsEntry } from '@last-rev/types';

const content = {
  sys: {
    id: '1',
    contentType: {
      sys: {
        id: 'foo'
      }
    }
  },
  fields: {
    stringField: {
      'en-US': 'fieldOneValue',
      'es': 'fieldOneValueSpanish'
    },
    stringArrayField: {
      'en-US': ['value1', 'value2']
    },
    referenceField: {
      'en-US': {
        sys: {
          id: '2',
          linkType: 'Entry',
          type: 'Link'
        }
      }
    },
    assetField: {
      'en-US': {
        sys: {
          id: '3',
          linkType: 'Asset',
          type: 'Link'
        }
      }
    },
    referenceArrayField: {
      'en-US': [
        {
          sys: {
            id: '2',
            linkType: 'Entry',
            type: 'Link'
          }
        },
        {
          sys: {
            id: '3',
            linkType: 'Entry',
            type: 'Link'
          }
        }
      ]
    },
    assetArrayField: {
      'en-US': [
        {
          sys: {
            id: '2',
            linkType: 'Asset',
            type: 'Link'
          }
        },
        {
          sys: {
            id: '3',
            linkType: 'Asset',
            type: 'Link'
          }
        }
      ]
    }
  }
} as unknown as CmsEntry<any>;

export default content;
