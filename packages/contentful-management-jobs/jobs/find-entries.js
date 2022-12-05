/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const keys = require('lodash/keys');
const { environmentManagement } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');

const STEPS = {
  getEntries: true,
  prepareItems: true,
  getLinkedEntries: true,
  removeDuplicates: true
};

const entriesQuery = {
  'content_type': 'pageLanding',
  'limit': 1000,
  'sys.archivedVersion[exists]': false
};

const getAllEntries = async (query) => {
  let entries = { items: [] };
  if (STEPS.getEntries) {
    const environment = await environmentManagement;
    entries = await importParser(async () => environment.getEntries(query));
  }
  return entries;
};

(async () => {
  // Step 1 - Get All Entries
  const entries = await getAllEntries(entriesQuery);
  console.log('entries => ', entries.items.length);

  if (entries.items.length) {
    console.log(
      'entries without robots => ',
      entries.items
        .filter((item) => !item.fields.seo['en-US'].robots)
        .map((item) => item.sys.id)
        .join(',')
    );
    const searchedEntries = entries.items.filter((item) => {
      if (keys(item.fields.seo).length !== 7 && !item.fields.internalTitle['en-US'].includes('DON"T PUBLISH!!!')) {
        console.log(
          `item => ${item.sys.id} => does not have all seo locales => ${JSON.stringify(keys(item.fields.seo), null, 2)}`
        );
      } else {
        console.log(`item => ${item.sys.id} => has all seo locales`);
      }
      return keys(item.fields.seo).length !== 7 && !item.fields.internalTitle['en-US'].includes('DON"T PUBLISH!!!');
    });
    console.log('searchedEntries => ', searchedEntries.length);
    console.log('searchedEntries ids => ', searchedEntries.map((item) => item.sys.id).join(','));
  } else {
    console.log('No entries found');
  }
})();
