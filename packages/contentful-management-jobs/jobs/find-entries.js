/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const { clientDelivery } = require('../shared/contentful-init');
const { getAllEntries, getAllItems } = require('../shared/contentful-actions');

const limit = 200;
const content_type = 'blog';
const order = '-sys.createdAt';

const log = (items) => {
  console.log(
    'entries with og:title => ',
    items
      .filter((item) => item.fields.seo?.['og:title'])
      .map((item) => {
        if (item.sys.id === '5eMUbqDXpa2owgiPf2VeHj') {
          console.log('item seo => ', JSON.stringify(item.fields.seo, null, 2));
        }
        return item.sys.id;
      })
      .join(',')
  );
};

(async () => {
  // Step 1 - Get All Entries
  const entries = await getAllEntries(clientDelivery, { content_type: 'blog', limit: 1 }, (items) =>
    getAllItems(items, { limit, content_type, order })
  );

  if (entries.length) {
    console.log('entries => ', entries.length);
    log(entries);
  } else {
    console.log('No entries found');
  }
})();
