/* eslint-disable camelcase */
/* eslint-disable no-console */
const { environmentManagement, clientDelivery } = require('../shared/contentful-init');
const { getAllEntries, getAllItems, updateEntries } = require('../shared/contentful-actions');
const {
  content_type,
  queryOptions,
  log,
  itemFilter,
  prepareEntryForUpdate,
  prepareOnly
} = require('../shared/fixtures/bulkActionConfig');

(async () => {
  const environment = await environmentManagement;

  // Step 1 - Get All Entries
  const entries = await getAllEntries(environment, { content_type, limit: 1 }, (items) =>
    getAllItems(environment, items, queryOptions)
  );

  if (entries.length) {
    console.log(`number of ${content_type} entries => `, entries.length);
    const filteredEntries = entries.filter(itemFilter);
    log(filteredEntries);
    const preparedEntries = filteredEntries.map(prepareEntryForUpdate).filter((x) => x);
    if (preparedEntries.length) {
      if (!prepareOnly) {
        console.log('updating new entries => ', preparedEntries.length);
        const updatedEntries = await updateEntries(filteredEntries);
        console.log('number of updated entries => ', updatedEntries.filter((entry) => entry).length);
      }
    } else {
      console.log('No entries were prepared for an update');
    }
  } else {
    console.log('No entries found');
  }
})();
