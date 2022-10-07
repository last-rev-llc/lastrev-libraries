const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createEntry } = require('./createEntry');
const { createMediaEntry } = require('./createMediaEntry');

const createPerson = async (JOB, entryId, person) => {
  const asset = person.image2x || person.image;
  const assetId = await contentfulFieldsParsers.getContentfulIdFromString(asset);
  JOB.relatedEntries.push(
    await createMediaEntry(JOB, assetId, {
      title: person.alt,
      assetURL: asset
    })
  );
  const image = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
  return createEntry({
    entryId,
    contentType: 'person',
    fields: ['name', 'title', 'image', 'about'],
    entry: {
      ...person,
      image
    }
  });
};

exports.createPerson = createPerson;
