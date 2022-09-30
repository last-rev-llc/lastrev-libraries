const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createEditionAppFlow } = require('./createEditionAppFlow');

const createEditionFunction = async (JOB, entryId, { title, text, list, apps_flow }) => {
  const func = { title, text, list };
  func.apps_flow = await Promise.all(
    apps_flow.map(async (flow) => {
      const flowEntryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `${func.title}-${func.text}-${flow.name}`
      );

      JOB.relatedEntries.push(await createEditionAppFlow(JOB, flowEntryId, flow));

      return contentfulFieldsParsers.getContentfulFieldValue(flowEntryId, { type: 'Entry' });
    })
  );

  return {
    entryId,
    contentType: 'editionFunction',
    contentfulFields: {
      title: {
        'en-US': func.title
      },
      text: {
        'en-US': func.text
      },
      list: {
        'en-US': func.list
      },
      apps_flow: {
        'en-US': func.apps_flow
      }
    }
  };
};
exports.createEditionFunction = createEditionFunction;
