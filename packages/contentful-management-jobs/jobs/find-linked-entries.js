/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');

let pageEntries = [];
let finished = false;

const STEPS = {
  getEntries: true,
  prepareItems: true,
  getLinkedEntries: true,
  removeDuplicates: true
};

const entriesQuery = {
  'content_type': 'card',
  'sys.createdAt[gte]': '2022-10-12T00:00:00Z',
  'limit': 1000,
  'fields.media[exists]': true,
  'order': '-sys.createdAt'
};

const getAllEntries = async (query) => {
  let entries = { items: [] };
  if (STEPS.getEntries) {
    entries = await importParser(async () => clientDelivery.getEntries(query));
  }
  return entries;
};

const prepareItems = (items) => {
  if (STEPS.prepareItems) {
    // get array of only ids
    const ids = items.map((item) => item.sys.id);
    // remove duplicates
    const uniqueIds = [...new Set(ids)];
    return uniqueIds.map((id) => ({ id }));
  }
  return items;
};

const removeDuplicates = (items) => {
  if (STEPS.removeDuplicates) {
    const linkedEntryIds = items
      .filter((item) => item.linkedEntryIds)
      .map((item) => item.linkedEntryIds)
      .flat();
    const uniqueIds = [...new Set(linkedEntryIds)];
    return uniqueIds;
  }
  return items;
};

const getLinkedEntries = async (ids) => {
  if (STEPS.getLinkedEntries) {
    for (let index = 0; index < ids.length; index += 1) {
      let links;
      const item = ids[index];
      try {
        console.log(`getting linked entries for ${item.id}`);
        links = await clientDelivery.getEntries({ links_to_entry: item.id });
      } catch (error) {
        console.log(`error getting linked entries for ${item.id} => `, error);
      }
      if (links?.items?.length) {
        pageEntries = [
          ...pageEntries,
          ...links.items.filter((link) => link.fields.slug).map((link) => ({ id: link.sys.id, slug: link.fields.slug }))
        ];
        ids[index].linkedEntryIds = links.items.filter((link) => !link.fields.slug).map((link) => link.sys.id);
        console.log(`linked entries for ${item.id} were found`);
      } else {
        console.log(`no linked entries for ${item.id} were found`);
      }
    }
    return ids;
  }
  return [];
};

(async () => {
  // Step 1 - Get All Entries
  const entries = await getAllEntries(entriesQuery);
  console.log('entries => ', entries.items.length);

  if (entries.items.length) {
    // Step 2 - Prepare Items
    const preparedItems = prepareItems(entries.items);
    console.log('preparedItems => ', preparedItems.length);
    // console.log('preparedItems => ', JSON.stringify(preparedItems, null, 2));

    // Step 3 - Get Linked Entries
    let linkedItems = await getLinkedEntries(preparedItems);
    console.log('linkedItems => ', linkedItems.length);

    while (!finished) {
      // Step 4 - Filter out duplicates
      const uniqueLinkedItems = removeDuplicates(linkedItems);
      console.log('uniqueLinkedItems => ', uniqueLinkedItems.length);
      console.log('uniqueLinkedItems => ', JSON.stringify(uniqueLinkedItems, null, 2));
      finished = !uniqueLinkedItems.length;
      if (!finished) {
        // Step 5 - Get one more level of linked entries
        linkedItems = await getLinkedEntries(uniqueLinkedItems.map((item) => ({ id: item })));
        console.log('linkedItems => ', linkedItems.length);
      }
    }
    console.log('pageEntries => ', pageEntries.length);
    const uniquePageEntries = [...new Set(pageEntries.map((entry) => entry.slug))];
    console.log('pageEntries slugs => ', uniquePageEntries);
  } else {
    console.log('No entries found');
  }
})();
