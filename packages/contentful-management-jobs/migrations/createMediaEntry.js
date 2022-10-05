const contentfulFieldsParsers = require('../shared/contentful-fields');
const { removeEmpty } = require('./removeEmpty');

const createMediaEntry = async (JOB, assetId, { assetURL, height, width, title, variant, order }) => {
  // We use the same ID for the asset and the media entry.
  return {
    entryId: assetId,
    contentType: 'media',
    contentfulFields: removeEmpty({
      title: {
        'en-US': title || assetURL
      },
      assetURL: {
        'en-US': assetURL
      },
      asset: {
        'en-US': await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Asset' })
      },
      height: {
        'en-US': height?.toString()
      },
      width: {
        'en-US': width?.toString()
      },
      variant: {
        'en-US': variant?.toString()
      },
      order: {
        'en-US': order?.toString()
      }
    })
  };
};
exports.createMediaEntry = createMediaEntry;
