const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createMediaEntry } = require('./createMediaEntry');

const createQuote = async (JOB, entryId, { quote, author, name, position, company, img, iframe }) => {
  const assetId = await contentfulFieldsParsers.getContentfulIdFromString(img);
  const imgRefObj = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
  JOB.relatedEntries.push(
    await createMediaEntry(JOB, assetId, {
      assetURL: img
    })
  );

  return {
    entryId,
    contentType: 'quote',
    contentfulFields: {
      quote: {
        'en-US': quote
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
