const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createEntry } = require('./createEntry');

// Variant is not considered for the id
const createEntryReference = async (JOB, { key: keyOverride, entry, contentType, fields }) => {
  const { variant, ...key } = entry;
  const entryId = await contentfulFieldsParsers.getContentfulIdFromString(JSON.stringify(keyOverride ?? key));

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
