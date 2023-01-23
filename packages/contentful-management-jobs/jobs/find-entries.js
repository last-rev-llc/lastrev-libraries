/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const { clientDelivery } = require('../shared/contentful-init');
const { getAllEntries } = require('../shared/contentful-actions');

const limitAmount = 200;

const query = (skip, limit) => ({
  content_type: 'blog',
  limit,
  skip,
  order: '-sys.createdAt'
});

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

const allBlogs = [];

const getAllBlogs = async (result, limit) => {
  for (let skip = 0; skip < result.total; skip += limit) {
    console.log(`processed blogs ${skip} to ${skip + limit}`);
    const entries = await getAllEntries(clientDelivery, query(skip, limit));
    allBlogs.push(entries?.items || []);
  }
};

(async () => {
  // Step 1 - Get All Entries
  await getAllEntries(clientDelivery, { content_type: 'blog', limit: 1 }, (items) => getAllBlogs(items, limitAmount));

  const entries = allBlogs.flat();

  if (entries.length) {
    console.log('entries => ', entries.length);
    log(entries);
  } else {
    console.log('No entries found');
  }
})();
