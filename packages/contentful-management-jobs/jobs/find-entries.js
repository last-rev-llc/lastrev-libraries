/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const { environmentManagement, clientDelivery } = require('../shared/contentful-init');
const { getAllEntries, getAllItems } = require('../shared/contentful-actions');

const content_type = 'pageVideoLanding';

const queryOptions = {
  'limit': 100,
  content_type,
  'order': '-sys.createdAt',
  'sys.archivedAt[exists]': false
};

const itemFilter = (item) => {
  let found = false;
  ['de', 'en-US', 'es', 'fr', 'it', 'ja', 'pt-BR'].forEach((locale) => {
    found = found || (item.fields.seo && item.fields.seo?.[locale]?.robots?.value === 'noindex,nofollow');
  });
  return found;
};
const displayItem = (item) => {
  console.log(
    'page => ',
    JSON.stringify(
      {
        id: item.sys.id,
        seo: item.fields.seo,
        fields: (!item.fields.seo && item.fields) || 'has seo'
      },
      null,
      2
    )
  );
};

const log = (items) => {
  const filteredItems = items.filter(itemFilter);
  if (filteredItems.length === 0) {
    console.log('No items found to log');
    return;
  }
  console.log('number of items found => ', filteredItems.length);
  console.log(
    'entry ids => ',
    filteredItems
      .map((item) => {
        displayItem(item);
        return item.sys.id;
      })
      .join(',')
  );
};

(async () => {
  const environment = await environmentManagement;
  // const environment = clientDelivery;

  // Step 1 - Get All Entries
  const entries = await getAllEntries(environment, { content_type, limit: 1 }, (items) =>
    getAllItems(environment, items, queryOptions)
  );

  if (entries.length) {
    console.log('number of entries => ', entries.length);
    log(entries);
  } else {
    console.log('No entries found');
  }
})();
