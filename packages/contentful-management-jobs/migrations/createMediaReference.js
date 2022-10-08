const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createMediaEntry } = require('./createMediaEntry');

const createMediaReference = async (JOB, media) => {
  // Entry must have all the expected fields for media
  const assetId = await contentfulFieldsParsers.getContentfulIdFromString(media.assetURL);
  JOB.relatedEntries.push(await createMediaEntry(JOB, assetId, media));
  return contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
};
exports.createMediaReference = createMediaReference;
