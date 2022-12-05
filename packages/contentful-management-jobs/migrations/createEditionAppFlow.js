const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createMediaEntry } = require('./createMediaEntry');

const createEditionAppFlow = async (JOB, entryId, { name, apps }) => {
  const appFlow = { name };
  appFlow.apps = await Promise.all(
    apps.map(async (app) => {
      // console.log('============== chart CustomParser', value);
      const assetURL = `solution/icons/${app.id}`;
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(assetURL);
      // console.log('assetId: ', assetId);
      JOB.relatedEntries.push(
        await createMediaEntry(JOB, assetId, {
          assetURL,
          title: app.name
        })
      );

      const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
      // console.log('entryObject: ', entryObject);
      return entryObject;
    })
  );

  return {
    entryId,
    contentType: 'editionAppFlow',
    contentfulFields: {
      name: {
        'en-US': appFlow.name
      },

      apps: {
        'en-US': appFlow.apps
      }
    }
  };
};
exports.createEditionAppFlow = createEditionAppFlow;
