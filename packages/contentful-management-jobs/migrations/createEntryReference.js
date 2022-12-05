const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createEntry } = require('./createEntry');

const createEntryReference = async (JOB, { entry, contentType, fields }) => {
  const entryId = await contentfulFieldsParsers.getContentfulIdFromString(JSON.stringify(entry));

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
