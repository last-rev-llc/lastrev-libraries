const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createEditionFunction } = require('./createEditionFunction');

const createEditionTab = async (JOB, entryId, { name, functions }) => {
  const tab = { name };
  tab.functions = await Promise.all(
    functions.map(async (func) => {
      const funcEntryId = await contentfulFieldsParsers.getContentfulIdFromString(`${func.name}-${func.text}`);

      JOB.relatedEntries.push(await createEditionFunction(JOB, funcEntryId, func));

      return contentfulFieldsParsers.getContentfulFieldValue(funcEntryId, { type: 'Entry' });
    })
  );

  return {
    entryId,
    contentType: 'editionTab',
    contentfulFields: {
      name: {
        'en-US': tab.name
      },

      functions: {
        'en-US': tab.functions
      }
    }
  };
};
exports.createEditionTab = createEditionTab;
