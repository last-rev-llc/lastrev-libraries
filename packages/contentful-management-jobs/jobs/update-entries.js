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

const findCondition = (item, locale) => item;

const displayItem = (item) => {
  console.log(
    'item => ',
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

const itemFilter = (item) => {
  let found = false;
  ['de', 'en-US', 'es', 'fr', 'it', 'ja', 'pt-BR'].forEach((locale) => {
    found = found || findCondition(item, locale);
  });
  return found;
};

const log = (items) => {
  if (items.length === 0) {
    console.log('No items found to log');
    return;
  }
  console.log('number of items found => ', items.length);
  console.log(
    'entry ids => ',
    items
      .map((item) => {
        displayItem(item);
        return item.sys.id;
      })
      .join(',')
  );
};

const prepareEntry = (entry) => {
  const preparedEntry = { ...entry };
  const { seo } = entry.fields;
  ['de', 'en-US', 'es', 'fr', 'it', 'ja', 'pt-BR'].forEach((locale) => {
    if (seo[locale] && seo[locale].robots) {
      preparedEntry.fields.seo[locale].robots.value = entry.fields.seo[locale].robots.value.replace(/, nofollow/g, '');
      console.log('prepared entry seo robots value => ', preparedEntry.fields.seo[locale].robots.value);
    }
  });
  return preparedEntry;
};

const updateEntry = async (linkedEntry, entryId) => {
  try {
    console.log(`updating linked entry => ${linkedEntry.sys.id} for ${entryId}`);
    await linkedEntry.update();
  } catch (error) {
    console.log(`error updating linked entry => ${linkedEntry.sys.id} for ${entryId} => `, error);
  }
};

const updateEntries = async (entries) => {
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    console.log(`updating entry => ${entry.sys.id}`);
    await updateEntry(prepareEntry(entry), entry.sys.id);
  }
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
    const filteredEntries = entries.filter(itemFilter);
    console.log('number of filtered entries => ', filteredEntries.length);
    log(filteredEntries);
    const updatedEntries = await updateEntries(filteredEntries);
    console.log('number of updated entries => ', updatedEntries.length);
  } else {
    console.log('No entries found');
  }
})();
