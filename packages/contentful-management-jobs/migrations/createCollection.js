/* eslint-disable camelcase */
const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createMediaEntry } = require('./createMediaEntry');
const { removeEmpty } = require('./removeEmpty');
// const { createLinkEntry } = require('./createLinkEntry');

const createCollection = async (
  JOB,
  entryId,
  { id, title, text_rich_text, text, img, items, asset, link, variant, content, number }
) => {
  let mediaRefObj;
  // let linkRefObj;

  if (asset) {
    JOB.relatedEntries.push(await createMediaEntry(JOB, asset.id, asset));
    mediaRefObj = await contentfulFieldsParsers.getContentfulFieldValue(asset.id, { type: 'Entry' });
  }

  // Create the Collection
  // function that retunrs an objects without empty keys
  return {
    entryId,
    contentType: 'collection',
    contentfulFields: removeEmpty({
      id: {
        'en-US': id
      },
      title: {
        'en-US': title
      },

      text_rich_text: {
        'en-US': text_rich_text || text
      },
      items: {
        'en-US': items
      },

      img: {
        'en-US': mediaRefObj
      },
      variant: {
        'en-US': variant
      }
    })
  };
};
exports.createCollection = createCollection;
