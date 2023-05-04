/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const { clientDelivery } = require('../shared/contentful-init');
const { getAllEntries, getAllItems } = require('../shared/contentful-actions');

const limit = 100;
const content_type = 'aaShopifyProduct';
const order = '-sys.createdAt';

const logMessage = 'entries with category => ';
const itemFilter = (item) => item.fields.category;
const displayItem = (item) => {
  console.log('item category => ', { id: item.sys.id, category: item.fields.category });
};

const log = (items) => {
  console.log(
    logMessage,
    items
      .filter(itemFilter)
      .map((item) => {
        displayItem(item);
        return item.sys.id;
      })
      .join(',')
  );
};

(async () => {
  // Step 1 - Get All Entries
  const entries = await getAllEntries(clientDelivery, { content_type, limit: 1 }, (items) =>
    getAllItems(items, { limit, content_type, order })
  );

  if (entries.length) {
    console.log('entries => ', entries.length);
    log(entries);
  } else {
    console.log('No entries found');
  }
})();
