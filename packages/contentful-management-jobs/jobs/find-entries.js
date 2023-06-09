/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const { clientDelivery } = require('../shared/contentful-init');
const { getAllEntries, getAllItems } = require('../shared/contentful-actions');

const content_type = 'aaCard';

const queryOptions = {
  limit: 100,
  content_type,
  order: '-sys.createdAt'
};

const itemFilter = (item) => item.fields.category;
const displayItem = (item) => {
  console.log('item category => ', { id: item.sys.id, category: item.fields.category });
};

const log = (items) => {
  console.log(
    'entry ids => ',
    items
      .filter(itemFilter)
      .map((item) => {
        if (displayItem) displayItem(item);
        return item.sys.id;
      })
      .join(',')
  );
};

(async () => {
  // Step 1 - Get All Entries
  const entries = await getAllEntries(clientDelivery, { content_type, limit: 1 }, (items) =>
    getAllItems(items, queryOptions)
  );

  if (entries.length) {
    console.log('number of entries => ', entries.length);
    log(entries);
  } else {
    console.log('No entries found');
  }
})();
