/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery, getEnvironmentManagement } = require('../shared/contentful-init');
const { importParser } = require('../shared/input-parsers');
const { publishItem, checkForExistingItem } = require('../shared/contentful-actions');
const { logItems } = require('../shared/logging');

// const entryLookup = {};
const STEPS = {
  getAssets: true,
  transformAssetsToEntries: true,
  filterEntries: false,
  checkForDuplicates: false,
  createEntries: false
};
const ASSETS_QUERY = {
  'sys.createdAt[gte]': '2022-09-30T17:00:00Z',
  'fields.file.url[exists]': true,
  'limit': 1000,
  'order': '-sys.createdAt'
};

const transformAssetsToEntries = (assets) => {
  if (STEPS.transformAssetsToEntries) {
    return assets.map((asset) => {
      if (asset) {
        const {
          sys: { id },
          fields: { title }
        } = asset || {};
        return {
          entryId: id,
          entry: {
            fields: {
              internalTitle: {
                'en-US': title
              },
              media: {
                'en-US': {
                  sys: {
                    type: 'Link',
                    linkType: 'Asset',
                    id
                  }
                }
              },
              cardStyle: {
                'en-US': 'Media'
              }
            }
          }
        };
      }
      console.log('asset not found');
      return null;
    });
  }
  return [];
};

const createEntryWithId = async (environment, entryId, entryObject, contentType) => {
  let entry;
  try {
    console.log(`creating entry => ${entryId}`);
    entry = await environment.createEntryWithId(contentType, entryId, entryObject);
  } catch (error) {
    console.log(`error creating entry => ${entryId} => `, error);
  }
  return entry;
};

const createEntries = async (entries, contentType) => {
  const createdEntries = [];
  if (STEPS.createEntries) {
    const environment = await getEnvironmentManagement();
    if (!environment) {
      console.log('environment not found');
      return [];
    }

    for (let index = 0; index < entries.length; index++) {
      const currentEntry = entries[index];
      const { entry, entryId, publish } = currentEntry;

      const existingAsset = await checkForExistingItem(entryId, async () => clientDelivery.getEntry(entryId));

      if (!existingAsset) {
        const createdEntry = await createEntryWithId(environment, entryId, entry, contentType);

        if (createdEntry) {
          console.log(`created entry => ${entryId}`);

          if (publish) {
            await publishItem(createdEntry, entryId);
          }
          createdEntries.push({ entryId, asset: createdEntry });
        }
      } else {
        console.log(`existing entry => ${entryId}`);
        createdEntries.push({ asset: existingAsset, entryId });
      }
    }
  }
  return createdEntries;
};

const getAllAssets = async (query) => {
  let assets;
  if (STEPS.getAssets) {
    assets = await importParser(() => clientDelivery.getAssets(query));
  }
  return assets;
};

const filterEntries = (entries) => {
  if (STEPS.filterEntries) {
    return entries.filter((entry) => entry);
  }
  return entries;
};

const findDuplicateEntries = (entries) => {
  const duplicateEntries = [];
  if (STEPS.checkForDuplicates) {
    entries.forEach((entry) => {
      const count = entries.filter((a) => a.entryId === entry.entryId).length;
      if (count > 1) {
        duplicateEntries.push({ entryId: entry.entryId, count });
      }
    });
  }
  return duplicateEntries;
};

(async () => {
  // Step 1 - Get all entries
  const assets = await getAllAssets(ASSETS_QUERY);
  // logItems(
  //   assets.items,
  //   (asset, index) => index === 100,
  //   (asset) => `${asset.sys.id} => ${JSON.stringify(asset, null, 2)}`
  // );

  console.log('assets count => ', assets.items.length);

  if (assets?.items?.length) {
    // Step 4 - transform assets into contentful entries
    const entriesWithAsset = transformAssetsToEntries(assets.items);
    // console.log('entriesWithAsset => ', JSON.stringify(entriesWithAsset, null, 2));
    console.log('entriesWithAsset => ', entriesWithAsset.length);

    if (entriesWithAsset.length) {
      // Step 5 - Filter out entries that do not have urls
      const filteredEntries = filterEntries(entriesWithAsset);

      // Step 6 - check for missed duplicates
      const duplicateEntries = findDuplicateEntries(filteredEntries);
      console.log('duplicateEntries => ', duplicateEntries.length);

      // Step 7 - Create entries
      const createdEntries = await createEntries(entriesWithAsset, 'card');
      console.log('createdEntries => ', createdEntries.length);
    }
  } else {
    console.log('No entries found');
  }
})();
