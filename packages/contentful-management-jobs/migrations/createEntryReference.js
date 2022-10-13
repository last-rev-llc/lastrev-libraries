const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createEntry } = require('./createEntry');

// Variant is not considered for the id
const createEntryReference = async (JOB, { entry, contentType, fields }) => {
  const { variant, ...key } = entry;
  const entryId = await contentfulFieldsParsers.getContentfulIdFromString(JSON.stringify(key));

  JOB.relatedEntries.push(
    createEntry({
      entryId,
      contentType,
      fields,
      entry
    })
  );

  return contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
};

exports.createEntryReference = createEntryReference;
