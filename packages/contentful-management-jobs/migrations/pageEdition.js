const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createEditionTab } = require('./createEditionTab');

const pageEdition = {
  image: {
    id: 'image',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      // console.log('============== image CustomParser', value);
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
      // console.log('assetId: ', assetId);
      const assetRefObj = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Asset' });

      return assetRefObj;
    }
  },
  steps_title: {
    id: 'steps.title',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      return await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
    }
  },
  steps_list: {
    id: 'steps.list',
    type: 'CustomParser',
    customParser: async (array, JOB) => {
      // Return an array of the 'title' fields
      const stepsArray = array.map((step) => {
        return step.title;
      });
      return stepsArray;
    }
  },
  tabs: {
    id: 'tabs',
    type: 'CustomParser',
    customParser: async (array, JOB, yamlObj) => {
      // console.log('yamlObj: ', yamlObj);
      const tabsRelArray = [];
      if (array && array.length > 0) {
        for (let index = 0; index < array.length; index++) {
          const tab = array[index];
          const internalTitle = `Edition - ${yamlObj.parsedYamlFile.title} - ${tab.name}`;
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(internalTitle);
          JOB.relatedEntries.push(
            await createEditionTab(JOB, entryId, {
              internalTitle,
              name: tab.name,
              title: tab.functions[0].title,
              text: tab.functions[0].text,
              apps_flow: tab.functions[0].apps_flow
            })
          );

          const relTabObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
          // console.log('relTabObj: ', relTabObj);
          tabsRelArray.push(relTabObj);
        }

        // console.log('tabsArray: ', tabsRelArray);
        return tabsRelArray;
      }
    }
  },
  calloutsList: null
};

module.exports = pageEdition;
