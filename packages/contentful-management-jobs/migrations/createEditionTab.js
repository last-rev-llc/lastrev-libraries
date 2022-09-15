const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createEditionTabApp } = require('./createEditionTabApp');

const createEditionTab = async (JOB, entryId, { internalTitle, name, title, text, apps_flow }) => {
  const appsRelArray = [];
  for (let index = 0; index < apps_flow.length; index++) {
    const app = apps_flow[index];
    const internalTitle = `Edition App Flow - ${app.name}`;
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

  return {
    entryId: entryId,
    contentType: 'editionTab',
    contentfulFields: {
      internalTitle: {
        'en-US': internalTitle
      },
      name: {
        'en-US': name
      },
      title: {
        'en-US': title
      },
      text: {
        'en-US': text
      },
      apps_flow: {
        'en-US': []
      }
    }
  };
};
exports.createEditionTab = createEditionTab;
