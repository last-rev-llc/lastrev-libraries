const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createMediaEntry } = require('./createMediaEntry');

const createQuote = async (JOB, entryId, { quote, text, author, name, position, company, img, avatar2x, iframe }) => {
  const asset = img || avatar2x; // /asset/person/mike.png
  let imgRefObj;
  let assetId;
  if (asset) {
    assetId = await contentfulFieldsParsers.getContentfulIdFromString(asset);
    JOB.relatedEntries.push(
      await createMediaEntry(JOB, assetId, {
        assetURL: asset
      })
    );
    imgRefObj = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
  }

  return {
    entryId,
    contentType: 'quote',
    contentfulFields: {
      quote: {
        'en-US': quote || text
      },
      author: {
        'en-US': author
      },
      name: {
        'en-US': name
      },
      position: {
        'en-US': position
      },
      company: {
        'en-US': company
      },
      img: {
        'en-US': imgRefObj
      },
      iframe: {
        'en-US': iframe
      }
    }
  };
};
exports.createQuote = createQuote;
