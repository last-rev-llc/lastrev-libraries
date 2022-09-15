const contentfulFieldsParsers = require('../shared/contentful-fields');

const createEditionTabApp = async (JOB, entryId, { internalTitle, name, apps }) => {
  try {
    const appsRelArray = [];
    for (let index = 0; index < apps.length; index++) {
      const app = apps[index];
      const internalTitle = `Edition App Flow Logo - ${app.name}`;
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(internalTitle);
      JOB.relatedEntries.push(
        await createEditionTabApp(JOB, entryId, {
          internalTitle,
          name: app.name,
          apps: []
        })
      );

      const relTabObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
      // console.log('relTabObj: ', relTabObj);
      appsRelArray.push(relTabObj);
    }
  } catch (err) {
    console.log('err: ', err);
  }
  return {
    entryId: entryId,
    contentType: 'editionTabApp',
    contentfulFields: {
      internalTitle: {
        'en-US': internalTitle
      },
      name: {
        'en-US': name
      },
      apps: {
        'en-US': []
      }
    }
  };
};
exports.createEditionTabApp = createEditionTabApp;
