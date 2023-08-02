/* eslint-disable camelcase */
/* eslint-disable no-console */
const { environmentManagement, clientDelivery } = require('../shared/contentful-init');
const { getAllEntries, getAllItems, updateEntries } = require('../shared/contentful-actions');
const { content_type, queryOptions, log } = require('../shared/fixtures/bulkActionConfig');

(async () => {
  const environment = await environmentManagement;

  // Step 1 - Get All Entries
  const entries = await getAllEntries(environment, { content_type, limit: 1 }, (items) =>
    getAllItems(environment, items, queryOptions)
  );

  if (entries.length) {
    console.log(`number of ${content_type} entries => `, entries.length);
    log(entries);
    const updatedEntries = await updateEntries(entries);
    console.log('number of updated entries => ', updatedEntries.filter((entry) => entry).length);
  } else {
    console.log('No entries found');
  }
})();
